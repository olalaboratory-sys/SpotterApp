import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, SafeAreaView, Easing, Linking, Alert,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import MachineIcon from '../../components/MachineIcon';
import * as haptics from '../../lib/haptics';
import { getMachine } from '../../constants/machines';
import { analyzePhoto, MatchResult, ScanImage, ScanLimitError } from '../../lib/recognition';
import { dailyScanLimit, scansUsedToday, recordScan, PREMIUM_DAILY_SCANS } from '../../lib/scanLimit';
import { usePlaces } from '../../context/PlacesContext';
import { useAuth } from '../../context/AuthContext';

const { width, height } = Dimensions.get('window');
type Phase = 'ready' | 'loading' | 'result';

const LOADING_MESSAGES = [
  "Looking for the machine's shape…",
  'Checking possible matches…',
  'Preparing your beginner guide…',
];

function ScanCorners() {
  const y = React.useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(y, { toValue: 1, duration: 1600, useNativeDriver: true }),
        Animated.timing(y, { toValue: 0, duration: 1600, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [y]);
  const translateY = y.interpolate({ inputRange: [0, 1], outputRange: [6, 262] });
  return (
    <View style={styles.scanFrame}>
      <View style={[styles.corner, { top: -2, left: -2, borderTopWidth: 3.5, borderLeftWidth: 3.5, borderTopLeftRadius: 14 }]} />
      <View style={[styles.corner, { top: -2, right: -2, borderTopWidth: 3.5, borderRightWidth: 3.5, borderTopRightRadius: 14 }]} />
      <View style={[styles.corner, { bottom: -2, left: -2, borderBottomWidth: 3.5, borderLeftWidth: 3.5, borderBottomLeftRadius: 14 }]} />
      <View style={[styles.corner, { bottom: -2, right: -2, borderBottomWidth: 3.5, borderRightWidth: 3.5, borderBottomRightRadius: 14 }]} />
      <Animated.View style={[styles.scanline, { transform: [{ translateY }] }]} />
    </View>
  );
}

function ScanScreen({ onScan, onClose }: { onScan: (getImage: () => Promise<ScanImage | null>) => void; onClose: () => void }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<'back' | 'front'>('back');
  const [flash, setFlash] = useState(false);
  const cameraRef = React.useRef<CameraView>(null);

  // Capture or pick, then downscale to ~512px to cut recognition cost.
  const downscale = async (uri: string): Promise<ScanImage> => {
    const out = await ImageManipulator.manipulateAsync(
      uri, [{ resize: { width: 512 } }],
      { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG, base64: true },
    );
    return { base64: out.base64 ?? '', mime: 'image/jpeg' };
  };
  const capture = async (): Promise<ScanImage | null> => {
    const photo = await cameraRef.current?.takePictureAsync({ quality: 0.6 });
    return photo?.uri ? downscale(photo.uri) : null;
  };
  const upload = async (): Promise<ScanImage | null> => {
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 1 });
    return !res.canceled && res.assets[0] ? downscale(res.assets[0].uri) : null;
  };

  if (!permission?.granted) {
    // Undetermined → in-app prompt; permanently denied → deep link to Settings.
    const denied = permission != null && !permission.canAskAgain;
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center', gap: 16, paddingHorizontal: 40 }]}>
        <Ionicons name="camera-outline" size={64} color={Colors.lime} />
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700', textAlign: 'center' }}>
          Camera access needed to scan machines
        </Text>
        <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, textAlign: 'center', lineHeight: 21 }}>
          {denied
            ? 'Camera access is off. Turn it on in Settings, or upload a photo instead.'
            : 'We only use the camera to identify the machine in front of you — photos aren’t stored.'}
        </Text>
        <TouchableOpacity style={styles.btnLime} onPress={denied ? () => Linking.openSettings() : requestPermission}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.ink }}>{denied ? 'Open Settings' : 'Allow Camera'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.uploadInstead} onPress={() => onScan(upload)}>
          <Ionicons name="image-outline" size={18} color="#fff" />
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: '500' }}>Upload a photo instead</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing={facing} enableTorch={flash} />
      <View style={styles.vignette} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.circleBtn} onPress={onClose}>
            <Ionicons name="close" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.topTitle}>Scan machine</Text>
          <TouchableOpacity style={[styles.circleBtn, flash && styles.circleBtnActive]} onPress={() => setFlash(f => !f)}>
            <Ionicons name={flash ? 'flash' : 'flash-outline'} size={19} color={flash ? Colors.ink : '#fff'} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScanCorners />

      <View style={styles.hintWrap}>
        <View style={styles.hint}>
          <Ionicons name="locate-outline" size={16} color={Colors.lime} />
          <Text style={styles.hintText}>Center the machine in the frame</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.sideBtn} onPress={() => onScan(upload)} accessibilityRole="button" accessibilityLabel="Upload a photo from your library">
          <Ionicons name="image-outline" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.captureBtn} onPress={() => onScan(capture)} accessibilityRole="button" accessibilityLabel="Capture photo to identify machine">
          <View style={styles.captureBtnInner} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sideBtn} onPress={() => setFacing(f => (f === 'back' ? 'front' : 'back'))} accessibilityRole="button" accessibilityLabel="Flip camera">
          <Ionicons name="camera-reverse-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.controlsLabel}>Upload photo · Capture · Flip</Text>
      <View style={{ height: 50 }} />
    </View>
  );
}

function LoadingScreen() {
  const [msgIdx, setMsgIdx] = useState(0);
  const spin = React.useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const t = setInterval(() => setMsgIdx(i => Math.min(i + 1, LOADING_MESSAGES.length - 1)), 600);
    const loop = Animated.loop(
      Animated.timing(spin, { toValue: 1, duration: 800, easing: Easing.linear, useNativeDriver: true }),
    );
    loop.start();
    return () => { clearInterval(t); loop.stop(); };
  }, []);
  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  return (
    <View style={[styles.container, { alignItems: 'center', justifyContent: 'flex-end' }]}>
      <View style={{ height: 200, alignItems: 'center', gap: 18, marginBottom: 80 }}>
        <Animated.View style={[styles.spinner, { transform: [{ rotate }] }]} />
        <Text style={{ fontSize: 17, fontWeight: '600', color: '#fff', textAlign: 'center', paddingHorizontal: 40 }}>
          {LOADING_MESSAGES[msgIdx]}
        </Text>
        <View style={{ flexDirection: 'row', gap: 7 }}>
          {LOADING_MESSAGES.map((_, k) => (
            <View key={k} style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: k <= msgIdx ? Colors.lime : 'rgba(255,255,255,0.2)' }} />
          ))}
        </View>
      </View>
    </View>
  );
}

function ResultSheet({ result, onViewGuide, onRetake, onManual }: {
  result: MatchResult;
  onViewGuide: (key: string) => void;
  onRetake: () => void;
  onManual: () => void;
}) {
  const lowConfidence = result.top.confidence < 70;
  const [showAlts, setShowAlts] = useState(lowConfidence);
  const top = getMachine(result.top.key);
  return (
    <View style={[styles.container, { justifyContent: 'flex-end' }]}>
      <View style={styles.dimOverlay} />
      <SafeAreaView>
        <View style={styles.resultSheet}>
          <View style={styles.resultHandle} />
          <View style={styles.resultConfidence}>
            <View style={[styles.checkCircle, lowConfidence && styles.checkCircleLow]}>
              <Ionicons name={lowConfidence ? 'help' : 'checkmark'} size={13} color="#fff" />
            </View>
            <Text style={styles.confidenceText}>
              {lowConfidence ? 'Best guess' : 'High confidence match'} · {result.top.confidence}%
            </Text>
          </View>
          {lowConfidence && (
            <Text style={styles.lowHint}>Not sure about this one — check the matches below or add it yourself.</Text>
          )}
          <View style={styles.resultMachine}>
            <View style={styles.resultImage}><MachineIcon illo={top.illo} size={46} color={Colors.green} /></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.resultName}>{top.name}</Text>
              <View style={{ flexDirection: 'row', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                <View style={styles.chip}><Text style={styles.chipText}>{top.cat}</Text></View>
                {top.beginner && <View style={[styles.chip, styles.chipLime]}><Text style={[styles.chipText, { color: '#0a1f12' }]}>Beginner-friendly</Text></View>}
              </View>
            </View>
          </View>
          {!showAlts ? (
            <TouchableOpacity style={styles.altToggle} onPress={() => setShowAlts(true)}>
              <Ionicons name="swap-horizontal-outline" size={16} color={Colors.labelSecondary} />
              <Text style={styles.altToggleText}>Not quite right? See other matches</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ marginVertical: 16, gap: 8 }}>
              <Text style={{ fontSize: 13, color: Colors.labelSecondary, marginBottom: 2 }}>Other possible matches</Text>
              {result.alternatives.map(a => {
                const m = getMachine(a.key);
                return (
                  <TouchableOpacity key={a.key} style={styles.altCard} onPress={() => onViewGuide(a.key)}>
                    <View style={styles.altIcon}><MachineIcon illo={m.illo} size={18} color={Colors.greenDeep} /></View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 15, fontWeight: '600', color: Colors.labelPrimary }}>{m.name}</Text>
                      <Text style={{ fontSize: 12, color: Colors.labelSecondary }}>{m.cat}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={Colors.labelTertiary} />
                  </TouchableOpacity>
                );
              })}
              <TouchableOpacity style={styles.manualRow} onPress={onManual}>
                <Ionicons name="add-circle-outline" size={18} color={Colors.greenDeep} />
                <Text style={styles.manualText}>None of these — add it manually</Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity style={styles.viewGuideBtn} onPress={() => onViewGuide(result.top.key)}>
            <Ionicons name="arrow-forward" size={19} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.viewGuideBtnText}>View beginner guide</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.retakeBtn} onPress={onRetake}>
            <Text style={styles.retakeBtnText}>Retake</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default function ScanTab() {
  const router = useRouter();
  const { current, saveTo } = usePlaces();
  const { userProfile } = useAuth();
  const [phase, setPhase] = useState<Phase>('ready');
  const [result, setResult] = useState<MatchResult | null>(null);

  const isPremium = userProfile?.subscriptionStatus === 'active';

  const notifyLimit = () => {
    const limit = dailyScanLimit(isPremium);
    if (isPremium) {
      Alert.alert('Daily limit reached', `You've used all ${limit} scans today. It resets tomorrow.`);
    } else {
      Alert.alert(
        'Daily scan limit reached',
        `Your plan includes ${limit} scans a day. Go Premium for ${PREMIUM_DAILY_SCANS} scans a day.`,
        [{ text: 'Not now', style: 'cancel' }, { text: 'Go Premium', onPress: () => router.push('/paywall') }],
      );
    }
  };

  // Fast client pre-check, then capture/pick → analyze (server enforces the
  // authoritative cap when the proxy is enabled).
  const runScan = async (getImage: () => Promise<ScanImage | null>) => {
    const used = await scansUsedToday();
    if (used >= dailyScanLimit(isPremium)) { notifyLimit(); return; }

    setPhase('loading');
    const image = await getImage();
    if (!image || !image.base64) { setPhase('ready'); return; }
    await recordScan();
    try {
      const r = await analyzePhoto(image);
      setResult(r);
      setPhase('result');
      if (r.top.confidence >= 70) haptics.success();
      else haptics.warn();
    } catch (e) {
      setPhase('ready');
      if (e instanceof ScanLimitError) notifyLimit();
      else Alert.alert('Scan failed', 'Something went wrong. Please try again.');
    }
  };

  const viewGuide = (key: string) => {
    // Save the recognized machine into the current place as "Scanned".
    if (current) saveTo(current.id, key, 'Scanned').catch(() => {});
    setPhase('ready');
    setResult(null);
    router.push({ pathname: '/guide/[key]', params: { key } });
  };

  if (phase === 'loading') return <LoadingScreen />;
  if (phase === 'result' && result) {
    return (
      <ResultSheet
        result={result}
        onViewGuide={viewGuide}
        onRetake={() => { setPhase('ready'); setResult(null); }}
        onManual={() => { setPhase('ready'); setResult(null); router.push('/add-machine'); }}
      />
    );
  }
  return <ScanScreen onScan={runScan} onClose={() => router.push('/(tabs)')} />;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#060c09' },
  vignette: { position: 'absolute', inset: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: 140 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingTop: 4 },
  topTitle: { fontSize: 16, fontWeight: '600', color: '#fff' },
  circleBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center' },
  circleBtnActive: { backgroundColor: Colors.lime },
  scanFrame: { position: 'absolute', width: 272, height: 272, top: '44%', left: '50%', transform: [{ translateX: -136 }, { translateY: -136 }] },
  corner: { position: 'absolute', width: 46, height: 46, borderColor: Colors.lime },
  scanline: { position: 'absolute', left: 6, right: 6, height: 2, borderRadius: 2, backgroundColor: Colors.lime, shadowColor: Colors.lime, shadowOpacity: 0.8, shadowRadius: 8, shadowOffset: { width: 0, height: 0 } },
  hintWrap: { position: 'absolute', bottom: 180, left: 0, right: 0, alignItems: 'center' },
  hint: { flexDirection: 'row', alignItems: 'center', gap: 8, height: 38, paddingHorizontal: 16, borderRadius: 19, backgroundColor: 'rgba(6,14,10,0.7)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  hintText: { fontSize: 14, fontWeight: '500', color: '#eafff0' },
  controls: { position: 'absolute', bottom: 60, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 30 },
  sideBtn: { width: 52, height: 52, borderRadius: 15, borderWidth: 1, borderColor: 'rgba(255,255,255,0.16)', backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },
  captureBtn: { width: 78, height: 78, borderRadius: 39, borderWidth: 4, borderColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center' },
  captureBtnInner: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#fff' },
  controlsLabel: { position: 'absolute', bottom: 36, left: 0, right: 0, textAlign: 'center', fontSize: 13, fontWeight: '500', color: 'rgba(234,255,240,0.5)' },
  uploadInstead: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  spinner: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: 'rgba(201,251,78,0.25)', borderTopColor: Colors.lime },
  dimOverlay: { position: 'absolute', inset: 0, backgroundColor: 'rgba(6,12,9,0.5)' },
  resultSheet: { backgroundColor: '#fff', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 22, paddingTop: 10, paddingBottom: 32 },
  resultHandle: { width: 38, height: 5, borderRadius: 3, backgroundColor: '#e5e5ea', alignSelf: 'center', marginBottom: 18 },
  resultConfidence: { flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 14 },
  checkCircle: { width: 22, height: 22, borderRadius: 11, backgroundColor: Colors.green, alignItems: 'center', justifyContent: 'center' },
  checkCircleLow: { backgroundColor: Colors.amber },
  confidenceText: { fontSize: 13, fontWeight: '600', color: Colors.greenDeep },
  lowHint: { fontSize: 13, color: Colors.labelSecondary, marginTop: 8, lineHeight: 18 },
  resultMachine: { flexDirection: 'row', gap: 16, alignItems: 'center' },
  resultImage: { width: 96, height: 96, borderRadius: 16, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  resultName: { fontSize: 24, fontWeight: '700', color: Colors.labelPrimary, letterSpacing: -0.5 },
  chip: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 100, backgroundColor: Colors.mist },
  chipText: { fontSize: 12, fontWeight: '600', color: Colors.greenDeep },
  chipLime: { backgroundColor: Colors.lime },
  altToggle: { flexDirection: 'row', alignItems: 'center', gap: 6, marginVertical: 16 },
  altToggleText: { fontSize: 14, fontWeight: '500', color: Colors.labelSecondary },
  altCard: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 10, borderRadius: 13, borderWidth: 1, borderColor: Colors.separator, backgroundColor: '#fff' },
  altIcon: { width: 36, height: 36, borderRadius: 9, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  manualRow: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 10, marginTop: 2 },
  manualText: { fontSize: 14, fontWeight: '600', color: Colors.greenDeep },
  viewGuideBtn: { height: 54, backgroundColor: Colors.green, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  viewGuideBtnText: { fontSize: 17, fontWeight: '600', color: '#fff', letterSpacing: -0.3 },
  retakeBtn: { height: 48, borderRadius: 14, backgroundColor: '#f2f2f7', alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  retakeBtnText: { fontSize: 16, fontWeight: '500', color: Colors.labelPrimary },
  btnLime: { height: 52, paddingHorizontal: 28, borderRadius: 16, backgroundColor: Colors.lime, alignItems: 'center', justifyContent: 'center' },
});

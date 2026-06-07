import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, SafeAreaView,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

const { width, height } = Dimensions.get('window');
type Phase = 'ready' | 'scanning' | 'loading' | 'result';

const LOADING_MESSAGES = [
  "Looking for the machine's shape…",
  'Checking possible matches…',
  'Preparing your beginner guide…',
];

function ScanCorners() {
  const lime = Colors.lime;
  return (
    <View style={styles.scanFrame}>
      {/* TL */ }
      <View style={[styles.corner, { top: -2, left: -2, borderTopWidth: 3.5, borderLeftWidth: 3.5, borderTopLeftRadius: 14 }]} />
      {/* TR */}
      <View style={[styles.corner, { top: -2, right: -2, borderTopWidth: 3.5, borderRightWidth: 3.5, borderTopRightRadius: 14 }]} />
      {/* BL */}
      <View style={[styles.corner, { bottom: -2, left: -2, borderBottomWidth: 3.5, borderLeftWidth: 3.5, borderBottomLeftRadius: 14 }]} />
      {/* BR */}
      <View style={[styles.corner, { bottom: -2, right: -2, borderBottomWidth: 3.5, borderRightWidth: 3.5, borderBottomRightRadius: 14 }]} />
    </View>
  );
}

function ScanScreen({ onCapture, onClose }: { onCapture: () => void; onClose: () => void }) {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission?.granted) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center', gap: 20 }]}>
        <Ionicons name="camera-outline" size={64} color={Colors.lime} />
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: '600', textAlign: 'center', paddingHorizontal: 40 }}>
          Camera access needed to scan machines
        </Text>
        <TouchableOpacity style={styles.btnLime} onPress={requestPermission}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.ink }}>Allow Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={StyleSheet.absoluteFill} facing="back" />
      <View style={styles.vignette} />
      <SafeAreaView style={{ flex: 1 }}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.circleBtn} onPress={onClose}>
            <Ionicons name="close" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.topTitle}>Scan machine</Text>
          <TouchableOpacity style={styles.circleBtn}>
            <Ionicons name="flash-outline" size={19} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Scan frame with corners */}
      <ScanCorners />

      {/* Hint pill */}
      <View style={styles.hintWrap}>
        <View style={styles.hint}>
          <Ionicons name="locate-outline" size={16} color={Colors.lime} />
          <Text style={styles.hintText}>Center the machine in the frame</Text>
        </View>
      </View>

      {/* Bottom controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.sideBtn}>
          <Ionicons name="image-outline" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.captureBtn} onPress={onCapture}>
          <View style={styles.captureBtnInner} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sideBtn}>
          <Ionicons name="camera-reverse-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.controlsLabel}>Upload photo · Capture · Flip</Text>
      <View style={{ height: 50 }} />
    </View>
  );
}

function LoadingScreen({ onClose }: { onClose: () => void }) {
  const [msgIdx, setMsgIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setMsgIdx(i => Math.min(i + 1, LOADING_MESSAGES.length - 1)), 950);
    return () => clearInterval(t);
  }, []);

  return (
    <View style={[styles.container, { alignItems: 'center', justifyContent: 'flex-end' }]}>
      <View style={{ height: 200, alignItems: 'center', gap: 18, marginBottom: 80 }}>
        <Animated.View style={styles.spinner} />
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

function ResultSheet({ onViewGuide, onClose, onRetake }: { onViewGuide: () => void; onClose: () => void; onRetake: () => void }) {
  const [showAlts, setShowAlts] = useState(false);
  return (
    <View style={[styles.container, { justifyContent: 'flex-end' }]}>
      <View style={styles.dimOverlay} />
      <SafeAreaView>
        <View style={styles.resultSheet}>
          <View style={styles.resultHandle} />
          <View style={styles.resultConfidence}>
            <View style={styles.checkCircle}>
              <Ionicons name="checkmark" size={13} color="#fff" />
            </View>
            <Text style={styles.confidenceText}>High confidence match · 96%</Text>
          </View>
          <View style={styles.resultMachine}>
            <View style={styles.resultImage}>
              <Ionicons name="barbell-outline" size={48} color={Colors.green} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.resultName}>Lat Pulldown</Text>
              <View style={{ flexDirection: 'row', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                <View style={styles.chip}><Text style={styles.chipText}>Back · Lats</Text></View>
                <View style={[styles.chip, styles.chipLime]}><Text style={[styles.chipText, { color: '#0a1f12' }]}>Beginner-friendly</Text></View>
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
              {['Seated Cable Row', 'Assisted Pull-Up'].map(n => (
                <TouchableOpacity key={n} style={styles.altCard} onPress={onViewGuide}>
                  <View style={styles.altIcon}><Ionicons name="barbell-outline" size={18} color={Colors.greenDeep} /></View>
                  <Text style={{ flex: 1, fontSize: 15, fontWeight: '600', color: Colors.labelPrimary }}>{n}</Text>
                  <Ionicons name="chevron-forward" size={18} color={Colors.labelTertiary} />
                </TouchableOpacity>
              ))}
            </View>
          )}
          <TouchableOpacity style={styles.viewGuideBtn} onPress={onViewGuide}>
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
  const [phase, setPhase] = useState<Phase>('ready');

  const capture = () => {
    setPhase('scanning');
    setTimeout(() => setPhase('loading'), 1100);
    setTimeout(() => setPhase('result'), 3900);
  };

  const close = () => setPhase('ready');
  const viewGuide = () => {
    setPhase('ready');
    router.push({ pathname: '/guide/[key]', params: { key: 'lat' } });
  };

  if (phase === 'loading') return <LoadingScreen onClose={close} />;
  if (phase === 'result') return <ResultSheet onViewGuide={viewGuide} onClose={close} onRetake={() => setPhase('ready')} />;
  return <ScanScreen onCapture={capture} onClose={close} />;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#060c09' },
  vignette: { position: 'absolute', inset: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: 140 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingTop: 4 },
  topTitle: { fontSize: 16, fontWeight: '600', color: '#fff' },
  circleBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center' },
  scanFrame: {
    position: 'absolute',
    width: 272, height: 272,
    top: '44%', left: '50%',
    transform: [{ translateX: -136 }, { translateY: -136 }],
  },
  corner: { position: 'absolute', width: 46, height: 46, borderColor: Colors.lime },
  hintWrap: { position: 'absolute', bottom: 180, left: 0, right: 0, alignItems: 'center' },
  hint: { flexDirection: 'row', alignItems: 'center', gap: 8, height: 38, paddingHorizontal: 16, borderRadius: 19, backgroundColor: 'rgba(6,14,10,0.7)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  hintText: { fontSize: 14, fontWeight: '500', color: '#eafff0' },
  controls: { position: 'absolute', bottom: 60, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 30 },
  sideBtn: { width: 52, height: 52, borderRadius: 15, borderWidth: 1, borderColor: 'rgba(255,255,255,0.16)', backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },
  captureBtn: { width: 78, height: 78, borderRadius: 39, borderWidth: 4, borderColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center' },
  captureBtnInner: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#fff' },
  controlsLabel: { position: 'absolute', bottom: 36, left: 0, right: 0, textAlign: 'center', fontSize: 13, fontWeight: '500', color: 'rgba(234,255,240,0.5)' },
  spinner: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: 'rgba(201,251,78,0.25)', borderTopColor: Colors.lime },
  dimOverlay: { position: 'absolute', inset: 0, backgroundColor: 'rgba(6,12,9,0.5)' },
  resultSheet: { backgroundColor: '#fff', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 22, paddingTop: 10, paddingBottom: 32 },
  resultHandle: { width: 38, height: 5, borderRadius: 3, backgroundColor: '#e5e5ea', alignSelf: 'center', marginBottom: 18 },
  resultConfidence: { flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 14 },
  checkCircle: { width: 22, height: 22, borderRadius: 11, backgroundColor: Colors.green, alignItems: 'center', justifyContent: 'center' },
  confidenceText: { fontSize: 13, fontWeight: '600', color: Colors.greenDeep },
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
  viewGuideBtn: { height: 54, backgroundColor: Colors.green, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  viewGuideBtnText: { fontSize: 17, fontWeight: '600', color: '#fff', letterSpacing: -0.3 },
  retakeBtn: { height: 48, borderRadius: 14, backgroundColor: '#f2f2f7', alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  retakeBtnText: { fontSize: 16, fontWeight: '500', color: Colors.labelPrimary },
  btnLime: { height: 52, paddingHorizontal: 28, borderRadius: 16, backgroundColor: Colors.lime, alignItems: 'center', justifyContent: 'center' },
});

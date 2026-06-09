import React, { useRef, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, Dimensions, Image, Animated,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { getMachine, findKeyByName } from '../../constants/machines';
import MachineIcon from '../../components/MachineIcon';
import * as haptics from '../../lib/haptics';
import { usePlaces } from '../../context/PlacesContext';
import { useWorkouts } from '../../context/WorkoutsContext';
import MuscleMap from '../../components/MuscleMap';

const TABS = ['Setup', 'Movement', 'Mistakes', 'Alternatives'];

function StepList({ steps }: { steps: string[] }) {
  return (
    <View style={styles.stepList}>
      {steps.map((s, i) => (
        <View key={i} style={styles.stepRow}>
          <View style={styles.stepLeft}>
            <View style={styles.stepNum}>
              <Text style={styles.stepNumText}>{i + 1}</Text>
            </View>
            {i < steps.length - 1 && <View style={styles.stepLine} />}
          </View>
          <Text style={styles.stepText}>{s}</Text>
        </View>
      ))}
    </View>
  );
}

function MistakeCard({ t, w, f }: { t: string; w: string; f: string }) {
  return (
    <View style={styles.mistakeCard}>
      <View style={styles.mistakeHeader}>
        <View style={styles.mistakeIcon}>
          <Ionicons name="information-circle-outline" size={16} color="#C4801A" />
        </View>
        <Text style={styles.mistakeTitle}>{t}</Text>
      </View>
      <Text style={styles.mistakeWhy}>{w}</Text>
      <View style={styles.mistakeFix}>
        <Ionicons name="checkmark" size={16} color={Colors.greenDeep} style={{ marginTop: 1 }} />
        <Text style={styles.mistakeFixText}><Text style={{ fontWeight: '700', color: Colors.greenDeep }}>Try this — </Text>{f}</Text>
      </View>
    </View>
  );
}

function AltCard({ n, muscle, tag, altKey, onPress }: { n: string; muscle: string; tag: string; altKey?: string; onPress?: () => void }) {
  const tagColor = tag === 'Easier' ? Colors.mist : tag === 'No machine' ? '#f2f2f7' : Colors.lime;
  const tagTextColor = tag === 'No machine' ? Colors.labelSecondary : tag === 'Easier' ? Colors.greenDeep : '#0a1f12';
  return (
    <TouchableOpacity style={styles.altCard} onPress={onPress} activeOpacity={onPress ? 0.7 : 1} disabled={!onPress}>
      <View style={styles.altIcon}><MachineIcon machineKey={altKey} size={20} color={Colors.greenDeep} /></View>
      <View style={{ flex: 1 }}>
        <Text style={styles.altName}>{n}</Text>
        <Text style={styles.altMuscle}>{muscle}</Text>
      </View>
      <View style={[styles.altTag, { backgroundColor: tagColor }]}>
        <Text style={[styles.altTagText, { color: tagTextColor }]}>{tag}</Text>
      </View>
      {onPress && <Ionicons name="chevron-forward" size={16} color={Colors.labelTertiary} style={{ marginLeft: 4 }} />}
    </TouchableOpacity>
  );
}

export default function GuideScreen() {
  const router = useRouter();
  const { key } = useLocalSearchParams<{ key: string }>();
  const [tab, setTab] = useState(0);
  const { current, isSaved, toggle, saveTo, setPhoto, photoFor } = usePlaces();
  const { startDraft } = useWorkouts();

  const machineKey = key ?? 'lat';
  const machine = getMachine(machineKey);
  const saved = current ? isSaved(machineKey, current.id) : false;

  const [localPhoto, setLocalPhoto] = useState<string | null>(null);
  const photo = localPhoto ?? (current ? photoFor(machineKey, current.id) : null);

  // Cross-fade the tab content when switching tabs.
  const tabFade = useRef(new Animated.Value(1)).current;
  const changeTab = (i: number) => {
    if (i === tab) return;
    setTab(i);
    tabFade.setValue(0);
    Animated.timing(tabFade, { toValue: 1, duration: 220, useNativeDriver: true }).start();
  };

  const onToggleSave = () => {
    haptics.tap();
    toggle(machineKey, 'Added');
  };

  const dropPhoto = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.7 });
    if (res.canceled || !res.assets[0]) return;
    const uri = res.assets[0].uri;
    setLocalPhoto(uri);
    if (current) {
      // Make sure it's saved, then attach the photo to the saved copy.
      if (!isSaved(machineKey, current.id)) await saveTo(current.id, machineKey, 'Added');
      await setPhoto(machineKey, uri, current.id);
    }
  };

  const addToWorkout = () => {
    startDraft([machineKey], {
      goal: machine.name, time: '15 min', difficulty: 'Beginner',
      placeId: current?.id ?? null, placeName: current?.name ?? '', title: `${machine.name} workout`,
    });
    router.push('/workout/preview');
  };

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <LinearGradient colors={[Colors.ink2, Colors.ink]} style={StyleSheet.absoluteFill} />
          <SafeAreaView>
            <View style={styles.heroNav}>
              <TouchableOpacity style={styles.heroBackBtn} onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Go back">
                <Ionicons name="chevron-back" size={20} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.heroBackBtn, saved && { backgroundColor: Colors.green }]} onPress={onToggleSave} accessibilityRole="button" accessibilityLabel={saved ? 'Remove from saved machines' : 'Save this machine'}>
                <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          <TouchableOpacity style={styles.heroImage} activeOpacity={0.85} onPress={dropPhoto}>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.heroPhoto} resizeMode="cover" />
            ) : (
              <>
                <MachineIcon machineKey={machineKey} size={76} color={Colors.lime} />
                <View style={styles.dropHint}>
                  <Ionicons name="camera-outline" size={14} color="rgba(255,255,255,0.8)" />
                  <Text style={styles.dropHintText}>Drop a photo</Text>
                </View>
              </>
            )}
          </TouchableOpacity>

          <View style={styles.heroText}>
            <Text style={styles.heroName}>{machine.name}</Text>
            <View style={styles.heroChips}>
              <View style={styles.chip}><Text style={styles.chipText}>Beginner-friendly</Text></View>
              <View style={[styles.chip, styles.chipDark]}><Text style={[styles.chipText, { color: 'rgba(223,247,231,0.85)' }]}>{machine.cat}</Text></View>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          {/* Summary */}
          <Text style={styles.summary}>{machine.summary}</Text>

          {/* Muscle section */}
          <View style={styles.muscleSection}>
            <LinearGradient colors={[Colors.ink2, Colors.ink]} style={[StyleSheet.absoluteFill, { borderRadius: 20 }]} />
            <View style={styles.musclePlaceholder}>
              <MuscleMap map={machine.map} />
            </View>
            <View style={styles.muscleList}>
              <Text style={styles.muscleEyebrow}>What you're training</Text>
              {machine.muscles.map(m => (
                <View key={m.n} style={styles.muscleRow}>
                  <View style={[styles.muscleDot, { backgroundColor: m.primary ? Colors.green : '#bfe585' }]} />
                  <Text style={styles.muscleName}>{m.n}</Text>
                  <Text style={styles.muscleType}>{m.primary ? 'Primary' : 'Secondary'}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Quick start */}
          <View style={styles.quickStart}>
            <View style={styles.quickStartHeader}>
              <Ionicons name="flash" size={18} color="#5a7a05" />
              <Text style={styles.quickStartTitle}>Beginner quick start</Text>
            </View>
            <View style={styles.quickGrid}>
              {machine.quick.map(q => (
                <View key={q.k} style={styles.quickItem}>
                  <View style={styles.quickItemIcon}>
                    <Ionicons name="information-circle-outline" size={18} color="#5a7a05" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.quickItemKey}>{q.k}</Text>
                    <Text style={styles.quickItemVal}>{q.v}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Tab bar */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar} contentContainerStyle={{ gap: 6, paddingHorizontal: 2 }}>
            {TABS.map((t, i) => (
              <TouchableOpacity
                key={t}
                style={[styles.tabItem, tab === i && styles.tabItemActive]}
                onPress={() => changeTab(i)}
              >
                <Text style={[styles.tabLabel, tab === i && styles.tabLabelActive]}>{t}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Tab content */}
          <Animated.View style={[styles.tabContent, { opacity: tabFade }]}>
            {tab === 0 && <StepList steps={machine.setup} />}
            {tab === 1 && <StepList steps={machine.movement} />}
            {tab === 2 && (
              <View style={{ gap: 12 }}>
                {machine.mistakes.map((m, i) => <MistakeCard key={i} {...m} />)}
              </View>
            )}
            {tab === 3 && (
              <View style={{ gap: 10 }}>
                <View style={styles.altNote}>
                  <Ionicons name="swap-horizontal-outline" size={17} color={Colors.greenDeep} />
                  <Text style={styles.altNoteText}>Machine taken? These train the same muscles.</Text>
                </View>
                {machine.alts.map((a, i) => {
                  const altKey = findKeyByName(a.n);
                  return (
                    <AltCard
                      key={i}
                      {...a}
                      altKey={altKey ?? undefined}
                      onPress={altKey ? () => router.push({ pathname: '/guide/[key]', params: { key: altKey } }) : undefined}
                    />
                  );
                })}
              </View>
            )}
          </Animated.View>

          {/* Safety note */}
          <View style={styles.safetyNote}>
            <Ionicons name="shield-checkmark-outline" size={18} color={Colors.greenDeep} style={{ flexShrink: 0, marginTop: 1 }} />
            <Text style={styles.safetyText}>Move slowly and keep breathing — don't hold your breath. Stop if you feel sharp pain, dizziness, or chest pressure. New to exercise, pregnant or postpartum, or managing a heart, blood-pressure, or back condition? Check with your doctor first. Good form beats heavy weight every time.</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTAs */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.btnPrimary} activeOpacity={0.85} onPress={addToWorkout}>
          <Ionicons name="add-circle-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.btnPrimaryText}>Add to Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSecondary} activeOpacity={0.85} onPress={onToggleSave}>
          <Text style={styles.btnSecondaryText}>{saved ? `Saved to ${current?.name ?? 'My place'}` : 'Save to My Places'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F4F6F0' },
  hero: { paddingBottom: 28, overflow: 'hidden', position: 'relative' },
  heroNav: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 8 },
  heroBackBtn: { width: 38, height: 38, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center' },
  heroImage: { height: 180, alignItems: 'center', justifyContent: 'center', marginTop: 12 },
  heroPhoto: { width: '100%', height: 180 },
  dropHint: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 12, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.12)' },
  dropHintText: { fontSize: 12, fontWeight: '500', color: 'rgba(255,255,255,0.8)' },
  heroText: { paddingHorizontal: 22, gap: 10 },
  heroName: { fontSize: 32, fontWeight: '700', color: '#fff', letterSpacing: -0.7 },
  heroChips: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  chip: { paddingHorizontal: 11, paddingVertical: 5, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.15)' },
  chipText: { fontSize: 13, fontWeight: '600', color: '#fff' },
  chipDark: { backgroundColor: 'rgba(201,251,78,0.2)' },
  body: { padding: 20, gap: 20, paddingBottom: 120 },
  summary: { fontSize: 16, lineHeight: 24, color: Colors.labelSecondary },
  muscleSection: { borderRadius: 20, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', gap: 16, padding: 18, position: 'relative' },
  musclePlaceholder: { width: 120, height: 120, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  muscleList: { flex: 1, gap: 8 },
  muscleEyebrow: { fontSize: 12, fontWeight: '600', letterSpacing: 1.5, textTransform: 'uppercase', color: Colors.lime, marginBottom: 4 },
  muscleRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  muscleDot: { width: 9, height: 9, borderRadius: 5 },
  muscleName: { fontSize: 15, fontWeight: '500', color: '#fff', flex: 1 },
  muscleType: { fontSize: 11, color: 'rgba(223,247,231,0.5)' },
  quickStart: { backgroundColor: Colors.limeSoft, borderRadius: 20, padding: 16, borderWidth: 1, borderColor: '#d6f08a' },
  quickStartHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  quickStartTitle: { fontSize: 16, fontWeight: '700', color: '#3c5206', letterSpacing: -0.2 },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  quickItem: { width: '45%', flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  quickItemIcon: { width: 34, height: 34, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.7)', alignItems: 'center', justifyContent: 'center' },
  quickItemKey: { fontSize: 13, fontWeight: '600', color: '#3c5206' },
  quickItemVal: { fontSize: 12, color: '#5d6b3f', marginTop: 2, lineHeight: 16 },
  tabBar: { marginBottom: 4 },
  tabItem: { height: 38, paddingHorizontal: 16, borderRadius: 10, backgroundColor: '#fff', borderWidth: 1, borderColor: Colors.separator, alignItems: 'center', justifyContent: 'center' },
  tabItemActive: { backgroundColor: Colors.green, borderColor: Colors.green },
  tabLabel: { fontSize: 15, fontWeight: '600', color: Colors.labelSecondary },
  tabLabelActive: { color: '#fff' },
  tabContent: { minHeight: 120 },
  stepList: { gap: 0 },
  stepRow: { flexDirection: 'row', gap: 14 },
  stepLeft: { alignItems: 'center', width: 28 },
  stepNum: { width: 28, height: 28, borderRadius: 14, backgroundColor: Colors.green, alignItems: 'center', justifyContent: 'center' },
  stepNumText: { fontSize: 14, fontWeight: '700', color: '#fff' },
  stepLine: { width: 2, flex: 1, minHeight: 14, backgroundColor: Colors.mist, marginVertical: 4 },
  stepText: { flex: 1, fontSize: 15, lineHeight: 22, color: Colors.labelPrimary, paddingTop: 2, paddingBottom: 16 },
  mistakeCard: { backgroundColor: '#fff', borderRadius: 16, padding: 15, borderWidth: 1, borderColor: Colors.separator },
  mistakeHeader: { flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 8 },
  mistakeIcon: { width: 26, height: 26, borderRadius: 8, backgroundColor: '#FEF1DC', alignItems: 'center', justifyContent: 'center' },
  mistakeTitle: { fontSize: 16, fontWeight: '600', color: Colors.labelPrimary, flex: 1 },
  mistakeWhy: { fontSize: 13, lineHeight: 19, color: Colors.labelSecondary, marginBottom: 10 },
  mistakeFix: { flexDirection: 'row', gap: 8, backgroundColor: Colors.mist, borderRadius: 11, padding: 10 },
  mistakeFixText: { flex: 1, fontSize: 13, lineHeight: 19, color: Colors.greenInk },
  altNote: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: Colors.mist2, borderRadius: 12, padding: 11, marginBottom: 4, borderWidth: 1, borderColor: Colors.green },
  altNoteText: { flex: 1, fontSize: 13, lineHeight: 19, color: Colors.greenInk, fontWeight: '500' },
  altCard: { flexDirection: 'row', alignItems: 'center', gap: 13, padding: 12, borderRadius: 15, backgroundColor: '#fff', borderWidth: 1, borderColor: Colors.separator },
  altIcon: { width: 44, height: 44, borderRadius: 11, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  altName: { fontSize: 16, fontWeight: '600', color: Colors.labelPrimary },
  altMuscle: { fontSize: 12, color: Colors.labelSecondary, marginTop: 2 },
  altTag: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  altTagText: { fontSize: 12, fontWeight: '600' },
  safetyNote: { flexDirection: 'row', gap: 10, backgroundColor: Colors.mist, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: '#d6f08a' },
  safetyText: { flex: 1, fontSize: 13, lineHeight: 19, color: Colors.greenInk },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(244,246,240,0.95)', padding: 16, paddingBottom: 32, borderTopWidth: 0.5, borderTopColor: Colors.separator, gap: 10 },
  btnPrimary: { height: 54, backgroundColor: Colors.green, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  btnPrimaryText: { fontSize: 17, fontWeight: '600', color: '#fff', letterSpacing: -0.3 },
  btnSecondary: { height: 48, backgroundColor: Colors.mist, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  btnSecondaryText: { fontSize: 16, fontWeight: '600', color: Colors.greenDeep },
});

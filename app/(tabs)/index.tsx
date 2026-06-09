import React, { useMemo } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Dimensions, Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import MachineIcon from '../../components/MachineIcon';
import { allMachines } from '../../constants/machines';
import { workoutStreak } from '../../lib/streak';
import { useCountUp } from '../../lib/useCountUp';
import Skeleton from '../../components/Skeleton';
import PressableScale from '../../components/PressableScale';

const CATALOG_COUNT = allMachines().length;
import { useAuth } from '../../context/AuthContext';
import { usePlaces } from '../../context/PlacesContext';
import { useWorkouts } from '../../context/WorkoutsContext';

const { width } = Dimensions.get('window');

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}


function SectionHead({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <View style={styles.sectionHead}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action && <TouchableOpacity onPress={onAction}><Text style={styles.sectionAction}>{action}</Text></TouchableOpacity>}
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const { userProfile } = useAuth();
  const { current, currentMachines, recent, saved, loading } = usePlaces();
  const { history, startDraft } = useWorkouts();

  const firstName = userProfile?.displayName?.split(' ')[0] ?? 'there';
  const streak = useMemo(() => workoutStreak(history.map(w => w.createdAt)), [history]);

  const savedCount = useCountUp(saved.length);
  const workoutCount = useCountUp(history.length);
  const confidentCount = useCountUp(saved.filter(s => s.status === 'Comfortable').length);

  const lastWorkout = history[0];
  const repeatLast = () => {
    if (!lastWorkout?.exerciseKeys?.length) return;
    startDraft(lastWorkout.exerciseKeys, {
      goal: lastWorkout.title, time: '30 min', difficulty: 'Beginner',
      placeId: current?.id ?? null, placeName: current?.name ?? '', title: lastWorkout.title,
    });
    router.push('/workout/preview');
  };

  const QUICK = [
    { icon: 'list-outline' as const, title: 'Beginner workout', sub: 'Build in 1 tap', onPress: () => router.push('/workout/builder') },
    { icon: 'business-outline' as const, title: current?.name ?? 'My place', sub: `${currentMachines.length} machines`, onPress: () => router.push('/(tabs)/my-gym') },
  ];

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.greeting}>{getGreeting()}, {firstName}</Text>
            <Text style={styles.tagline}>Ready to learn a machine?</Text>
          </View>
          <View style={styles.streak}>
            <Ionicons name="flame" size={16} color={streak > 0 ? Colors.amber : Colors.labelTertiary} />
            <Text style={[styles.streakNum, streak === 0 && { color: Colors.labelTertiary }]}>{streak}</Text>
          </View>
        </View>

        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
          <View style={styles.heroWrap}>
            <PressableScale style={styles.hero} scaleTo={0.98} onPress={() => router.push('/(tabs)/scan')} accessibilityRole="button" accessibilityLabel="Scan a machine">
              <LinearGradient colors={[Colors.ink2, Colors.ink]} style={StyleSheet.absoluteFill} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} />
              <View style={styles.heroCornerGraphic}><Ionicons name="scan-outline" size={28} color={Colors.lime} /></View>
              <View style={styles.heroContent}>
                <View style={styles.heroIconBox}><Ionicons name="scan-outline" size={28} color={Colors.ink} /></View>
                <Text style={styles.heroEyebrow}>Start here</Text>
                <Text style={styles.heroTitle}>Scan a machine</Text>
                <Text style={styles.heroBody}>Point your camera at any machine to get a beginner guide in seconds.</Text>
              </View>
            </PressableScale>
          </View>

          <View style={styles.section}>
            <TouchableOpacity style={styles.addManual} activeOpacity={0.8} onPress={() => router.push('/add-machine')}>
              <Ionicons name="add-circle-outline" size={18} color={Colors.greenDeep} />
              <Text style={styles.addManualText}>Add a machine manually</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <View style={styles.quickGrid}>
              {QUICK.map(q => (
                <PressableScale key={q.title} containerStyle={{ flex: 1 }} style={styles.quickCard} onPress={q.onPress}>
                  <View style={styles.quickIcon}><Ionicons name={q.icon} size={20} color={Colors.greenDeep} /></View>
                  <Text style={styles.quickTitle} numberOfLines={1}>{q.title}</Text>
                  <Text style={styles.quickSub}>{q.sub}</Text>
                </PressableScale>
              ))}
            </View>
          </View>

          {lastWorkout?.exerciseKeys?.length ? (
            <View style={styles.section}>
              <PressableScale style={styles.resumeCard} scaleTo={0.98} onPress={repeatLast}>
                <View style={styles.resumeIcon}><Ionicons name="refresh" size={22} color={Colors.lime} /></View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.resumeEyebrow}>JUMP BACK IN</Text>
                  <Text style={styles.resumeTitle} numberOfLines={1}>{lastWorkout.title}</Text>
                  <Text style={styles.resumeSub}>{lastWorkout.completedCount}/{lastWorkout.totalCount} exercises last time</Text>
                </View>
                <View style={styles.resumeBtn}><Text style={styles.resumeBtnText}>Repeat</Text></View>
              </PressableScale>
            </View>
          ) : null}

          <View style={[styles.section, { paddingHorizontal: 0 }]}>
            <View style={{ paddingHorizontal: 20, marginBottom: 8 }}>
              <SectionHead title="Recently scanned" action={recent.length ? 'See all' : undefined} onAction={() => router.push('/library')} />
            </View>
            {loading && recent.length === 0 ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}>
                {[0, 1, 2].map(i => (
                  <View key={i} style={styles.recentCard}>
                    <Skeleton style={styles.recentImagePlaceholder} />
                    <View style={styles.recentInfo}>
                      <Skeleton style={[styles.skeletonLine, { width: '80%' }]} />
                      <Skeleton style={[styles.skeletonLine, { width: '55%' }]} />
                    </View>
                  </View>
                ))}
              </ScrollView>
            ) : recent.length === 0 ? (
              <View style={styles.emptyWrap}>
                <Ionicons name="barbell-outline" size={40} color={Colors.labelTertiary} />
                <Text style={styles.emptyTitle}>No machines saved yet</Text>
                <Text style={styles.emptySub}>Scan a machine or add one manually to get started.</Text>
                <TouchableOpacity style={styles.emptyBtn} onPress={() => router.push('/add-machine')}>
                  <Text style={styles.emptyBtnText}>Add your first machine</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 12, paddingBottom: 4 }}>
                {recent.map(m => (
                  <PressableScale key={m.id} style={styles.recentCard} onPress={() => router.push({ pathname: '/guide/[key]', params: { key: m.key } })}>
                    <View style={styles.recentImagePlaceholder}>
                      {m.photoUri
                        ? <Image source={{ uri: m.photoUri }} style={styles.recentPhoto} resizeMode="cover" />
                        : <MachineIcon machineKey={m.key} size={34} color={Colors.green} />}
                    </View>
                    <View style={styles.recentInfo}>
                      <Text style={styles.recentName} numberOfLines={1}>{m.name}</Text>
                      <Text style={styles.recentMuscle} numberOfLines={1}>{m.cat}</Text>
                      <View style={styles.recentStatus}>
                        <View style={[styles.recentDot, { backgroundColor: m.status === 'Comfortable' ? Colors.green : m.status === 'Scanned' ? Colors.sky : Colors.amber }]} />
                        <Text style={styles.recentStatusText}>{m.status}</Text>
                      </View>
                    </View>
                  </PressableScale>
                ))}
              </ScrollView>
            )}
          </View>

          <View style={styles.section}>
            <TouchableOpacity style={styles.browseRow} activeOpacity={0.85} onPress={() => router.push('/library')}>
              <View style={styles.browseIcon}><Ionicons name="library-outline" size={20} color={Colors.greenDeep} /></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.browseTitle}>Browse the machine library</Text>
                <Text style={styles.browseSub}>{CATALOG_COUNT} machines · by body area</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Colors.labelTertiary} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.browseRow, { marginTop: 10 }]} activeOpacity={0.85} onPress={() => router.push('/routines')}>
              <View style={styles.browseIcon}><Ionicons name="list-outline" size={20} color={Colors.greenDeep} /></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.browseTitle}>Browse workout routines</Text>
                <Text style={styles.browseSub}>Find & save ready-made routines</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Colors.labelTertiary} />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <SectionHead title="Your progress" action="Details" onAction={() => router.push('/progress')} />
            <View style={styles.progressGrid}>
              {[
                { n: savedCount, label: 'machines\nsaved', icon: 'locate-outline' as const },
                { n: workoutCount, label: 'workouts\ndone', icon: 'barbell-outline' as const },
                { n: confidentCount, label: 'confident\nwith', icon: 'shield-checkmark-outline' as const },
              ].map(p => (
                <PressableScale key={p.label} containerStyle={{ flex: 1 }} style={styles.progressCard} onPress={() => router.push('/progress')}>
                  <Ionicons name={p.icon} size={19} color={Colors.green} />
                  <Text style={styles.progressNum}>{p.n}</Text>
                  <Text style={styles.progressLabel}>{p.label}</Text>
                </PressableScale>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F4F6F0' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 },
  greeting: { fontSize: 14, color: Colors.labelSecondary },
  tagline: { fontSize: 24, fontWeight: '700', letterSpacing: -0.5, color: Colors.labelPrimary, marginTop: 2 },
  streak: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 11, height: 34, borderRadius: 17, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6 },
  streakNum: { fontSize: 14, fontWeight: '700', color: Colors.labelPrimary },
  scroll: { flex: 1 },
  section: { paddingHorizontal: 20, marginBottom: 22 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 },
  sectionTitle: { fontSize: 19, fontWeight: '700', letterSpacing: -0.3, color: Colors.labelPrimary },
  sectionAction: { fontSize: 14, fontWeight: '600', color: Colors.greenDeep },
  heroWrap: { paddingHorizontal: 20, marginBottom: 12 },
  hero: { borderRadius: 24, overflow: 'hidden', padding: 22, shadowColor: '#000', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.22, shadowRadius: 30 },
  heroCornerGraphic: { position: 'absolute', right: 18, top: 18, opacity: 0.9 },
  heroContent: { gap: 0 },
  heroIconBox: { width: 50, height: 50, borderRadius: 15, backgroundColor: Colors.lime, alignItems: 'center', justifyContent: 'center', marginBottom: 52 },
  heroEyebrow: { fontSize: 12, fontWeight: '600', letterSpacing: 2, textTransform: 'uppercase', color: Colors.lime, marginBottom: 8 },
  heroTitle: { fontSize: 26, fontWeight: '700', color: '#fff', letterSpacing: -0.5 },
  heroBody: { fontSize: 14, color: 'rgba(223,247,231,0.62)', marginTop: 6, lineHeight: 20, maxWidth: 230 },
  addManual: { height: 46, borderRadius: 14, borderWidth: 1.5, borderColor: Colors.separator, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  addManualText: { fontSize: 15, fontWeight: '600', color: Colors.labelPrimary },
  quickGrid: { flexDirection: 'row', gap: 12 },
  resumeCard: { flexDirection: 'row', alignItems: 'center', gap: 13, backgroundColor: Colors.ink, borderRadius: 18, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 12 },
  resumeIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(201,251,78,0.14)', alignItems: 'center', justifyContent: 'center' },
  resumeEyebrow: { fontSize: 11, fontWeight: '700', letterSpacing: 1.4, color: Colors.lime },
  resumeTitle: { fontSize: 16, fontWeight: '700', color: '#fff', marginTop: 3, letterSpacing: -0.2 },
  resumeSub: { fontSize: 12, color: 'rgba(231,236,245,0.6)', marginTop: 2 },
  resumeBtn: { paddingHorizontal: 16, height: 38, borderRadius: 100, backgroundColor: Colors.lime, alignItems: 'center', justifyContent: 'center' },
  resumeBtnText: { fontSize: 14, fontWeight: '700', color: Colors.ink },
  quickCard: { flex: 1, backgroundColor: '#fff', borderRadius: 18, padding: 15, gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
  quickIcon: { width: 38, height: 38, borderRadius: 11, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  quickTitle: { fontSize: 15, fontWeight: '600', color: Colors.labelPrimary, letterSpacing: -0.2 },
  quickSub: { fontSize: 12, color: Colors.labelSecondary },
  emptyWrap: { alignItems: 'center', paddingVertical: 30, paddingHorizontal: 20, gap: 8 },
  emptyTitle: { fontSize: 16, fontWeight: '600', color: Colors.labelPrimary, marginTop: 8 },
  emptySub: { fontSize: 14, color: Colors.labelSecondary, textAlign: 'center', lineHeight: 20 },
  emptyBtn: { marginTop: 12, height: 42, paddingHorizontal: 20, borderRadius: 12, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: Colors.green },
  emptyBtnText: { fontSize: 14, fontWeight: '600', color: Colors.greenDeep },
  recentCard: { width: 150, backgroundColor: '#fff', borderRadius: 18, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
  recentImagePlaceholder: { height: 88, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  recentPhoto: { width: '100%', height: '100%' },
  skeletonLine: { height: 11, borderRadius: 6, marginTop: 4 },
  recentInfo: { padding: 10, gap: 3 },
  recentName: { fontSize: 14, fontWeight: '600', color: Colors.labelPrimary, letterSpacing: -0.2 },
  recentMuscle: { fontSize: 12, color: Colors.labelSecondary },
  recentStatus: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 },
  recentDot: { width: 6, height: 6, borderRadius: 3 },
  recentStatusText: { fontSize: 11, color: Colors.labelSecondary, fontWeight: '500' },
  browseRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#fff', borderRadius: 16, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4 },
  browseIcon: { width: 40, height: 40, borderRadius: 11, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  browseTitle: { fontSize: 15, fontWeight: '600', color: Colors.labelPrimary, letterSpacing: -0.2 },
  browseSub: { fontSize: 12, color: Colors.labelSecondary, marginTop: 2 },
  progressGrid: { flexDirection: 'row', gap: 12 },
  progressCard: { flex: 1, backgroundColor: '#fff', borderRadius: 18, paddingHorizontal: 14, paddingVertical: 15, gap: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
  progressNum: { fontSize: 22, fontWeight: '700', color: Colors.labelPrimary, letterSpacing: -0.5 },
  progressLabel: { fontSize: 11, color: Colors.labelSecondary, lineHeight: 14 },
});

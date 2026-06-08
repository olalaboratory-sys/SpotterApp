import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { usePlaces } from '../../context/PlacesContext';
import { useWorkouts } from '../../context/WorkoutsContext';
import { useAuth } from '../../context/AuthContext';
import { labelForGoal } from '../../constants/profile';
import { ROUTINES, getRoutine, Routine } from '../../constants/routines';
import { buildRoutineKeys } from '../../lib/buildWorkout';
import PressableScale from '../../components/PressableScale';

const FEEL_LABEL: Record<string, string> = { easy: 'Felt easy', right: 'Just right', hard: 'Felt tough' };

function timeAgo(d: Date | null): string {
  if (!d) return '';
  const days = Math.floor((Date.now() - d.getTime()) / 86400000);
  if (days <= 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  return d.toLocaleDateString();
}

export default function WorkoutsTab() {
  const router = useRouter();
  const { current, currentMachines } = usePlaces();
  const { history, startDraft, deleteWorkout, savedRoutines } = useWorkouts();
  const { userProfile } = useAuth();
  const goals = userProfile?.goals ?? [];
  const experienceLevel = userProfile?.experienceLevel ?? null;
  const placeKeys = useMemo(() => currentMachines.map(m => m.key), [currentMachines]);

  // Routines the user has favorited.
  const saved = useMemo(
    () => savedRoutines.map(s => getRoutine(s.routineId)).filter((r): r is Routine => !!r),
    [savedRoutines],
  );

  // A varied handful for quick access; the full set lives in the routine library.
  const quickStart = useMemo(() => ROUTINES.slice(0, 5), []);

  // Surface routines that best match the user's stated goals/experience.
  const recommended = useMemo(() => {
    const areas = new Set<string>();
    if (goals.includes('legs')) areas.add('Lower');
    if (goals.includes('upper') || goals.includes('posture')) areas.add('Upper');

    const byArea = ROUTINES.filter(r => r.area && areas.has(r.area));
    const wantsFullBody = goals.some(g => ['confident', 'learn', 'workouts'].includes(g));
    const wantsQuick = experienceLevel === 'new' || experienceLevel === 'return';

    const recs: Routine[] = [];
    if (wantsQuick) { const q = getRoutine('quick-15'); if (q) recs.push(q); }
    if (wantsFullBody || (!byArea.length && !recs.length)) {
      const fb = getRoutine('full-body'); if (fb && !recs.includes(fb)) recs.push(fb);
    }
    byArea.forEach(r => { if (!recs.includes(r)) recs.push(r); });
    return recs.slice(0, 3);
  }, [goals, experienceLevel]);

  const recReason = useMemo(() => {
    const named = goals.filter(g => ['legs', 'upper', 'posture', 'confident'].includes(g)).map(labelForGoal);
    if (named.length) return `Based on your goal to ${named.slice(0, 2).join(' & ').toLowerCase()}`;
    return 'A good place to start';
  }, [goals]);

  const confirmDelete = (w: (typeof history)[number]) => {
    Alert.alert('Delete workout?', `Remove “${w.title}” from your history?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteWorkout(w.id).catch(() => {}) },
    ]);
  };

  const repeatWorkout = (w: (typeof history)[number]) => {
    if (!w.exerciseKeys?.length) return;
    startDraft(w.exerciseKeys, {
      goal: w.title, time: '30 min', difficulty: 'Beginner',
      placeId: current?.id ?? null, placeName: current?.name ?? '', title: w.title,
    });
    router.push('/workout/preview');
  };

  const startRoutine = (r: Routine) => {
    const keys = buildRoutineKeys(r, placeKeys);
    startDraft(keys, {
      goal: r.title, time: r.time, difficulty: r.difficulty,
      placeId: current?.id ?? null, placeName: current?.name ?? '', title: r.title,
    });
    router.push('/workout/preview');
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}><Text style={styles.title}>Workouts</Text></View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
          <View style={styles.section}>
            <PressableScale style={styles.buildCard} scaleTo={0.98} onPress={() => router.push('/workout/builder')}>
              <View style={{ flex: 1 }}>
                <Text style={styles.buildTitle}>Build a workout</Text>
                <Text style={styles.buildSub}>Choose goal, time, and machines</Text>
              </View>
              <View style={styles.buildIcon}><Ionicons name="add" size={28} color={Colors.green} /></View>
            </PressableScale>
          </View>

          {recommended.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recommended for you</Text>
              <Text style={styles.recReason}>{recReason}</Text>
              <View style={styles.presets}>
                {recommended.map(r => (
                  <PressableScale key={r.id} style={[styles.presetCard, styles.recCard]} onPress={() => startRoutine(r)}>
                    <View style={[styles.presetIcon, styles.recIcon]}><Ionicons name={r.icon} size={22} color="#0a1f12" /></View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.presetTitle}>{r.title}</Text>
                      <Text style={styles.presetSub}>{r.count} exercises · {r.time}</Text>
                    </View>
                    <Ionicons name="arrow-forward" size={18} color={Colors.greenDeep} />
                  </PressableScale>
                ))}
              </View>
            </View>
          )}

          {saved.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Saved routines</Text>
              <View style={styles.presets}>
                {saved.map(r => (
                  <PressableScale key={r.id} style={styles.presetCard} onPress={() => startRoutine(r)}>
                    <View style={styles.presetIcon}><Ionicons name={r.icon} size={22} color={Colors.greenDeep} /></View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.presetTitle}>{r.title}</Text>
                      <Text style={styles.presetSub}>{r.count} exercises · {r.time}</Text>
                    </View>
                    <Ionicons name="bookmark" size={16} color={Colors.green} />
                  </PressableScale>
                ))}
              </View>
            </View>
          )}

          <View style={styles.section}>
            <View style={styles.sectionHeadRow}>
              <Text style={styles.sectionTitle}>Quick start</Text>
              <TouchableOpacity onPress={() => router.push('/routines')}>
                <Text style={styles.seeAll}>Browse all</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.presets}>
              {quickStart.map(r => (
                <PressableScale key={r.id} style={styles.presetCard} onPress={() => startRoutine(r)}>
                  <View style={styles.presetIcon}><Ionicons name={r.icon} size={22} color={Colors.greenDeep} /></View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.presetTitle}>{r.title}</Text>
                    <Text style={styles.presetSub}>{r.count} exercises · {r.time}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={Colors.labelTertiary} />
                </PressableScale>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent workouts</Text>
            {history.length === 0 ? (
              <View style={styles.emptyCard}>
                <Ionicons name="barbell-outline" size={36} color={Colors.separator} />
                <Text style={styles.emptyText}>No workouts yet</Text>
                <Text style={styles.emptySub}>Complete your first workout to see it here.</Text>
              </View>
            ) : (
              <View style={{ gap: 10 }}>
                <Text style={styles.hint}>Tap to repeat · long-press to delete</Text>
                {history.map(w => (
                  <TouchableOpacity key={w.id} style={styles.histCard} activeOpacity={0.85} onPress={() => repeatWorkout(w)} onLongPress={() => confirmDelete(w)}>
                    <View style={styles.histIcon}>
                      <Ionicons name={w.completedCount >= w.totalCount ? 'trophy-outline' : 'time-outline'} size={20} color={Colors.greenDeep} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.histTitle}>{w.title}</Text>
                      <Text style={styles.histSub}>{w.completedCount}/{w.totalCount} exercises · {w.setsDone} sets · {timeAgo(w.createdAt)}</Text>
                      {w.feel && FEEL_LABEL[w.feel] ? <Text style={styles.histFeel}>{FEEL_LABEL[w.feel]}</Text> : null}
                    </View>
                    {w.exerciseKeys?.length ? (
                      <View style={styles.repeatBtn}><Ionicons name="refresh" size={16} color={Colors.greenDeep} /></View>
                    ) : null}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.cloud },
  header: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  title: { fontSize: 34, fontWeight: '700', letterSpacing: 0.4, color: Colors.labelPrimary },
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionTitle: { fontSize: 19, fontWeight: '700', color: Colors.labelPrimary, marginBottom: 12, letterSpacing: -0.3 },
  sectionHeadRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  seeAll: { fontSize: 14, fontWeight: '600', color: Colors.greenDeep, marginBottom: 12 },
  buildCard: { backgroundColor: '#fff', borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
  buildTitle: { fontSize: 20, fontWeight: '700', color: Colors.labelPrimary, letterSpacing: -0.4 },
  buildSub: { fontSize: 14, color: Colors.labelSecondary, marginTop: 4 },
  buildIcon: { width: 52, height: 52, borderRadius: 16, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  presets: { gap: 10 },
  recReason: { fontSize: 13, color: Colors.labelSecondary, marginTop: -6, marginBottom: 12 },
  presetCard: { backgroundColor: '#fff', borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 13, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4 },
  recCard: { borderWidth: 1.5, borderColor: Colors.green, backgroundColor: Colors.mist2 },
  recIcon: { backgroundColor: Colors.lime },
  presetIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  presetTitle: { fontSize: 16, fontWeight: '600', color: Colors.labelPrimary, letterSpacing: -0.2 },
  presetSub: { fontSize: 12, color: Colors.labelSecondary, marginTop: 2 },
  histCard: { flexDirection: 'row', alignItems: 'center', gap: 13, backgroundColor: '#fff', borderRadius: 16, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4 },
  histIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  repeatBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  histTitle: { fontSize: 16, fontWeight: '600', color: Colors.labelPrimary },
  histSub: { fontSize: 12, color: Colors.labelSecondary, marginTop: 2 },
  histFeel: { fontSize: 11, fontWeight: '600', color: Colors.greenDeep, marginTop: 3 },
  hint: { fontSize: 12, color: Colors.labelTertiary, marginBottom: 2, marginLeft: 2 },
  emptyCard: { backgroundColor: '#fff', borderRadius: 20, padding: 32, alignItems: 'center', gap: 8 },
  emptyText: { fontSize: 17, fontWeight: '600', color: Colors.labelSecondary },
  emptySub: { fontSize: 13, color: Colors.labelTertiary, textAlign: 'center' },
});

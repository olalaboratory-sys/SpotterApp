import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { useWorkouts } from '../../context/WorkoutsContext';
import { usePlaces } from '../../context/PlacesContext';

const FEELINGS = [
  { id: 'easy', label: 'Too easy', icon: 'happy-outline' as const },
  { id: 'right', label: 'Just right', icon: 'checkmark-circle-outline' as const },
  { id: 'hard', label: 'Tough', icon: 'flame-outline' as const },
];

export default function WorkoutComplete() {
  const router = useRouter();
  const { full, completed, total, sets } = useLocalSearchParams<{ full: string; completed: string; total: string; sets: string }>();
  const { completeWorkout, updateWorkoutFeel, draft, meta } = useWorkouts();
  const { markTrained } = usePlaces();

  const isFull = full === '1';
  const completedCount = Number(completed ?? 0);
  const totalCount = Number(total ?? 0);
  const setsDone = Number(sets ?? 0);
  const pct = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

  const [feel, setFeel] = useState<string | null>(null);
  const savedRef = useRef(false);
  const workoutIdRef = useRef<string | null>(null);

  // Persist the workout exactly once.
  useEffect(() => {
    if (savedRef.current) return;
    savedRef.current = true;
    completeWorkout({ completedCount, totalCount, setsDone, feel: null })
      .then(id => { workoutIdRef.current = id; })
      .catch(() => {});
    markTrained(draft, meta.placeId).catch(() => {});
  }, []);

  const pickFeel = (id: string) => {
    setFeel(id);
    if (workoutIdRef.current) updateWorkoutFeel(workoutIdRef.current, id).catch(() => {});
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, justifyContent: 'center' }}>
          <View style={styles.badge}>
            <Ionicons name={isFull ? 'trophy' : 'checkmark-done'} size={48} color={Colors.ink} />
          </View>
          <Text style={styles.title}>{isFull ? 'Workout complete' : 'Workout saved'}</Text>
          <Text style={styles.sub}>
            {isFull ? 'Nice work — you finished every exercise.' : 'Saved your progress. Every bit counts.'}
          </Text>

          {!isFull && (
            <View style={styles.progressCard}>
              <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${pct}%` }]} /></View>
              <Text style={styles.progressText}>{completedCount} of {totalCount} exercises</Text>
            </View>
          )}

          <View style={styles.statRow}>
            <View style={styles.statCard}><Text style={styles.statNum}>{completedCount}/{totalCount}</Text><Text style={styles.statLabel}>exercises</Text></View>
            <View style={styles.statCard}><Text style={styles.statNum}>{setsDone}</Text><Text style={styles.statLabel}>sets done</Text></View>
            <View style={styles.statCard}><Text style={styles.statNum}>{pct}%</Text><Text style={styles.statLabel}>complete</Text></View>
          </View>

          <Text style={styles.feelTitle}>How did that feel?</Text>
          <View style={styles.feelRow}>
            {FEELINGS.map(f => (
              <TouchableOpacity key={f.id} style={[styles.feelBtn, feel === f.id && styles.feelBtnActive]} onPress={() => pickFeel(f.id)}>
                <Ionicons name={f.icon} size={22} color={feel === f.id ? Colors.greenDeep : Colors.labelSecondary} />
                <Text style={[styles.feelLabel, feel === f.id && styles.feelLabelActive]}>{f.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.doneBtn} onPress={() => router.replace('/(tabs)/workouts')}>
            <Text style={styles.doneBtnText}>Done</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.cloud },
  badge: { width: 96, height: 96, borderRadius: 28, backgroundColor: Colors.lime, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 20 },
  title: { fontSize: 30, fontWeight: '700', color: Colors.labelPrimary, textAlign: 'center', letterSpacing: -0.5 },
  sub: { fontSize: 15, color: Colors.labelSecondary, textAlign: 'center', marginTop: 8, lineHeight: 21 },
  progressCard: { marginTop: 24, gap: 8 },
  progressTrack: { height: 10, borderRadius: 5, backgroundColor: '#e4e7df', overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 5, backgroundColor: Colors.green },
  progressText: { fontSize: 13, fontWeight: '500', color: Colors.labelSecondary, textAlign: 'center' },
  statRow: { flexDirection: 'row', gap: 12, marginTop: 28 },
  statCard: { flex: 1, backgroundColor: '#fff', borderRadius: 16, padding: 16, alignItems: 'center', gap: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 6 },
  statNum: { fontSize: 22, fontWeight: '700', color: Colors.labelPrimary, letterSpacing: -0.5 },
  statLabel: { fontSize: 11, color: Colors.labelSecondary },
  feelTitle: { fontSize: 17, fontWeight: '700', color: Colors.labelPrimary, textAlign: 'center', marginTop: 36, marginBottom: 14 },
  feelRow: { flexDirection: 'row', gap: 10 },
  feelBtn: { flex: 1, alignItems: 'center', gap: 8, paddingVertical: 16, borderRadius: 16, backgroundColor: '#fff', borderWidth: 1.5, borderColor: Colors.separator },
  feelBtnActive: { borderColor: Colors.green, backgroundColor: Colors.mist2 },
  feelLabel: { fontSize: 13, fontWeight: '600', color: Colors.labelSecondary },
  feelLabelActive: { color: Colors.greenDeep },
  footer: { padding: 16, paddingBottom: 30 },
  doneBtn: { height: 54, borderRadius: 16, backgroundColor: Colors.ink, alignItems: 'center', justifyContent: 'center' },
  doneBtnText: { fontSize: 17, fontWeight: '700', color: '#fff' },
});

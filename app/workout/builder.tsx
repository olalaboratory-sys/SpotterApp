import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { usePlaces } from '../../context/PlacesContext';
import { useWorkouts } from '../../context/WorkoutsContext';
import { useAuth } from '../../context/AuthContext';
import { allMachines, getMachine } from '../../constants/machines';
import { isFreeWeight } from '../../constants/catalog';
import PlacePickerSheet from '../../components/PlacePickerSheet';

const GOALS = ['Full body', 'Upper body', 'Lower body', 'Core'];
const GOAL_AREA: Record<string, string | null> = { 'Full body': null, 'Upper body': 'Upper', 'Lower body': 'Lower', 'Core': 'Core' };
const TIMES = [
  { label: '15 min', count: 3 },
  { label: '30 min', count: 5 },
  { label: '45 min', count: 7 },
];
const DIFFICULTY = ['Beginner', 'Intermediate'];

function Pill({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity style={[styles.pill, active && styles.pillActive]} onPress={onPress}>
      <Text style={[styles.pillText, active && styles.pillTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function WorkoutBuilder() {
  const router = useRouter();
  const { current, currentMachines } = usePlaces();
  const { startDraft } = useWorkouts();
  const { userProfile } = useAuth();

  const [goal, setGoal] = useState(GOALS[0]);
  const [time, setTime] = useState(TIMES[1]);
  const [difficulty, setDifficulty] = useState(DIFFICULTY[0]);
  const [machineOnly, setMachineOnly] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  // Pre-select the goal that matches the user's profile (once, without
  // clobbering a manual change).
  const presetRef = useRef(false);
  useEffect(() => {
    if (presetRef.current || !userProfile) return;
    presetRef.current = true;
    const g = userProfile.goals ?? [];
    if (g.includes('legs')) setGoal('Lower body');
    else if (g.includes('upper') || g.includes('posture')) setGoal('Upper body');
  }, [userProfile]);

  const available = useMemo(() => {
    const fromPlace = currentMachines.map(m => m.key);
    return fromPlace.length > 0 ? fromPlace : allMachines().filter(m => m.beginner).map(m => m.key);
  }, [currentMachines]);

  const build = () => {
    const area = GOAL_AREA[goal];
    let pool = available.filter(key => {
      const m = getMachine(key);
      if (machineOnly && isFreeWeight(m)) return false;
      if (area && m.area !== area) return false;
      return true;
    });
    // Supplement from the catalog if the place doesn't have enough.
    if (pool.length < time.count) {
      const extra = allMachines()
        .filter(m => m.beginner && (!area || m.area === area) && (!machineOnly || !isFreeWeight(m)))
        .map(m => m.key)
        .filter(k => !pool.includes(k));
      pool = [...pool, ...extra];
    }
    const keys = pool.slice(0, time.count);
    if (keys.length === 0) {
      Alert.alert('No machines match', 'Try a different goal or turn off “Machines only”.');
      return;
    }
    const title = `${goal} · ${time.label}`;
    startDraft(keys, {
      goal, time: time.label, difficulty,
      placeId: current?.id ?? null, placeName: current?.name ?? '', title,
    });
    router.push('/workout/preview');
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color={Colors.labelPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>Build a workout</Text>
        </View>

        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
          <Text style={styles.label}>Goal</Text>
          <View style={styles.pillRow}>
            {GOALS.map(g => <Pill key={g} label={g} active={goal === g} onPress={() => setGoal(g)} />)}
          </View>

          <Text style={styles.label}>Time</Text>
          <View style={styles.pillRow}>
            {TIMES.map(t => <Pill key={t.label} label={t.label} active={time.label === t.label} onPress={() => setTime(t)} />)}
          </View>

          <Text style={styles.label}>Difficulty</Text>
          <View style={styles.segment}>
            {DIFFICULTY.map(d => (
              <TouchableOpacity key={d} style={[styles.segBtn, difficulty === d && styles.segBtnActive]} onPress={() => setDifficulty(d)}>
                <Text style={[styles.segText, difficulty === d && styles.segTextActive]}>{d}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Equipment from</Text>
          <TouchableOpacity style={styles.placeRow} onPress={() => setPickerOpen(true)}>
            <View style={styles.placeIcon}><Ionicons name="business-outline" size={20} color={Colors.greenDeep} /></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.placeName}>{current?.name ?? 'Any equipment'}</Text>
              <Text style={styles.placeSub}>{currentMachines.length > 0 ? `${currentMachines.length} machines saved` : 'Using the full catalog'}</Text>
            </View>
            <Ionicons name="chevron-down" size={18} color={Colors.labelTertiary} />
          </TouchableOpacity>

          <View style={styles.toggleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.toggleTitle}>Machines only</Text>
              <Text style={styles.toggleSub}>Skip free-weight exercises</Text>
            </View>
            <Switch value={machineOnly} onValueChange={setMachineOnly} trackColor={{ true: Colors.green }} />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.buildBtn} onPress={build}>
            <Text style={styles.buildBtnText}>Build my workout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <PlacePickerSheet visible={pickerOpen} onClose={() => setPickerOpen(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.cloud },
  header: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingTop: 8, paddingBottom: 6 },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', letterSpacing: -0.4, color: Colors.labelPrimary },
  label: { fontSize: 15, fontWeight: '700', color: Colors.labelPrimary, marginTop: 22, marginBottom: 10 },
  pillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 100, backgroundColor: '#fff', borderWidth: 1, borderColor: Colors.separator },
  pillActive: { backgroundColor: Colors.green, borderColor: Colors.green },
  pillText: { fontSize: 14, fontWeight: '600', color: Colors.labelSecondary },
  pillTextActive: { color: '#fff' },
  segment: { flexDirection: 'row', backgroundColor: '#e9e9ee', borderRadius: 12, padding: 3 },
  segBtn: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 9 },
  segBtnActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3 },
  segText: { fontSize: 14, fontWeight: '600', color: Colors.labelSecondary },
  segTextActive: { color: Colors.labelPrimary },
  placeRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#fff', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: Colors.separator },
  placeIcon: { width: 40, height: 40, borderRadius: 11, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  placeName: { fontSize: 16, fontWeight: '600', color: Colors.labelPrimary },
  placeSub: { fontSize: 12, color: Colors.labelSecondary, marginTop: 1 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', marginTop: 18, backgroundColor: '#fff', borderRadius: 14, padding: 16 },
  toggleTitle: { fontSize: 16, fontWeight: '600', color: Colors.labelPrimary },
  toggleSub: { fontSize: 12, color: Colors.labelSecondary, marginTop: 2 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, paddingBottom: 30, backgroundColor: 'rgba(244,246,240,0.95)', borderTopWidth: 0.5, borderTopColor: Colors.separator },
  buildBtn: { height: 54, borderRadius: 16, backgroundColor: Colors.green, alignItems: 'center', justifyContent: 'center' },
  buildBtnText: { fontSize: 17, fontWeight: '700', color: '#fff' },
});

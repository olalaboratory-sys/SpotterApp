import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { ROUTINES, ROUTINE_GOALS, searchRoutines, getRoutine, Routine } from '../../constants/routines';
import { buildRoutineKeys } from '../../lib/buildWorkout';
import { usePlaces } from '../../context/PlacesContext';
import { useWorkouts } from '../../context/WorkoutsContext';
import PressableScale from '../../components/PressableScale';
import * as haptics from '../../lib/haptics';

export default function RoutineLibrary() {
  const router = useRouter();
  const { current, currentMachines } = usePlaces();
  const { startDraft, savedRoutines, isRoutineSaved, toggleRoutineSaved } = useWorkouts();

  const [q, setQ] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [goal, setGoal] = useState<(typeof ROUTINE_GOALS)[number]>('All');

  const placeKeys = useMemo(() => currentMachines.map(m => m.key), [currentMachines]);
  const placeAreas = useMemo(() => new Set(currentMachines.map(m => m.area)), [currentMachines]);

  const matchesGoal = (r: Routine) =>
    goal === 'All' ? true : goal === 'Beginner' ? r.difficulty === 'Beginner' : r.goal === goal;

  const results = useMemo(() => searchRoutines(q).filter(matchesGoal), [q, goal]);

  const saved = useMemo(
    () => savedRoutines.map(s => getRoutine(s.routineId)).filter((r): r is Routine => !!r),
    [savedRoutines],
  );

  // Routines that fit the machines actually at the current place.
  const recommended = useMemo(() => {
    if (!placeKeys.length) return ROUTINES.filter(r => r.difficulty === 'Beginner').slice(0, 4);
    return ROUTINES.filter(r => r.area === null || placeAreas.has(r.area)).slice(0, 4);
  }, [placeKeys, placeAreas]);

  const start = (r: Routine) => {
    haptics.tap();
    const keys = buildRoutineKeys(r, placeKeys);
    startDraft(keys, {
      goal: r.title, time: r.time, difficulty: r.difficulty,
      placeId: current?.id ?? null, placeName: current?.name ?? '', title: r.title,
    });
    router.push('/workout/preview');
  };

  const onToggleFav = (r: Routine) => {
    haptics.tap();
    const docs = savedRoutines.filter(s => s.routineId === r.id);
    if (docs.length) { docs.forEach(s => toggleRoutineSaved(r.id, s.placeId)); return; }
    if (!current) { toggleRoutineSaved(r.id, null); return; }
    Alert.alert('Save routine', `Save “${r.title}” to…`, [
      { text: 'All places', onPress: () => toggleRoutineSaved(r.id, null) },
      { text: `${current.name} only`, onPress: () => toggleRoutineSaved(r.id, current.id) },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const Card = ({ r }: { r: Routine }) => {
    const fav = isRoutineSaved(r.id);
    return (
      <PressableScale style={styles.card} scaleTo={0.98} onPress={() => start(r)}>
        <View style={styles.cardIcon}><Ionicons name={r.icon} size={22} color={Colors.greenDeep} /></View>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>{r.title}</Text>
          <Text style={styles.cardSub} numberOfLines={1}>{r.subtitle}</Text>
          <Text style={styles.cardMeta}>{r.count} exercises · {r.time} · {r.difficulty}</Text>
        </View>
        <TouchableOpacity onPress={() => onToggleFav(r)} hitSlop={10} style={styles.bookmark} accessibilityRole="button" accessibilityLabel={fav ? 'Remove from saved' : 'Save routine'}>
          <Ionicons name={fav ? 'bookmark' : 'bookmark-outline'} size={20} color={fav ? Colors.green : Colors.labelTertiary} />
        </TouchableOpacity>
      </PressableScale>
    );
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} accessibilityRole="button" accessibilityLabel="Go back">
            <Ionicons name="chevron-back" size={22} color={Colors.labelPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>Workout routines</Text>
        </View>

        <View style={[styles.searchRow, searchFocused && styles.searchRowFocused]}>
          <Ionicons name="search" size={18} color={searchFocused ? Colors.green : Colors.labelTertiary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search routines — “glutes”, “push”, “quick”…"
            placeholderTextColor={Colors.labelTertiary}
            value={q}
            onChangeText={setQ}
            autoCorrect={false}
            returnKeyType="search"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          {q ? <TouchableOpacity onPress={() => setQ('')}><Ionicons name="close-circle" size={18} color={Colors.labelTertiary} /></TouchableOpacity> : null}
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }} keyboardShouldPersistTaps="handled">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
            {ROUTINE_GOALS.map(g => (
              <TouchableOpacity key={g} style={[styles.chip, goal === g && styles.chipActive]} onPress={() => setGoal(g)}>
                <Text style={[styles.chipText, goal === g && styles.chipTextActive]}>{g}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {!q && goal === 'All' && saved.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Saved</Text>
              {saved.map(r => <Card key={`s-${r.id}`} r={r} />)}
            </View>
          )}

          {!q && goal === 'All' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recommended for {current?.name ?? 'you'}</Text>
              {recommended.map(r => <Card key={`r-${r.id}`} r={r} />)}
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{q || goal !== 'All' ? `${results.length} routine${results.length === 1 ? '' : 's'}` : 'All routines'}</Text>
            {results.map(r => <Card key={r.id} r={r} />)}
            {results.length === 0 && (
              <View style={styles.empty}>
                <Ionicons name="search-outline" size={36} color={Colors.labelTertiary} />
                <Text style={styles.emptyText}>No routines match.</Text>
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
  header: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingTop: 8, paddingBottom: 6 },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', letterSpacing: -0.4, color: Colors.labelPrimary },
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 20, marginVertical: 10, paddingHorizontal: 14, height: 44, borderRadius: 14, backgroundColor: '#fff', borderWidth: 1.5, borderColor: Colors.separator },
  searchRowFocused: { borderColor: Colors.green, backgroundColor: Colors.mist2 },
  searchInput: { flex: 1, fontSize: 16, color: Colors.labelPrimary },
  filterRow: { gap: 8, paddingHorizontal: 20, paddingBottom: 6 },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 100, backgroundColor: '#fff', borderWidth: 1, borderColor: Colors.separator },
  chipActive: { backgroundColor: Colors.ink, borderColor: Colors.ink },
  chipText: { fontSize: 14, fontWeight: '600', color: Colors.labelSecondary },
  chipTextActive: { color: '#fff' },
  section: { paddingHorizontal: 20, marginTop: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.labelPrimary, marginBottom: 10, letterSpacing: -0.3 },
  card: { flexDirection: 'row', alignItems: 'center', gap: 13, backgroundColor: '#fff', borderRadius: 16, padding: 14, marginBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 6 },
  cardIcon: { width: 46, height: 46, borderRadius: 12, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  cardTitle: { fontSize: 16, fontWeight: '700', color: Colors.labelPrimary, letterSpacing: -0.2 },
  cardSub: { fontSize: 13, color: Colors.labelSecondary, marginTop: 1 },
  cardMeta: { fontSize: 12, color: Colors.labelTertiary, marginTop: 3 },
  bookmark: { padding: 4 },
  empty: { alignItems: 'center', paddingVertical: 28, gap: 8 },
  emptyText: { fontSize: 15, color: Colors.labelSecondary },
});

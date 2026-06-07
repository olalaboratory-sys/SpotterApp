import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { usePlaces } from '../../context/PlacesContext';
import { useWorkouts } from '../../context/WorkoutsContext';
import { allMachines } from '../../constants/machines';

const PRESETS = [
  { icon: 'body-outline' as const, title: 'Full Body Beginner', goal: 'Full body', area: null as string | null, count: 6, time: '35 min' },
  { icon: 'arrow-up-outline' as const, title: 'Upper Body', goal: 'Upper body', area: 'Upper', count: 5, time: '30 min' },
  { icon: 'arrow-down-outline' as const, title: 'Lower Body & Glutes', goal: 'Lower body', area: 'Lower', count: 5, time: '30 min' },
  { icon: 'flash-outline' as const, title: 'Quick 15-min', goal: 'Full body', area: null, count: 3, time: '15 min' },
];

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
  const { current } = usePlaces();
  const { history, startDraft, deleteWorkout } = useWorkouts();

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

  const startPreset = (p: (typeof PRESETS)[number]) => {
    const keys = allMachines()
      .filter(m => m.beginner && (!p.area || m.area === p.area))
      .map(m => m.key)
      .slice(0, p.count);
    startDraft(keys, {
      goal: p.title, time: p.time, difficulty: 'Beginner',
      placeId: current?.id ?? null, placeName: current?.name ?? '', title: p.title,
    });
    router.push('/workout/preview');
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}><Text style={styles.title}>Workouts</Text></View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
          <View style={styles.section}>
            <TouchableOpacity style={styles.buildCard} activeOpacity={0.9} onPress={() => router.push('/workout/builder')}>
              <View style={{ flex: 1 }}>
                <Text style={styles.buildTitle}>Build a workout</Text>
                <Text style={styles.buildSub}>Choose goal, time, and machines</Text>
              </View>
              <View style={styles.buildIcon}><Ionicons name="add" size={28} color={Colors.green} /></View>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick start</Text>
            <View style={styles.presets}>
              {PRESETS.map(p => (
                <TouchableOpacity key={p.title} style={styles.presetCard} activeOpacity={0.85} onPress={() => startPreset(p)}>
                  <View style={styles.presetIcon}><Ionicons name={p.icon} size={22} color={Colors.greenDeep} /></View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.presetTitle}>{p.title}</Text>
                    <Text style={styles.presetSub}>{p.count} exercises · {p.time}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={Colors.labelTertiary} />
                </TouchableOpacity>
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
  buildCard: { backgroundColor: '#fff', borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
  buildTitle: { fontSize: 20, fontWeight: '700', color: Colors.labelPrimary, letterSpacing: -0.4 },
  buildSub: { fontSize: 14, color: Colors.labelSecondary, marginTop: 4 },
  buildIcon: { width: 52, height: 52, borderRadius: 16, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  presets: { gap: 10 },
  presetCard: { backgroundColor: '#fff', borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 13, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4 },
  presetIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  presetTitle: { fontSize: 16, fontWeight: '600', color: Colors.labelPrimary, letterSpacing: -0.2 },
  presetSub: { fontSize: 12, color: Colors.labelSecondary, marginTop: 2 },
  histCard: { flexDirection: 'row', alignItems: 'center', gap: 13, backgroundColor: '#fff', borderRadius: 16, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4 },
  histIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  repeatBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  histTitle: { fontSize: 16, fontWeight: '600', color: Colors.labelPrimary },
  histSub: { fontSize: 12, color: Colors.labelSecondary, marginTop: 2 },
  hint: { fontSize: 12, color: Colors.labelTertiary, marginBottom: 2, marginLeft: 2 },
  emptyCard: { backgroundColor: '#fff', borderRadius: 20, padding: 32, alignItems: 'center', gap: 8 },
  emptyText: { fontSize: 17, fontWeight: '600', color: Colors.labelSecondary },
  emptySub: { fontSize: 13, color: Colors.labelTertiary, textAlign: 'center' },
});

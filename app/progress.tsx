import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { usePlaces } from '../context/PlacesContext';
import { useWorkouts } from '../context/WorkoutsContext';
import { useAuth } from '../context/AuthContext';
import { labelForGoal, labelForExperience } from '../constants/profile';
import { useCountUp } from '../lib/useCountUp';
import GoalRing from '../components/GoalRing';

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const WEEKLY_GOAL = 3;

export default function ProgressScreen() {
  const router = useRouter();
  const { saved } = usePlaces();
  const { history } = useWorkouts();
  const { userProfile } = useAuth();
  const goals = userProfile?.goals ?? [];
  const hasActivity = saved.length > 0 || history.length > 0;

  // Workouts per weekday for the current week (Mon–Sun).
  const weekly = useMemo(() => {
    const counts = [0, 0, 0, 0, 0, 0, 0];
    const now = new Date();
    const monday = new Date(now);
    const dow = (now.getDay() + 6) % 7; // 0 = Monday
    monday.setDate(now.getDate() - dow);
    monday.setHours(0, 0, 0, 0);
    history.forEach(w => {
      if (!w.createdAt) return;
      const diff = Math.floor((w.createdAt.getTime() - monday.getTime()) / 86400000);
      if (diff >= 0 && diff < 7) counts[diff] += 1;
    });
    return counts;
  }, [history]);
  const maxWeekly = Math.max(1, ...weekly);
  const weekTotal = weekly.reduce((a, b) => a + b, 0);
  const goalMet = weekTotal >= WEEKLY_GOAL;

  const learned = saved.filter(s => s.status === 'Comfortable');
  const totalSets = history.reduce((a, w) => a + w.setsDone, 0);

  // Animated count-ups for the headline stats and the goal ring.
  const savedCount = useCountUp(saved.length);
  const workoutCount = useCountUp(history.length);
  const setsCount = useCountUp(totalSets);
  const ringDone = useCountUp(Math.min(weekTotal, WEEKLY_GOAL), 600);

  const badges = [
    { id: 'firstScan', label: 'First machine', icon: 'scan-outline' as const, earned: saved.length >= 1 },
    { id: 'five', label: '5 machines', icon: 'albums-outline' as const, earned: saved.length >= 5 },
    { id: 'firstWorkout', label: 'First workout', icon: 'barbell-outline' as const, earned: history.length >= 1 },
    { id: 'tenSets', label: '10 sets', icon: 'flame-outline' as const, earned: totalSets >= 10 },
    { id: 'confident', label: 'Confident x3', icon: 'shield-checkmark-outline' as const, earned: learned.length >= 3 },
    { id: 'week', label: 'Weekly streak', icon: 'calendar-outline' as const, earned: weekly.filter(c => c > 0).length >= 3 },
  ];

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color={Colors.labelPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>Progress</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingTop: 4, gap: 24 }}>
          {!hasActivity && (
            <View style={styles.ctaCard}>
              <Ionicons name="rocket-outline" size={28} color={Colors.greenDeep} />
              <Text style={styles.ctaTitle}>Let's get your first win</Text>
              <Text style={styles.ctaSub}>Scan or add a machine, then build a quick workout. Your progress shows up here.</Text>
              <View style={styles.ctaRow}>
                <TouchableOpacity style={styles.ctaBtn} onPress={() => router.push('/(tabs)/scan')}>
                  <Text style={styles.ctaBtnText}>Scan a machine</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.ctaBtn, styles.ctaBtnAlt]} onPress={() => router.push('/workout/builder')}>
                  <Text style={[styles.ctaBtnText, { color: Colors.greenDeep }]}>Build workout</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {goals.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Your focus</Text>
              <View style={styles.focusCard}>
                <Text style={styles.focusExp}>{labelForExperience(userProfile?.experienceLevel ?? null)} · {goals.length} goal{goals.length === 1 ? '' : 's'}</Text>
                <View style={styles.focusChips}>
                  {goals.map(g => (
                    <View key={g} style={styles.focusChip}><Text style={styles.focusChipText}>{labelForGoal(g)}</Text></View>
                  ))}
                </View>
              </View>
            </View>
          )}

          <View style={styles.statRow}>
            <View style={styles.statCard}><Text style={styles.statNum}>{savedCount}</Text><Text style={styles.statLabel}>machines{'\n'}saved</Text></View>
            <View style={styles.statCard}><Text style={styles.statNum}>{workoutCount}</Text><Text style={styles.statLabel}>workouts{'\n'}done</Text></View>
            <View style={styles.statCard}><Text style={styles.statNum}>{setsCount}</Text><Text style={styles.statLabel}>total{'\n'}sets</Text></View>
          </View>

          <View>
            <Text style={styles.sectionTitle}>This week</Text>
            <View style={styles.goalCard}>
              <GoalRing size={88} goal={WEEKLY_GOAL} done={ringDone}>
                <Text style={styles.ringNum}>{ringDone}/{WEEKLY_GOAL}</Text>
              </GoalRing>
              <View style={{ flex: 1 }}>
                <Text style={styles.goalTitle}>{goalMet ? 'Weekly goal hit 🎉' : 'Weekly goal'}</Text>
                <Text style={styles.goalSub}>
                  {goalMet
                    ? `${weekTotal} workout${weekTotal === 1 ? '' : 's'} this week — great consistency.`
                    : `${weekTotal} of ${WEEKLY_GOAL} workouts done. ${WEEKLY_GOAL - weekTotal} to go.`}
                </Text>
              </View>
            </View>
            <View style={styles.weekCard}>
              {weekly.map((c, i) => (
                <View key={i} style={styles.barCol}>
                  <View style={styles.barTrack}>
                    <View style={[styles.barFill, { height: `${(c / maxWeekly) * 100}%`, backgroundColor: c > 0 ? Colors.green : '#e4e7df' }]} />
                  </View>
                  <Text style={styles.barLabel}>{DAYS[i]}</Text>
                </View>
              ))}
            </View>
          </View>

          <View>
            <Text style={styles.sectionTitle}>Machines you're confident with</Text>
            {learned.length === 0 ? (
              <Text style={styles.muted}>Mark a machine “Comfortable” in its guide to track it here.</Text>
            ) : (
              <View style={{ gap: 8 }}>
                {learned.map(m => (
                  <View key={m.id} style={styles.learnRow}>
                    <View style={styles.learnIcon}><Ionicons name="checkmark-circle" size={20} color={Colors.green} /></View>
                    <Text style={styles.learnName}>{m.name}</Text>
                    <Text style={styles.learnCat}>{m.cat}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View>
            <Text style={styles.sectionTitle}>Badges</Text>
            <View style={styles.badgeGrid}>
              {badges.map(b => (
                <View key={b.id} style={[styles.badge, !b.earned && styles.badgeOff]}>
                  <Ionicons name={b.icon} size={24} color={b.earned ? Colors.greenDeep : Colors.labelTertiary} />
                  <Text style={[styles.badgeLabel, !b.earned && { color: Colors.labelTertiary }]}>{b.label}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.confidence}>
            <Ionicons name="happy-outline" size={22} color={Colors.greenInk} />
            <View style={{ flex: 1 }}>
              <Text style={styles.confidenceTitle}>How confident do you feel at the gym?</Text>
              <Text style={styles.confidenceSub}>You've come a long way. Keep going one machine at a time.</Text>
            </View>
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
  ctaCard: { backgroundColor: Colors.mist, borderRadius: 18, padding: 20, gap: 8, alignItems: 'flex-start' },
  ctaTitle: { fontSize: 18, fontWeight: '700', color: Colors.greenInk, letterSpacing: -0.3 },
  ctaSub: { fontSize: 14, color: Colors.greenInk, opacity: 0.85, lineHeight: 20 },
  ctaRow: { flexDirection: 'row', gap: 10, marginTop: 8 },
  ctaBtn: { paddingHorizontal: 16, height: 42, borderRadius: 12, backgroundColor: Colors.green, alignItems: 'center', justifyContent: 'center' },
  ctaBtnAlt: { backgroundColor: '#fff', borderWidth: 1.5, borderColor: Colors.green },
  ctaBtnText: { fontSize: 14, fontWeight: '700', color: '#fff' },
  focusCard: { backgroundColor: '#fff', borderRadius: 18, padding: 16, gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 },
  focusExp: { fontSize: 13, fontWeight: '600', color: Colors.labelSecondary },
  focusChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  focusChip: { backgroundColor: Colors.mist2, borderRadius: 100, paddingHorizontal: 12, paddingVertical: 6 },
  focusChipText: { fontSize: 13, fontWeight: '600', color: Colors.greenInk },
  statRow: { flexDirection: 'row', gap: 12 },
  statCard: { flex: 1, backgroundColor: '#fff', borderRadius: 18, padding: 16, gap: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 },
  statNum: { fontSize: 26, fontWeight: '700', color: Colors.labelPrimary, letterSpacing: -0.6 },
  statLabel: { fontSize: 11, color: Colors.labelSecondary, lineHeight: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.labelPrimary, marginBottom: 12, letterSpacing: -0.3 },
  goalCard: { flexDirection: 'row', alignItems: 'center', gap: 16, backgroundColor: '#fff', borderRadius: 18, padding: 18, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 },
  ringNum: { fontSize: 19, fontWeight: '700', color: Colors.labelPrimary, letterSpacing: -0.5 },
  goalTitle: { fontSize: 16, fontWeight: '700', color: Colors.labelPrimary, letterSpacing: -0.2 },
  goalSub: { fontSize: 13, color: Colors.labelSecondary, marginTop: 3, lineHeight: 18 },
  weekCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', backgroundColor: '#fff', borderRadius: 18, padding: 18, height: 160, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 },
  barCol: { flex: 1, alignItems: 'center', gap: 8, height: '100%', justifyContent: 'flex-end' },
  barTrack: { width: 14, flex: 1, justifyContent: 'flex-end', borderRadius: 7, overflow: 'hidden', backgroundColor: '#f0f2eb' },
  barFill: { width: '100%', borderRadius: 7, minHeight: 6 },
  barLabel: { fontSize: 12, fontWeight: '600', color: Colors.labelSecondary },
  muted: { fontSize: 14, color: Colors.labelSecondary, lineHeight: 20 },
  learnRow: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#fff', borderRadius: 14, padding: 12 },
  learnIcon: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  learnName: { fontSize: 15, fontWeight: '600', color: Colors.labelPrimary, flex: 1 },
  learnCat: { fontSize: 12, color: Colors.labelSecondary },
  badgeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  badge: { width: '30%', flexGrow: 1, alignItems: 'center', gap: 8, paddingVertical: 18, borderRadius: 16, backgroundColor: Colors.mist2 },
  badgeOff: { backgroundColor: '#fff', borderWidth: 1, borderColor: Colors.separator },
  badgeLabel: { fontSize: 12, fontWeight: '600', color: Colors.greenInk, textAlign: 'center' },
  confidence: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: Colors.mist, borderRadius: 18, padding: 18, marginBottom: 20 },
  confidenceTitle: { fontSize: 15, fontWeight: '700', color: Colors.greenInk },
  confidenceSub: { fontSize: 13, color: Colors.greenInk, opacity: 0.8, marginTop: 2 },
});

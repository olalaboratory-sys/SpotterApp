import React, { useEffect, useMemo, useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Modal, Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { iconForIllo } from '../../constants/machineIcon';
import * as haptics from '../../lib/haptics';
import { getNotifs } from '../../lib/prefs';
import { useWorkouts } from '../../context/WorkoutsContext';
import { getMachine, keyForName } from '../../constants/machines';

const SETS_PER = 3;
const REST_SECONDS = 60;

export default function WorkoutSession() {
  const router = useRouter();
  const { draft, swapInDraft } = useWorkouts();

  const [index, setIndex] = useState(0);
  const [setsDone, setSetsDone] = useState<number[]>(() => draft.map(() => 0));
  const [rest, setRest] = useState<number | null>(null);
  const [swapOpen, setSwapOpen] = useState(false);
  const [restAlerts, setRestAlerts] = useState(true);

  useEffect(() => { getNotifs().then(n => setRestAlerts(n.restAlerts)); }, []);

  const key = draft[index];
  const machine = key ? getMachine(key) : null;

  const totalSets = draft.length * SETS_PER;
  const doneSets = setsDone.reduce((a, b) => a + b, 0);
  const pct = totalSets ? Math.round((doneSets / totalSets) * 100) : 0;

  // Rest timer countdown.
  useEffect(() => {
    if (rest === null) return;
    if (rest <= 0) { if (restAlerts) haptics.success(); setRest(null); return; }
    if (rest <= 3 && restAlerts) haptics.tap(); // tick the final seconds
    const t = setTimeout(() => setRest(r => (r === null ? null : r - 1)), 1000);
    return () => clearTimeout(t);
  }, [rest, restAlerts]);

  const finish = (full: boolean) => {
    const completedCount = setsDone.filter(s => s >= SETS_PER).length;
    router.replace({
      pathname: '/workout/complete',
      params: {
        full: full ? '1' : '0',
        completed: String(completedCount),
        total: String(draft.length),
        sets: String(doneSets),
      },
    });
  };

  const completeSet = () => {
    haptics.success();
    setSetsDone(prev => {
      const next = [...prev];
      next[index] = Math.min(SETS_PER, (next[index] ?? 0) + 1);
      return next;
    });
    setRest(REST_SECONDS);
  };

  const nextExercise = () => {
    if (index < draft.length - 1) setIndex(i => i + 1);
    else finish(true);
  };

  const onSwap = (altName: string) => {
    const newKey = keyForName(altName);
    if (key) swapInDraft(key, newKey);
    setSwapOpen(false);
  };

  if (!machine) {
    return (
      <View style={[styles.screen, { alignItems: 'center', justifyContent: 'center' }]}>
        <Text style={{ color: '#fff' }}>No exercises in this workout.</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 12 }}><Text style={{ color: Colors.lime }}>Go back</Text></TouchableOpacity>
      </View>
    );
  }

  const restPct = rest !== null ? rest / REST_SECONDS : 0;
  const setsForThis = setsDone[index] ?? 0;
  const isLast = index === draft.length - 1;

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => finish(false)}>
            <Ionicons name="close" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.topTitle}>Exercise {index + 1} of {draft.length}</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Progress */}
        <View style={styles.progressWrap}>
          <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${pct}%` }]} /></View>
          <Text style={styles.progressLabel}>{pct}% complete · {doneSets} sets done</Text>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
          <View style={styles.illo}><Ionicons name={iconForIllo(machine.illo)} size={90} color={Colors.lime} /></View>
          <Text style={styles.exName}>{machine.name}</Text>
          <Text style={styles.exCat}>{machine.cat}</Text>

          <TouchableOpacity style={styles.guideLink} onPress={() => router.push({ pathname: '/guide/[key]', params: { key } })}>
            <Ionicons name="book-outline" size={16} color={Colors.lime} />
            <Text style={styles.guideLinkText}>How to use this machine</Text>
          </TouchableOpacity>

          <View style={styles.setRow}>
            {Array.from({ length: SETS_PER }).map((_, i) => (
              <View key={i} style={[styles.setTile, i < setsForThis && styles.setTileDone]}>
                <Text style={[styles.setTileNum, i < setsForThis && styles.setTileNumDone]}>Set {i + 1}</Text>
                {i < setsForThis
                  ? <Ionicons name="checkmark-circle" size={20} color={Colors.lime} />
                  : <Text style={styles.setReps}>10 reps</Text>}
              </View>
            ))}
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.smallBtn} onPress={() => setSwapOpen(true)}>
              <Ionicons name="swap-horizontal" size={18} color="#fff" />
              <Text style={styles.smallBtnText}>Swap</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallBtn} onPress={nextExercise}>
              <Ionicons name="play-skip-forward" size={18} color="#fff" />
              <Text style={styles.smallBtnText}>Skip</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          {setsForThis < SETS_PER ? (
            <TouchableOpacity style={styles.primaryBtn} onPress={completeSet}>
              <Text style={styles.primaryBtnText}>Complete set {setsForThis + 1}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.primaryBtn} onPress={nextExercise}>
              <Text style={styles.primaryBtnText}>{isLast ? 'Finish workout' : 'Next exercise'}</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>

      {/* Rest timer */}
      <Modal visible={rest !== null} transparent animationType="fade">
        <View style={styles.restBackdrop}>
          <View style={styles.restCard}>
            <Text style={styles.restLabel}>Rest</Text>
            <View style={styles.ring}>
              <View style={[styles.ringFill, { transform: [{ rotate: `${restPct * 360}deg` }] }]} />
              <Text style={styles.restNum}>{rest ?? 0}s</Text>
            </View>
            <View style={styles.restActions}>
              <TouchableOpacity style={styles.restBtn} onPress={() => setRest(r => (r ?? 0) + 30)}>
                <Text style={styles.restBtnText}>+30s</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.restBtn, styles.restBtnPrimary]} onPress={() => setRest(null)}>
                <Text style={[styles.restBtnText, { color: Colors.ink }]}>Skip rest</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Swap sheet */}
      <Modal visible={swapOpen} transparent animationType="slide" onRequestClose={() => setSwapOpen(false)}>
        <Pressable style={styles.sheetBackdrop} onPress={() => setSwapOpen(false)} />
        <View style={styles.swapSheet}>
          <View style={styles.handle} />
          <Text style={styles.swapTitle}>Swap exercise</Text>
          <Text style={styles.swapSub}>These train the same muscles.</Text>
          {machine.alts.length === 0 && <Text style={styles.swapSub}>No alternatives listed for this one.</Text>}
          {machine.alts.map((a, i) => (
            <TouchableOpacity key={i} style={styles.swapRow} onPress={() => onSwap(a.n)}>
              <View style={styles.swapIcon}><Ionicons name="barbell-outline" size={18} color={Colors.greenDeep} /></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.swapName}>{a.n}</Text>
                <Text style={styles.swapMuscle}>{a.muscle}</Text>
              </View>
              <View style={styles.swapTag}><Text style={styles.swapTagText}>{a.tag}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.ink },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingTop: 4 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  topTitle: { fontSize: 15, fontWeight: '600', color: 'rgba(255,255,255,0.8)' },
  progressWrap: { paddingHorizontal: 20, marginTop: 12, gap: 8 },
  progressTrack: { height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.12)', overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4, backgroundColor: Colors.lime },
  progressLabel: { fontSize: 13, fontWeight: '500', color: 'rgba(255,255,255,0.7)' },
  illo: { height: 180, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  exName: { fontSize: 28, fontWeight: '700', color: '#fff', textAlign: 'center', letterSpacing: -0.5 },
  exCat: { fontSize: 14, color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginTop: 4 },
  guideLink: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 14 },
  guideLinkText: { fontSize: 14, fontWeight: '600', color: Colors.lime },
  setRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginTop: 28 },
  setTile: { flex: 1, alignItems: 'center', gap: 8, paddingVertical: 18, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.07)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  setTileDone: { backgroundColor: 'rgba(201,251,78,0.12)', borderColor: Colors.lime },
  setTileNum: { fontSize: 13, fontWeight: '600', color: 'rgba(255,255,255,0.7)' },
  setTileNumDone: { color: Colors.lime },
  setReps: { fontSize: 12, color: 'rgba(255,255,255,0.5)' },
  actionRow: { flexDirection: 'row', gap: 12, paddingHorizontal: 20, marginTop: 24 },
  smallBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, height: 48, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.1)' },
  smallBtnText: { fontSize: 15, fontWeight: '600', color: '#fff' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, paddingBottom: 34 },
  primaryBtn: { height: 56, borderRadius: 16, backgroundColor: Colors.lime, alignItems: 'center', justifyContent: 'center' },
  primaryBtnText: { fontSize: 17, fontWeight: '700', color: Colors.ink },
  restBackdrop: { flex: 1, backgroundColor: 'rgba(6,10,16,0.85)', alignItems: 'center', justifyContent: 'center' },
  restCard: { alignItems: 'center', gap: 24 },
  restLabel: { fontSize: 16, fontWeight: '600', color: 'rgba(255,255,255,0.7)', letterSpacing: 1 },
  ring: { width: 180, height: 180, borderRadius: 90, borderWidth: 8, borderColor: 'rgba(201,251,78,0.2)', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  ringFill: { position: 'absolute', top: -8, left: -8, width: 180, height: 180, borderRadius: 90, borderWidth: 8, borderColor: 'transparent', borderTopColor: Colors.lime, borderRightColor: Colors.lime },
  restNum: { fontSize: 48, fontWeight: '700', color: '#fff' },
  restActions: { flexDirection: 'row', gap: 12 },
  restBtn: { paddingHorizontal: 24, height: 50, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center' },
  restBtnPrimary: { backgroundColor: Colors.lime },
  restBtnText: { fontSize: 16, fontWeight: '600', color: '#fff' },
  sheetBackdrop: { flex: 1, backgroundColor: 'rgba(6,12,9,0.5)' },
  swapSheet: { backgroundColor: Colors.cloud, borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: 20, paddingBottom: 40, gap: 8 },
  handle: { width: 38, height: 5, borderRadius: 3, backgroundColor: '#d9d9de', alignSelf: 'center', marginBottom: 8 },
  swapTitle: { fontSize: 20, fontWeight: '700', color: Colors.labelPrimary },
  swapSub: { fontSize: 13, color: Colors.labelSecondary, marginBottom: 6 },
  swapRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#fff', borderRadius: 14, padding: 12 },
  swapIcon: { width: 38, height: 38, borderRadius: 11, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  swapName: { fontSize: 15, fontWeight: '600', color: Colors.labelPrimary },
  swapMuscle: { fontSize: 12, color: Colors.labelSecondary, marginTop: 1 },
  swapTag: { backgroundColor: Colors.lime, borderRadius: 100, paddingHorizontal: 10, paddingVertical: 4 },
  swapTagText: { fontSize: 11, fontWeight: '700', color: '#0a1f12' },
});

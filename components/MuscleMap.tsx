import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

// A small, stylised front-facing body schematic. We don't ship react-native-svg,
// so the figure is composed from plain Views; muscle-map keys light up the
// matching region in lime. Keys come from constants/machines.ts `map`.

const ON = Colors.lime;
const OFF = 'rgba(255,255,255,0.12)';

function has(map: string[], ...keys: string[]) {
  return keys.some(k => map.includes(k));
}

export default function MuscleMap({ map }: { map: string[] }) {
  const shoulders = has(map, 'delts', 'shoulders', 'traps');
  const chest = has(map, 'chest');
  const arms = has(map, 'biceps', 'triceps');
  const core = has(map, 'abs', 'core');
  const back = has(map, 'lats', 'midback');
  const hips = has(map, 'glutes');
  const thighs = has(map, 'quads', 'hamstrings');
  const calves = has(map, 'calves');

  const torsoTop = chest || back || shoulders;

  return (
    <View style={styles.wrap}>
      {/* head */}
      <View style={styles.head} />
      {/* shoulders + arms row */}
      <View style={styles.shoulderRow}>
        <View style={[styles.arm, { backgroundColor: arms ? ON : OFF }]} />
        <View style={[styles.shoulders, { backgroundColor: shoulders ? ON : OFF }]} />
        <View style={[styles.arm, { backgroundColor: arms ? ON : OFF }]} />
      </View>
      {/* torso */}
      <View style={[styles.torsoTop, { backgroundColor: torsoTop ? ON : OFF }]} />
      <View style={[styles.torsoMid, { backgroundColor: core ? ON : OFF }]} />
      {/* hips */}
      <View style={[styles.hips, { backgroundColor: hips ? ON : OFF }]} />
      {/* legs */}
      <View style={styles.legRow}>
        <View style={[styles.thigh, { backgroundColor: thighs ? ON : OFF }]} />
        <View style={[styles.thigh, { backgroundColor: thighs ? ON : OFF }]} />
      </View>
      <View style={styles.legRow}>
        <View style={[styles.calf, { backgroundColor: calves ? ON : OFF }]} />
        <View style={[styles.calf, { backgroundColor: calves ? ON : OFF }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: 96, alignItems: 'center', gap: 3 },
  head: { width: 22, height: 22, borderRadius: 11, backgroundColor: 'rgba(255,255,255,0.2)' },
  shoulderRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  shoulders: { width: 44, height: 14, borderRadius: 7 },
  arm: { width: 12, height: 40, borderRadius: 6 },
  torsoTop: { width: 50, height: 26, borderTopLeftRadius: 8, borderTopRightRadius: 8 },
  torsoMid: { width: 46, height: 24, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, marginTop: 2 },
  hips: { width: 48, height: 14, borderRadius: 7, marginTop: 2 },
  legRow: { flexDirection: 'row', gap: 6, marginTop: 2 },
  thigh: { width: 20, height: 34, borderRadius: 8 },
  calf: { width: 16, height: 30, borderRadius: 7 },
});

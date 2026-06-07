import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { useWorkouts } from '../../context/WorkoutsContext';
import { getMachine } from '../../constants/machines';
import PressableScale from '../../components/PressableScale';
import * as haptics from '../../lib/haptics';

export default function WorkoutPreview() {
  const router = useRouter();
  const { draft, meta, removeFromDraft } = useWorkouts();

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color={Colors.labelPrimary} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
          <View style={styles.summary}>
            <LinearGradient colors={[Colors.ink2, Colors.ink]} style={StyleSheet.absoluteFill} />
            <Text style={styles.summaryEyebrow}>YOUR WORKOUT</Text>
            <Text style={styles.summaryTitle}>{meta.goal}</Text>
            <View style={styles.summaryMeta}>
              <View style={styles.metaItem}><Ionicons name="time-outline" size={16} color={Colors.lime} /><Text style={styles.metaText}>{meta.time}</Text></View>
              <View style={styles.metaItem}><Ionicons name="barbell-outline" size={16} color={Colors.lime} /><Text style={styles.metaText}>{draft.length} exercises</Text></View>
              <View style={styles.metaItem}><Ionicons name="trending-up-outline" size={16} color={Colors.lime} /><Text style={styles.metaText}>{meta.difficulty}</Text></View>
            </View>
          </View>

          <View style={styles.list}>
            {draft.map((key, i) => {
              const m = getMachine(key);
              return (
                <View key={key} style={styles.exRow}>
                  <TouchableOpacity
                    style={styles.exMain}
                    activeOpacity={0.7}
                    onPress={() => router.push({ pathname: '/guide/[key]', params: { key } })}
                  >
                    <View style={styles.exNum}><Text style={styles.exNumText}>{i + 1}</Text></View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.exName}>{m.name}</Text>
                      <Text style={styles.exSub}>{m.cat} · 3 sets</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { haptics.tap(); removeFromDraft(key); }} hitSlop={8} accessibilityRole="button" accessibilityLabel={`Remove ${m.name}`}>
                    <Ionicons name="close-circle" size={22} color={Colors.labelTertiary} />
                  </TouchableOpacity>
                </View>
              );
            })}
            {draft.length === 0 && (
              <Text style={styles.emptyText}>No exercises. Go back and adjust your filters.</Text>
            )}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <PressableScale
            scaleTo={0.98}
            style={[styles.startBtn, draft.length === 0 && { opacity: 0.4 }]}
            disabled={draft.length === 0}
            onPress={() => { haptics.tap(); router.push('/workout/session'); }}
          >
            <Ionicons name="play" size={18} color="#fff" />
            <Text style={styles.startBtnText}>Start workout</Text>
          </PressableScale>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.cloud },
  headerBar: { paddingHorizontal: 8, paddingTop: 4 },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  summary: { margin: 20, marginTop: 4, borderRadius: 22, padding: 22, overflow: 'hidden' },
  summaryEyebrow: { fontSize: 12, fontWeight: '700', letterSpacing: 2, color: Colors.lime },
  summaryTitle: { fontSize: 28, fontWeight: '700', color: '#fff', letterSpacing: -0.5, marginTop: 6 },
  summaryMeta: { flexDirection: 'row', gap: 16, marginTop: 16 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metaText: { fontSize: 13, fontWeight: '500', color: 'rgba(255,255,255,0.85)' },
  list: { paddingHorizontal: 20, gap: 10 },
  exRow: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#fff', borderRadius: 14, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4 },
  exMain: { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 },
  exNum: { width: 30, height: 30, borderRadius: 15, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  exNumText: { fontSize: 14, fontWeight: '700', color: Colors.greenDeep },
  exName: { fontSize: 16, fontWeight: '600', color: Colors.labelPrimary, letterSpacing: -0.2 },
  exSub: { fontSize: 12, color: Colors.labelSecondary, marginTop: 2 },
  emptyText: { fontSize: 15, color: Colors.labelSecondary, textAlign: 'center', marginTop: 30 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, paddingBottom: 30, backgroundColor: 'rgba(244,246,240,0.95)', borderTopWidth: 0.5, borderTopColor: Colors.separator },
  startBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, height: 54, borderRadius: 16, backgroundColor: Colors.green },
  startBtnText: { fontSize: 17, fontWeight: '700', color: '#fff' },
});

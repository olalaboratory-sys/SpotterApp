import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { usePlaces } from '../../context/PlacesContext';
import { getMachine } from '../../constants/machines';
import { iconForKey } from '../../constants/machineIcon';
import * as haptics from '../../lib/haptics';

export default function SavedMachineDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { saved, current, removeFrom, setStatus } = usePlaces();
  const STATUSES: { id: 'Scanned' | 'Tried once' | 'Comfortable'; label: string }[] = [
    { id: 'Scanned', label: 'Just saw it' },
    { id: 'Tried once', label: 'Tried once' },
    { id: 'Comfortable', label: 'Comfortable' },
  ];

  const entry = saved.find(s => s.id === id);
  if (!entry) {
    return (
      <View style={[styles.screen, { alignItems: 'center', justifyContent: 'center' }]}>
        <Text style={{ color: Colors.labelSecondary }}>This machine is no longer saved.</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 12 }}><Text style={{ color: Colors.greenDeep, fontWeight: '600' }}>Go back</Text></TouchableOpacity>
      </View>
    );
  }

  const machine = getMachine(entry.key);
  const remove = () => {
    Alert.alert('Remove from place', `Remove ${entry.name} from ${current?.name ?? 'this place'}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: async () => { await removeFrom(entry.placeId, entry.key); router.back(); } },
    ]);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.hero}>
        <LinearGradient colors={[Colors.ink2, Colors.ink]} style={StyleSheet.absoluteFill} />
        <SafeAreaView>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={20} color="#fff" />
          </TouchableOpacity>
        </SafeAreaView>
        <View style={styles.heroImage}>
          {entry.photoUri
            ? <Image source={{ uri: entry.photoUri }} style={styles.heroPhoto} resizeMode="cover" />
            : <Ionicons name={iconForKey(entry.key)} size={72} color={Colors.lime} />}
        </View>
        <View style={styles.heroText}>
          <Text style={styles.heroName}>{entry.name}</Text>
          <View style={styles.chip}><Text style={styles.chipText}>{machine.cat}</Text></View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, gap: 16 }}>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push({ pathname: '/guide/[key]', params: { key: entry.key } })}>
          <Ionicons name="book-outline" size={20} color="#fff" />
          <Text style={styles.primaryBtnText}>Open full guide</Text>
        </TouchableOpacity>

        <View style={styles.histCard}>
          <Text style={styles.histTitle}>How comfortable are you?</Text>
          <View style={styles.statusRow}>
            {STATUSES.map(s => {
              const on = entry.status === s.id;
              return (
                <TouchableOpacity
                  key={s.id}
                  style={[styles.statusPill, on && styles.statusPillOn]}
                  onPress={() => { if (!on) { haptics.tap(); setStatus(entry.key, s.id, entry.placeId); } }}
                >
                  <Text style={[styles.statusPillText, on && styles.statusPillTextOn]}>{s.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={[styles.histTitle, { marginTop: 6 }]}>Your history</Text>
          <View style={styles.histRow}>
            <View style={[styles.dot, { backgroundColor: entry.status === 'Comfortable' ? Colors.green : entry.status === 'Scanned' ? Colors.sky : Colors.amber }]} />
            <Text style={styles.histLabel}>{entry.status}</Text>
            <Text style={styles.histDate}>{entry.savedAt ? entry.savedAt.toLocaleDateString() : 'Recently'}</Text>
          </View>
          <View style={styles.histRow}>
            <Ionicons name="bookmark-outline" size={16} color={Colors.labelSecondary} />
            <Text style={styles.histLabel}>Saved to {current?.name ?? 'this place'}</Text>
          </View>
          {entry.lastTrainedAt && (
            <View style={styles.histRow}>
              <Ionicons name="barbell-outline" size={16} color={Colors.labelSecondary} />
              <Text style={styles.histLabel}>Last trained</Text>
              <Text style={styles.histDate}>{entry.lastTrainedAt.toLocaleDateString()}</Text>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.removeBtn} onPress={remove}>
          <Ionicons name="trash-outline" size={18} color="#FF3B30" />
          <Text style={styles.removeText}>Remove from place</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.cloud },
  hero: { paddingBottom: 24, overflow: 'hidden' },
  backBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.14)', alignItems: 'center', justifyContent: 'center', margin: 12 },
  heroImage: { height: 140, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  heroPhoto: { width: '100%', height: 140 },
  heroText: { paddingHorizontal: 20, gap: 8 },
  heroName: { fontSize: 28, fontWeight: '700', color: '#fff', letterSpacing: -0.5 },
  chip: { alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.14)', borderRadius: 100, paddingHorizontal: 12, paddingVertical: 5 },
  chipText: { fontSize: 12, fontWeight: '600', color: 'rgba(223,247,231,0.9)' },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, height: 54, borderRadius: 16, backgroundColor: Colors.green },
  primaryBtnText: { fontSize: 17, fontWeight: '600', color: '#fff' },
  histCard: { backgroundColor: '#fff', borderRadius: 18, padding: 16, gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 },
  histTitle: { fontSize: 16, fontWeight: '700', color: Colors.labelPrimary },
  statusRow: { flexDirection: 'row', gap: 8 },
  statusPill: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 12, backgroundColor: Colors.cloud, borderWidth: 1.5, borderColor: Colors.separator },
  statusPillOn: { backgroundColor: Colors.green, borderColor: Colors.green },
  statusPillText: { fontSize: 13, fontWeight: '600', color: Colors.labelSecondary },
  statusPillTextOn: { color: '#fff' },
  histRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  histLabel: { fontSize: 14, color: Colors.labelPrimary, flex: 1 },
  histDate: { fontSize: 12, color: Colors.labelTertiary },
  removeBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, height: 50, borderRadius: 14, backgroundColor: '#fff' },
  removeText: { fontSize: 15, fontWeight: '600', color: '#FF3B30' },
});

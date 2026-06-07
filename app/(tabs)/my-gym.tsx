import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { iconForKey } from '../../constants/machineIcon';
import { usePlaces } from '../../context/PlacesContext';
import PlacePickerSheet from '../../components/PlacePickerSheet';

const FILTERS = ['All', 'Upper', 'Lower', 'Core'] as const;

export default function MyPlacesTab() {
  const router = useRouter();
  const { current, currentMachines, loading } = usePlaces();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');

  const machines = useMemo(
    () => (filter === 'All' ? currentMachines : currentMachines.filter(m => m.area === filter)),
    [currentMachines, filter],
  );

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>My places</Text>
            <TouchableOpacity style={styles.switcher} onPress={() => setPickerOpen(true)} activeOpacity={0.7}>
              <Text style={styles.switcherName}>{current?.name ?? 'My Gym'}</Text>
              <Ionicons name="chevron-down" size={16} color={Colors.greenDeep} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.headerAdd} onPress={() => setPickerOpen(true)}>
            <Ionicons name="swap-horizontal" size={20} color={Colors.green} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
          <View style={styles.section}>
            <TouchableOpacity style={styles.addBtn} activeOpacity={0.9} onPress={() => router.push('/add-machine')}>
              <Ionicons name="add" size={22} color="#fff" />
              <View>
                <Text style={styles.addBtnText}>Add a machine</Text>
                <Text style={styles.addBtnSub}>Scan · search · by hand</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.filterRow}>
            {FILTERS.map(f => (
              <TouchableOpacity key={f} style={[styles.filterChip, filter === f && styles.filterChipActive]} onPress={() => setFilter(f)}>
                <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {machines.length === 0 ? (
            <View style={styles.empty}>
              <Ionicons name="scan-outline" size={40} color={Colors.labelTertiary} />
              <Text style={styles.emptyTitle}>{loading ? 'Loading…' : 'No machines here yet'}</Text>
              <Text style={styles.emptySub}>Tap “Add a machine” to scan, search, or add one by hand.</Text>
            </View>
          ) : (
            <View style={styles.grid}>
              {machines.map(m => (
                <TouchableOpacity
                  key={m.id}
                  style={styles.card}
                  activeOpacity={0.85}
                  onPress={() => router.push({ pathname: '/machine/[id]', params: { id: m.id } })}
                >
                  <View style={styles.cardImage}>
                    {m.photoUri
                      ? <Image source={{ uri: m.photoUri }} style={styles.cardPhoto} resizeMode="cover" />
                      : <Ionicons name={iconForKey(m.key)} size={34} color={Colors.green} />}
                  </View>
                  <Text style={styles.cardName} numberOfLines={1}>{m.name}</Text>
                  <Text style={styles.cardCat} numberOfLines={1}>{m.cat}</Text>
                  <View style={styles.cardStatus}>
                    <View style={[styles.dot, { backgroundColor: m.status === 'Comfortable' ? Colors.green : m.status === 'Scanned' ? Colors.sky : Colors.amber }]} />
                    <Text style={styles.cardStatusText}>{m.status}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>

        {currentMachines.length > 0 && (
          <View style={styles.footer}>
            <TouchableOpacity style={styles.buildBtn} onPress={() => router.push('/workout/builder')}>
              <Ionicons name="barbell" size={18} color="#fff" />
              <Text style={styles.buildBtnText}>Build workout from this place</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>

      <PlacePickerSheet visible={pickerOpen} onClose={() => setPickerOpen(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.cloud },
  header: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  title: { fontSize: 34, fontWeight: '700', letterSpacing: 0.4, color: Colors.labelPrimary },
  switcher: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  switcherName: { fontSize: 15, fontWeight: '600', color: Colors.greenDeep },
  headerAdd: { width: 36, height: 36, borderRadius: 10, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  section: { paddingHorizontal: 20, marginBottom: 16 },
  addBtn: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: Colors.green, borderRadius: 18, padding: 18, shadowColor: '#082816', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.18, shadowRadius: 18 },
  addBtnText: { fontSize: 17, fontWeight: '700', color: '#fff' },
  addBtnSub: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 1 },
  filterRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 20, marginBottom: 16 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 100, backgroundColor: '#fff', borderWidth: 1, borderColor: Colors.separator },
  filterChipActive: { backgroundColor: Colors.ink, borderColor: Colors.ink },
  filterText: { fontSize: 14, fontWeight: '600', color: Colors.labelSecondary },
  filterTextActive: { color: '#fff' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, paddingHorizontal: 20 },
  card: { width: '47%', flexGrow: 1, backgroundColor: '#fff', borderRadius: 18, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
  cardImage: { height: 80, borderRadius: 12, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center', marginBottom: 10, overflow: 'hidden' },
  cardPhoto: { width: '100%', height: '100%' },
  cardName: { fontSize: 15, fontWeight: '700', color: Colors.labelPrimary, letterSpacing: -0.2 },
  cardCat: { fontSize: 12, color: Colors.labelSecondary, marginTop: 2 },
  cardStatus: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 8 },
  dot: { width: 7, height: 7, borderRadius: 4 },
  cardStatusText: { fontSize: 11, fontWeight: '500', color: Colors.labelSecondary },
  empty: { alignItems: 'center', paddingVertical: 50, paddingHorizontal: 40, gap: 8 },
  emptyTitle: { fontSize: 17, fontWeight: '600', color: Colors.labelPrimary, marginTop: 8 },
  emptySub: { fontSize: 14, color: Colors.labelSecondary, textAlign: 'center', lineHeight: 20 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, paddingBottom: 30, backgroundColor: 'rgba(244,246,240,0.95)', borderTopWidth: 0.5, borderTopColor: Colors.separator },
  buildBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, height: 54, borderRadius: 16, backgroundColor: Colors.ink },
  buildBtnText: { fontSize: 16, fontWeight: '600', color: '#fff' },
});

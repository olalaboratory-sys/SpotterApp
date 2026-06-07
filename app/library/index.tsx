import React, { useMemo, useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { iconForKey } from '../../constants/machineIcon';
import {
  MACHINE_AREAS, FREE_WEIGHT_FAMILIES, countInArea, countInFamily,
  beginnerMachines, searchMachines, areaForQuery, BodyArea, Family,
} from '../../constants/catalog';

const AREA_ICON: Record<BodyArea, keyof typeof Ionicons.glyphMap> = {
  Chest: 'body-outline', Back: 'man-outline', Shoulders: 'barbell-outline', Arms: 'fitness-outline',
  Legs: 'walk-outline', Glutes: 'body-outline', Core: 'ellipse-outline', Cable: 'git-network-outline',
};
const FAMILY_ICON: Record<Family, keyof typeof Ionicons.glyphMap> = {
  Machine: 'cog-outline', Cable: 'git-network-outline', Barbell: 'barbell-outline',
  Dumbbell: 'barbell-outline', Kettlebell: 'fitness-outline', Bands: 'remove-outline', Bodyweight: 'body-outline',
};

function GridTile({ icon, label, count, onPress }: { icon: keyof typeof Ionicons.glyphMap; label: string; count: number; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.tile} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.tileIcon}><Ionicons name={icon} size={22} color={Colors.greenDeep} /></View>
      <Text style={styles.tileLabel}>{label}</Text>
      <Text style={styles.tileCount}>{count} {count === 1 ? 'item' : 'items'}</Text>
    </TouchableOpacity>
  );
}

export default function LibraryScreen() {
  const router = useRouter();
  const [q, setQ] = useState('');
  const trimmed = q.trim();

  const results = useMemo(() => (trimmed ? searchMachines(trimmed) : []), [trimmed]);
  const suggestedArea = useMemo(() => (trimmed ? areaForQuery(trimmed) : null), [trimmed]);
  const beginner = useMemo(() => beginnerMachines(6), []);

  const openMachine = (key: string) => router.push({ pathname: '/guide/[key]', params: { key } });

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color={Colors.labelPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>Machine library</Text>
        </View>

        <View style={styles.searchRow}>
          <Ionicons name="search" size={18} color={Colors.labelTertiary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search machines, muscles, “butt”, “abs”…"
            placeholderTextColor={Colors.labelTertiary}
            value={q}
            onChangeText={setQ}
            autoCorrect={false}
            returnKeyType="search"
          />
          {trimmed ? (
            <TouchableOpacity onPress={() => setQ('')}><Ionicons name="close-circle" size={18} color={Colors.labelTertiary} /></TouchableOpacity>
          ) : null}
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }} keyboardShouldPersistTaps="handled">
          {trimmed ? (
            <View style={styles.section}>
              {suggestedArea && (
                <TouchableOpacity
                  style={styles.routineCard}
                  onPress={() => router.push({ pathname: '/library/[category]', params: { category: suggestedArea, kind: 'area' } })}
                  activeOpacity={0.85}
                >
                  <View style={styles.routineIcon}><Ionicons name="sparkles-outline" size={20} color={Colors.ink} /></View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.routineTitle}>Build a {suggestedArea.toLowerCase()} workout</Text>
                    <Text style={styles.routineSub}>See all {suggestedArea} machines</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={Colors.greenInk} />
                </TouchableOpacity>
              )}
              <Text style={styles.sectionTitle}>{results.length} result{results.length === 1 ? '' : 's'}</Text>
              {results.map(m => (
                <TouchableOpacity key={m.key} style={styles.row} onPress={() => openMachine(m.key)} activeOpacity={0.8}>
                  <View style={styles.rowIcon}><Ionicons name={iconForKey(m.key)} size={20} color={Colors.greenDeep} /></View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.rowName}>{m.name}</Text>
                    <Text style={styles.rowSub}>{m.cat}</Text>
                  </View>
                  {m.beginner && <View style={styles.begPill}><Text style={styles.begPillText}>Beginner</Text></View>}
                  <Ionicons name="chevron-forward" size={18} color={Colors.labelTertiary} />
                </TouchableOpacity>
              ))}
              {results.length === 0 && (
                <View style={styles.empty}>
                  <Text style={styles.emptyText}>No matches for “{trimmed}”.</Text>
                  <TouchableOpacity style={styles.emptyBtn} onPress={() => router.push('/add-machine')}>
                    <Text style={styles.emptyBtnText}>Add it manually</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ) : (
            <>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Machines · by body area</Text>
                <View style={styles.grid}>
                  {MACHINE_AREAS.map(a => (
                    <GridTile key={a} icon={AREA_ICON[a]} label={a} count={countInArea(a)}
                      onPress={() => router.push({ pathname: '/library/[category]', params: { category: a, kind: 'area' } })} />
                  ))}
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Free weights & tools</Text>
                <Text style={styles.sectionSub}>No machine needed</Text>
                <View style={styles.grid}>
                  {FREE_WEIGHT_FAMILIES.map(f => (
                    <GridTile key={f} icon={FAMILY_ICON[f]} label={f} count={countInFamily(f)}
                      onPress={() => router.push({ pathname: '/library/[category]', params: { category: f, kind: 'family' } })} />
                  ))}
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Good for beginners</Text>
                {beginner.map(m => (
                  <TouchableOpacity key={m.key} style={styles.row} onPress={() => openMachine(m.key)} activeOpacity={0.8}>
                    <View style={styles.rowIcon}><Ionicons name={iconForKey(m.key)} size={20} color={Colors.greenDeep} /></View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.rowName}>{m.name}</Text>
                      <Text style={styles.rowSub}>{m.cat}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={Colors.labelTertiary} />
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
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
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 20, marginVertical: 10, paddingHorizontal: 14, height: 44, borderRadius: 14, backgroundColor: '#fff', borderWidth: 1, borderColor: Colors.separator },
  searchInput: { flex: 1, fontSize: 16, color: Colors.labelPrimary },
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionTitle: { fontSize: 19, fontWeight: '700', letterSpacing: -0.3, color: Colors.labelPrimary, marginBottom: 4 },
  sectionSub: { fontSize: 13, color: Colors.labelSecondary, marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 8 },
  tile: { width: '47%', flexGrow: 1, backgroundColor: '#fff', borderRadius: 18, padding: 16, gap: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
  tileIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  tileLabel: { fontSize: 16, fontWeight: '700', color: Colors.labelPrimary, letterSpacing: -0.2 },
  tileCount: { fontSize: 12, color: Colors.labelSecondary },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#fff', borderRadius: 14, padding: 12, marginTop: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4 },
  rowIcon: { width: 40, height: 40, borderRadius: 11, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  rowName: { fontSize: 15, fontWeight: '600', color: Colors.labelPrimary, letterSpacing: -0.2 },
  rowSub: { fontSize: 12, color: Colors.labelSecondary, marginTop: 2 },
  begPill: { backgroundColor: Colors.lime, borderRadius: 100, paddingHorizontal: 8, paddingVertical: 3 },
  begPillText: { fontSize: 11, fontWeight: '700', color: '#0a1f12' },
  routineCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: Colors.lime, borderRadius: 16, padding: 14, marginBottom: 14 },
  routineIcon: { width: 38, height: 38, borderRadius: 11, backgroundColor: 'rgba(12,15,22,0.12)', alignItems: 'center', justifyContent: 'center' },
  routineTitle: { fontSize: 16, fontWeight: '700', color: Colors.ink, letterSpacing: -0.2 },
  routineSub: { fontSize: 12, color: Colors.greenInk, marginTop: 1 },
  empty: { alignItems: 'center', paddingVertical: 28, gap: 12 },
  emptyText: { fontSize: 15, color: Colors.labelSecondary },
  emptyBtn: { height: 44, paddingHorizontal: 20, borderRadius: 12, backgroundColor: Colors.mist, borderWidth: 1.5, borderColor: Colors.green, alignItems: 'center', justifyContent: 'center' },
  emptyBtnText: { fontSize: 14, fontWeight: '600', color: Colors.greenDeep },
});

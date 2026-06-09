import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import MachineIcon from '../../components/MachineIcon';
import { machinesInArea, machinesInFamily, BodyArea, Family } from '../../constants/catalog';
import { usePlaces } from '../../context/PlacesContext';

export default function CategoryScreen() {
  const router = useRouter();
  const { category, kind, mode } = useLocalSearchParams<{ category: string; kind: string; mode?: string }>();
  const { current, isSaved, saveTo } = usePlaces();
  const addMode = mode === 'add';

  const machines = useMemo(() => {
    if (kind === 'family') return machinesInFamily(category as Family);
    return machinesInArea(category as BodyArea);
  }, [category, kind]);

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color={Colors.labelPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>{category}</Text>
        </View>

        {addMode && current && (
          <View style={styles.banner}>
            <Ionicons name="add-circle" size={16} color={Colors.greenDeep} />
            <Text style={styles.bannerText}>Adding to {current.name} — no photo needed</Text>
          </View>
        )}

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingTop: 8, gap: 10 }}>
          {machines.map(m => {
            const saved = addMode && current ? isSaved(m.key, current.id) : false;
            return (
              <View key={m.key} style={styles.row}>
                <TouchableOpacity
                  style={styles.rowMain}
                  activeOpacity={0.8}
                  onPress={() => router.push({ pathname: '/guide/[key]', params: { key: m.key } })}
                >
                  <View style={styles.rowIcon}><MachineIcon machineKey={m.key} size={20} color={Colors.greenDeep} /></View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.rowName}>{m.name}</Text>
                    <Text style={styles.rowSub}>{m.cat}</Text>
                  </View>
                </TouchableOpacity>
                {addMode && current ? (
                  <TouchableOpacity
                    style={[styles.addPill, saved && styles.addedPill]}
                    disabled={saved}
                    onPress={() => saveTo(current.id, m.key, 'Added')}
                  >
                    {saved ? (
                      <><Ionicons name="checkmark" size={15} color={Colors.greenDeep} /><Text style={styles.addedText}>Added</Text></>
                    ) : (
                      <><Ionicons name="add" size={16} color="#fff" /><Text style={styles.addText}>Add</Text></>
                    )}
                  </TouchableOpacity>
                ) : (
                  <Ionicons name="chevron-forward" size={18} color={Colors.labelTertiary} />
                )}
              </View>
            );
          })}
          {machines.length === 0 && <Text style={styles.emptyText}>Nothing here yet.</Text>}
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
  banner: { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 20, marginBottom: 4, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, backgroundColor: Colors.mist },
  bannerText: { fontSize: 13, fontWeight: '600', color: Colors.greenInk },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#fff', borderRadius: 14, padding: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4 },
  rowMain: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  rowIcon: { width: 40, height: 40, borderRadius: 11, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  rowName: { fontSize: 15, fontWeight: '600', color: Colors.labelPrimary, letterSpacing: -0.2 },
  rowSub: { fontSize: 12, color: Colors.labelSecondary, marginTop: 2 },
  addPill: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.green, borderRadius: 100, paddingHorizontal: 12, paddingVertical: 7 },
  addedPill: { backgroundColor: Colors.mist },
  addText: { fontSize: 13, fontWeight: '700', color: '#fff' },
  addedText: { fontSize: 13, fontWeight: '700', color: Colors.greenDeep },
  emptyText: { fontSize: 15, color: Colors.labelSecondary, textAlign: 'center', marginTop: 30 },
});

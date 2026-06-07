import React, { useMemo, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, KeyboardAvoidingView, Platform, Alert, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { usePlaces } from '../context/PlacesContext';
import { searchMachines } from '../constants/catalog';
import { Machine } from '../constants/machines';
import { iconForKey } from '../constants/machineIcon';
import * as haptics from '../lib/haptics';

type Mode = 'find' | 'custom';

const EQUIP_TYPES: { id: string; label: string; icon: keyof typeof Ionicons.glyphMap; illo: string }[] = [
  { id: 'Machine', label: 'Machine', icon: 'cog-outline', illo: 'machine' },
  { id: 'Barbell', label: 'Barbell', icon: 'barbell-outline', illo: 'barbell' },
  { id: 'Dumbbell', label: 'Dumbbell', icon: 'barbell-outline', illo: 'dumbbell' },
  { id: 'Kettlebell', label: 'Kettlebell', icon: 'fitness-outline', illo: 'kettlebell' },
  { id: 'Band', label: 'Resistance band', icon: 'remove-outline', illo: 'band' },
  { id: 'Cable', label: 'Cable', icon: 'git-network-outline', illo: 'cable' },
  { id: 'Bodyweight', label: 'Bodyweight', icon: 'body-outline', illo: 'bodyweight' },
  { id: 'Other', label: 'Other', icon: 'ellipsis-horizontal', illo: 'machine' },
];

const MUSCLES: { label: string; area: string }[] = [
  { label: 'Chest', area: 'Upper' }, { label: 'Back', area: 'Upper' }, { label: 'Shoulders', area: 'Upper' },
  { label: 'Arms', area: 'Upper' }, { label: 'Legs', area: 'Lower' }, { label: 'Glutes', area: 'Lower' },
  { label: 'Core', area: 'Core' }, { label: 'Full body', area: 'Upper' },
];

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default function AddMachineModal() {
  const router = useRouter();
  const { current, isSaved, saveTo, registerCustom } = usePlaces();
  const [mode, setMode] = useState<Mode>('find');

  // find mode
  const [q, setQ] = useState('');
  const results = useMemo(() => (q.trim() ? searchMachines(q) : []), [q]);

  // custom mode
  const [equip, setEquip] = useState('Machine');
  const [name, setName] = useState('');
  const [muscles, setMuscles] = useState<string[]>([]);

  const toggleMuscle = (m: string) =>
    setMuscles(cur => (cur.includes(m) ? cur.filter(x => x !== m) : [...cur, m]));

  const saveCustom = async () => {
    if (!name.trim()) return Alert.alert('Missing info', 'Please enter a name.');
    if (muscles.length === 0) return Alert.alert('Missing info', 'Pick at least one muscle group.');
    if (!current) return;

    const type = EQUIP_TYPES.find(t => t.id === equip)!;
    const area = MUSCLES.find(m => m.label === muscles[0])?.area ?? 'Upper';
    let key = slugify(name) || `custom-${Date.now()}`;
    // Avoid clobbering a catalog entry.
    key = `custom-${key}`;

    const machine: Machine = {
      key,
      name: name.trim(),
      cat: `${equip} · ${muscles[0]}`,
      area,
      beginner: true,
      illo: type.illo,
      summary: `A ${equip.toLowerCase()} exercise you added yourself. Train at your own pace and focus on smooth, controlled movement.`,
      muscles: muscles.map((m, i) => ({ n: m, primary: i === 0 })),
      map: [],
      quick: [
        { ic: 'seat', k: 'Setup', v: 'Get into a stable position' },
        { ic: 'hand', k: 'Grip', v: 'Firm and comfortable' },
        { ic: 'swatch', k: 'Weight', v: 'Start light' },
        { ic: 'list', k: 'Reps', v: '2–3 sets of 10' },
      ],
      setup: ['Set up in a stable, comfortable position.', 'Start with a light, manageable load.', 'Brace your core before you begin.'],
      movement: ['Move slowly and with control.', 'Keep good posture throughout.', 'Breathe out on the effort, in on the return.'],
      mistakes: [{ t: 'Going too heavy', w: 'Form breaks down.', f: 'Drop the weight until every rep is smooth.' }],
      alts: [],
    };

    await registerCustom(machine);
    await saveTo(current.id, key, 'Added');
    haptics.success();
    router.replace({ pathname: '/guide/[key]', params: { key } });
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          <View style={styles.grabHandle} />
          <View style={styles.header}>
            <Text style={styles.title}>Add a machine</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Close">
              <Ionicons name="close" size={20} color={Colors.labelPrimary} />
            </TouchableOpacity>
          </View>

          {current && (
            <View style={styles.banner}>
              <Ionicons name="bookmark" size={14} color={Colors.greenDeep} />
              <Text style={styles.bannerText}>Adding to {current.name}</Text>
            </View>
          )}

          <TouchableOpacity style={styles.scanRow} onPress={() => router.replace('/(tabs)/scan')}>
            <View style={styles.scanIcon}><Ionicons name="scan-outline" size={22} color={Colors.ink} /></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.scanTitle}>Scan a machine</Text>
              <Text style={styles.scanSub}>Point your camera and let Spotter identify it</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.labelTertiary} />
          </TouchableOpacity>

          <View style={styles.segment}>
            {(['find', 'custom'] as Mode[]).map(m => (
              <TouchableOpacity key={m} style={[styles.segBtn, mode === m && styles.segBtnActive]} onPress={() => setMode(m)}>
                <Text style={[styles.segText, mode === m && styles.segTextActive]}>{m === 'find' ? 'Find a machine' : 'Add it yourself'}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {mode === 'find' ? (
            <>
              <View style={styles.searchRow}>
                <Ionicons name="search" size={18} color={Colors.labelTertiary} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search the catalog…"
                  placeholderTextColor={Colors.labelTertiary}
                  value={q}
                  onChangeText={setQ}
                  autoCorrect={false}
                />
              </View>
              <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 4, gap: 10 }} keyboardShouldPersistTaps="handled">
                {results.map(m => {
                  const saved = current ? isSaved(m.key, current.id) : false;
                  return (
                    <View key={m.key} style={styles.resultRow}>
                      <View style={styles.resultIcon}><Ionicons name={iconForKey(m.key)} size={20} color={Colors.greenDeep} /></View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.resultName}>{m.name}</Text>
                        <Text style={styles.resultSub}>{m.cat}</Text>
                      </View>
                      <TouchableOpacity
                        style={[styles.addPill, saved && styles.addedPill]}
                        disabled={saved || !current}
                        onPress={() => { if (current) { haptics.success(); saveTo(current.id, m.key, 'Added'); } }}
                      >
                        {saved
                          ? <><Ionicons name="checkmark" size={15} color={Colors.greenDeep} /><Text style={styles.addedText}>Added</Text></>
                          : <><Ionicons name="add" size={16} color="#fff" /><Text style={styles.addText}>Add</Text></>}
                      </TouchableOpacity>
                    </View>
                  );
                })}
                {q.trim() && results.length === 0 && (
                  <View style={{ alignItems: 'center', paddingVertical: 24, gap: 12 }}>
                    <Text style={{ color: Colors.labelSecondary }}>No matches. Add it yourself instead.</Text>
                    <TouchableOpacity style={styles.linkBtn} onPress={() => { setMode('custom'); setName(q); }}>
                      <Text style={styles.linkBtnText}>Add “{q.trim()}” manually</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </ScrollView>
            </>
          ) : (
            <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 8 }} keyboardShouldPersistTaps="handled">
              <Text style={styles.label}>Equipment type</Text>
              <View style={styles.typeGrid}>
                {EQUIP_TYPES.map(t => (
                  <TouchableOpacity key={t.id} style={[styles.typeTile, equip === t.id && styles.typeTileActive]} onPress={() => setEquip(t.id)}>
                    <Ionicons name={t.icon} size={20} color={equip === t.id ? Colors.greenDeep : Colors.labelSecondary} />
                    <Text style={[styles.typeText, equip === t.id && styles.typeTextActive]}>{t.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Name</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Hammer Strength Row"
                  placeholderTextColor={Colors.labelTertiary}
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <Text style={styles.label}>What does it train?</Text>
              <View style={styles.chipGrid}>
                {MUSCLES.map(m => (
                  <TouchableOpacity key={m.label} style={[styles.chip, muscles.includes(m.label) && styles.chipSelected]} onPress={() => toggleMuscle(m.label)}>
                    <Text style={[styles.chipText, muscles.includes(m.label) && styles.chipTextSelected]}>{m.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={styles.saveBtn} onPress={saveCustom} activeOpacity={0.85}>
                <Ionicons name="checkmark" size={20} color={Colors.ink} />
                <Text style={styles.saveBtnText}>Save & open guide</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.cloud },
  grabHandle: { alignSelf: 'center', width: 40, height: 5, borderRadius: 3, backgroundColor: Colors.separator, marginTop: 8, marginBottom: 2 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: Colors.separator },
  title: { fontSize: 18, fontWeight: '700', color: Colors.labelPrimary },
  closeBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#f2f2f7', alignItems: 'center', justifyContent: 'center' },
  banner: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'center', marginTop: 12, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 100, backgroundColor: Colors.mist },
  bannerText: { fontSize: 13, fontWeight: '600', color: Colors.greenInk },
  scanRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginHorizontal: 20, marginTop: 14, padding: 14, borderRadius: 16, backgroundColor: Colors.lime },
  scanIcon: { width: 42, height: 42, borderRadius: 12, backgroundColor: 'rgba(12,15,22,0.12)', alignItems: 'center', justifyContent: 'center' },
  scanTitle: { fontSize: 16, fontWeight: '700', color: Colors.ink },
  scanSub: { fontSize: 12, color: Colors.greenInk, marginTop: 1 },
  segment: { flexDirection: 'row', backgroundColor: '#e9e9ee', borderRadius: 12, padding: 3, marginHorizontal: 20, marginTop: 16 },
  segBtn: { flex: 1, alignItems: 'center', paddingVertical: 9, borderRadius: 9 },
  segBtnActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3 },
  segText: { fontSize: 14, fontWeight: '600', color: Colors.labelSecondary },
  segTextActive: { color: Colors.labelPrimary },
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 20, marginTop: 14, paddingHorizontal: 14, height: 44, borderRadius: 14, backgroundColor: '#fff', borderWidth: 1, borderColor: Colors.separator },
  searchInput: { flex: 1, fontSize: 16, color: Colors.labelPrimary },
  resultRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#fff', borderRadius: 14, padding: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4 },
  resultIcon: { width: 40, height: 40, borderRadius: 11, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  resultName: { fontSize: 15, fontWeight: '600', color: Colors.labelPrimary },
  resultSub: { fontSize: 12, color: Colors.labelSecondary, marginTop: 2 },
  addPill: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.green, borderRadius: 100, paddingHorizontal: 12, paddingVertical: 7 },
  addedPill: { backgroundColor: Colors.mist },
  addText: { fontSize: 13, fontWeight: '700', color: '#fff' },
  addedText: { fontSize: 13, fontWeight: '700', color: Colors.greenDeep },
  linkBtn: { paddingHorizontal: 18, height: 44, borderRadius: 12, backgroundColor: Colors.mist, borderWidth: 1.5, borderColor: Colors.green, alignItems: 'center', justifyContent: 'center' },
  linkBtnText: { fontSize: 14, fontWeight: '600', color: Colors.greenDeep },
  label: { fontSize: 14, fontWeight: '600', color: Colors.labelSecondary, marginBottom: 8, marginTop: 16 },
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  typeTile: { width: '31%', flexGrow: 1, alignItems: 'center', gap: 6, paddingVertical: 14, borderRadius: 12, backgroundColor: '#fff', borderWidth: 1.5, borderColor: Colors.separator },
  typeTileActive: { borderColor: Colors.green, backgroundColor: Colors.mist2 },
  typeText: { fontSize: 12, fontWeight: '600', color: Colors.labelSecondary },
  typeTextActive: { color: Colors.greenDeep },
  inputWrap: { backgroundColor: '#fff', borderRadius: 14, borderWidth: 1.5, borderColor: Colors.separator },
  input: { fontSize: 16, color: Colors.labelPrimary, padding: 14 },
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 100, backgroundColor: '#fff', borderWidth: 1.5, borderColor: Colors.separator },
  chipSelected: { backgroundColor: Colors.mist, borderColor: Colors.green },
  chipText: { fontSize: 14, fontWeight: '500', color: Colors.labelSecondary },
  chipTextSelected: { color: Colors.greenDeep, fontWeight: '600' },
  saveBtn: { height: 54, borderRadius: 16, backgroundColor: Colors.lime, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 28 },
  saveBtnText: { fontSize: 17, fontWeight: '600', color: Colors.ink },
});

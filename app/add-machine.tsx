import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment } from 'firebase/firestore';
import { Colors } from '../constants/colors';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';

const MUSCLE_GROUPS = ['Back', 'Chest', 'Legs', 'Shoulders', 'Arms', 'Core', 'Full Body', 'Glutes'];
const STATUSES = ['Comfortable', 'Tried once', 'scanned'] as const;

export default function AddMachineModal() {
  const router = useRouter();
  const { user, refreshProfile } = useAuth();
  const [name, setName] = useState('');
  const [muscle, setMuscle] = useState('');
  const [status, setStatus] = useState<(typeof STATUSES)[number]>('Tried once');
  const [loading, setLoading] = useState(false);

  const dotColor = status === 'Comfortable' ? Colors.green : status === 'scanned' ? Colors.sky : Colors.amber;

  const handleSave = async () => {
    if (!name.trim()) return Alert.alert('Missing info', 'Please enter the machine name.');
    if (!muscle) return Alert.alert('Missing info', 'Please select a muscle group.');
    if (!user) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'users', user.uid, 'machines'), {
        name: name.trim(),
        muscle,
        status,
        dotColor,
        machineKey: name.trim().toLowerCase().replace(/\s+/g, '-'),
        savedAt: serverTimestamp(),
      });
      await updateDoc(doc(db, 'users', user.uid), { machinesCount: increment(1) });
      await refreshProfile();
      router.back();
    } catch (err: any) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          <View style={styles.header}>
            <Text style={styles.title}>Add Machine</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
              <Ionicons name="close" size={20} color={Colors.labelPrimary} />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
            <Text style={styles.label}>Machine name</Text>
            <View style={styles.inputWrap}>
              <TextInput
                style={styles.input}
                placeholder="e.g. Lat Pulldown, Chest Press"
                placeholderTextColor={Colors.labelTertiary}
                value={name}
                onChangeText={setName}
                autoFocus
              />
            </View>

            <Text style={styles.label}>Muscle group</Text>
            <View style={styles.chipGrid}>
              {MUSCLE_GROUPS.map(m => (
                <TouchableOpacity
                  key={m}
                  style={[styles.chip, muscle === m && styles.chipSelected]}
                  onPress={() => setMuscle(m)}
                >
                  <Text style={[styles.chipText, muscle === m && styles.chipTextSelected]}>{m}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Your experience</Text>
            <View style={styles.statusRow}>
              {STATUSES.map(s => (
                <TouchableOpacity
                  key={s}
                  style={[styles.statusBtn, status === s && styles.statusBtnSelected]}
                  onPress={() => setStatus(s)}
                >
                  <View style={[styles.statusDot, { backgroundColor: s === 'Comfortable' ? Colors.green : s === 'scanned' ? Colors.sky : Colors.amber }]} />
                  <Text style={[styles.statusText, status === s && styles.statusTextSelected]}>
                    {s === 'scanned' ? 'Just scanned' : s}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
              {loading ? <ActivityIndicator color={Colors.ink} /> : (
                <>
                  <Ionicons name="checkmark" size={20} color={Colors.ink} />
                  <Text style={styles.saveBtnText}>Save Machine</Text>
                </>
              )}
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F4F6F0' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: Colors.separator, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: '700', color: Colors.labelPrimary },
  closeBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#f2f2f7', alignItems: 'center', justifyContent: 'center' },
  scroll: { padding: 20, gap: 8 },
  label: { fontSize: 14, fontWeight: '600', color: Colors.labelSecondary, marginBottom: 8, marginTop: 12 },
  inputWrap: { backgroundColor: '#fff', borderRadius: 14, borderWidth: 1.5, borderColor: Colors.separator },
  input: { fontSize: 16, color: Colors.labelPrimary, padding: 14 },
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 100, backgroundColor: '#fff', borderWidth: 1.5, borderColor: Colors.separator },
  chipSelected: { backgroundColor: Colors.mist, borderColor: Colors.green },
  chipText: { fontSize: 14, fontWeight: '500', color: Colors.labelSecondary },
  chipTextSelected: { color: Colors.greenDeep, fontWeight: '600' },
  statusRow: { gap: 10 },
  statusBtn: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, borderRadius: 14, backgroundColor: '#fff', borderWidth: 1.5, borderColor: Colors.separator },
  statusBtnSelected: { borderColor: Colors.green, backgroundColor: Colors.mist2 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: 15, color: Colors.labelSecondary, fontWeight: '500' },
  statusTextSelected: { color: Colors.labelPrimary, fontWeight: '600' },
  saveBtn: { height: 54, borderRadius: 16, backgroundColor: Colors.lime, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 24 },
  saveBtnText: { fontSize: 17, fontWeight: '600', color: Colors.ink },
});

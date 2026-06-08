import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { doc, updateDoc } from 'firebase/firestore';
import { Colors } from '../../constants/colors';
import { StepDots } from '../../components/ui/StepDots';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/firebase';
import PressableScale from '../../components/PressableScale';
import * as haptics from '../../lib/haptics';

const GOALS = [
  { id: 'confident', label: 'Feel confident at the gym', icon: 'shield-checkmark-outline' as const },
  { id: 'learn', label: 'Learn how machines work', icon: 'bulb-outline' as const },
  { id: 'workouts', label: 'Build beginner workouts', icon: 'list-outline' as const },
  { id: 'legs', label: 'Train legs & glutes', icon: 'fitness-outline' as const },
  { id: 'upper', label: 'Train upper body & back', icon: 'body-outline' as const },
  { id: 'posture', label: 'Improve posture', icon: 'person-outline' as const },
];

export default function GoalsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    haptics.tap();
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  };

  const onContinue = () => {
    if (!selected.length) return;
    if (user) updateDoc(doc(db, 'users', user.uid), { goals: selected }).catch(() => {});
    router.push('/(onboarding)/camera-permission');
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={20} color={Colors.labelPrimary} />
          </TouchableOpacity>
          <StepDots total={4} current={2} />
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.eyebrow}>Your goals</Text>
          <Text style={styles.title}>What do you want help with?</Text>
          <Text style={styles.sub}>Pick anything that fits. You can change this later.</Text>

          <View style={styles.grid}>
            {GOALS.map(g => {
              const on = selected.includes(g.id);
              return (
                <PressableScale
                  key={g.id}
                  containerStyle={styles.tileWrap}
                  scaleTo={0.96}
                  style={[styles.tile, on && styles.tileSelected]}
                  onPress={() => toggle(g.id)}
                >
                  <View style={[styles.tileIcon, on && styles.tileIconSelected]}>
                    <Ionicons name={g.icon} size={21} color={on ? '#fff' : Colors.greenDeep} />
                  </View>
                  <Text style={[styles.tileLabel, on && styles.tileLabelSelected]}>{g.label}</Text>
                </PressableScale>
              );
            })}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.btn, !selected.length && styles.btnDisabled]}
            onPress={onContinue}
            activeOpacity={0.85}
          >
            <Text style={styles.btnText}>Continue {selected.length > 0 ? `(${selected.length})` : ''}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 18, paddingVertical: 8 },
  backBtn: { width: 38, height: 38, borderRadius: 12, backgroundColor: '#F2F2F7', alignItems: 'center', justifyContent: 'center' },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 22, paddingBottom: 20 },
  eyebrow: { fontSize: 12, fontWeight: '600', letterSpacing: 2, textTransform: 'uppercase', color: Colors.greenDeep, marginBottom: 10 },
  title: { fontSize: 27, fontWeight: '700', letterSpacing: -0.5, color: Colors.labelPrimary, marginBottom: 8 },
  sub: { fontSize: 15, color: Colors.labelSecondary, marginBottom: 22, lineHeight: 21 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 11 },
  tileWrap: { width: '47%', flexGrow: 1 },
  tile: {
    height: 116, borderRadius: 16, padding: 15,
    backgroundColor: '#fff', borderWidth: 1.5, borderColor: Colors.separator,
    justifyContent: 'space-between',
  },
  tileSelected: { borderColor: Colors.green, backgroundColor: Colors.mist },
  tileIcon: { width: 40, height: 40, borderRadius: 11, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  tileIconSelected: { backgroundColor: Colors.green },
  tileLabel: { fontSize: 14, fontWeight: '600', color: Colors.labelPrimary, letterSpacing: -0.2, lineHeight: 18 },
  tileLabelSelected: { color: Colors.greenDeep },
  footer: { paddingHorizontal: 22, paddingBottom: 20, borderTopWidth: 0.5, borderTopColor: Colors.separator, paddingTop: 12 },
  btn: { height: 56, borderRadius: 16, backgroundColor: Colors.green, alignItems: 'center', justifyContent: 'center' },
  btnDisabled: { opacity: 0.5 },
  btnText: { fontSize: 17, fontWeight: '600', color: '#fff', letterSpacing: -0.3 },
});

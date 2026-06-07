import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { doc, updateDoc } from 'firebase/firestore';
import { Colors } from '../../constants/colors';
import { StepDots } from '../../components/ui/StepDots';
import { SpotButton } from '../../components/ui/SpotButton';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/firebase';

const OPTIONS = [
  { id: 'new', label: "I'm completely new", sub: "I've barely touched the machines", icon: 'sparkles-outline' as const },
  { id: 'few', label: 'I know a few machines', sub: 'A handful feel familiar', icon: 'locate-outline' as const },
  { id: 'return', label: 'Returning after a break', sub: "I'm a little rusty", icon: 'time-outline' as const },
  { id: 'comfy', label: 'Comfortable, want guidance', sub: 'Help me use them better', icon: 'shield-outline' as const },
];

export default function ExperienceScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [selected, setSelected] = useState<string | null>(null);

  const onContinue = () => {
    if (user && selected) {
      updateDoc(doc(db, 'users', user.uid), { experienceLevel: selected }).catch(() => {});
    }
    router.push('/(onboarding)/goals');
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          {router.canGoBack() ? (
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Go back">
              <Ionicons name="chevron-back" size={20} color={Colors.labelPrimary} />
            </TouchableOpacity>
          ) : (
            <View style={styles.backBtn} />
          )}
          <StepDots total={4} current={1} />
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.eyebrow}>About you</Text>
          <Text style={styles.title}>How familiar are you with gym machines?</Text>
          <Text style={styles.sub}>We'll keep the language as simple as you need.</Text>

          <View style={styles.options}>
            {OPTIONS.map(opt => {
              const on = selected === opt.id;
              return (
                <TouchableOpacity
                  key={opt.id}
                  style={[styles.card, on && styles.cardSelected]}
                  onPress={() => setSelected(opt.id)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.iconWrap, on && styles.iconWrapSelected]}>
                    <Ionicons name={opt.icon} size={22} color={on ? '#fff' : Colors.greenDeep} />
                  </View>
                  <View style={styles.cardText}>
                    <Text style={[styles.cardLabel, on && styles.cardLabelSelected]}>{opt.label}</Text>
                    <Text style={[styles.cardSub, on && styles.cardSubSelected]}>{opt.sub}</Text>
                  </View>
                  <View style={[styles.radio, on && styles.radioSelected]}>
                    {on && <View style={styles.radioDot} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <SpotButton
            label="Continue"
            onPress={onContinue}
            disabled={!selected}
          />
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
  title: { fontSize: 27, fontWeight: '700', letterSpacing: -0.5, color: Colors.labelPrimary, marginBottom: 8, lineHeight: 33 },
  sub: { fontSize: 15, color: Colors.labelSecondary, marginBottom: 22, lineHeight: 21 },
  options: { gap: 11 },
  card: {
    flexDirection: 'row', alignItems: 'center', gap: 13,
    backgroundColor: '#fff', borderRadius: 16,
    padding: 14, borderWidth: 1.5, borderColor: Colors.separator,
  },
  cardSelected: { borderColor: Colors.green, backgroundColor: Colors.mist2 },
  iconWrap: { width: 44, height: 44, borderRadius: 12, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  iconWrapSelected: { backgroundColor: Colors.green },
  cardText: { flex: 1 },
  cardLabel: { fontSize: 16, fontWeight: '600', color: Colors.labelPrimary, letterSpacing: -0.2 },
  cardLabelSelected: { color: Colors.greenDeep },
  cardSub: { fontSize: 13, color: Colors.labelTertiary, marginTop: 2 },
  cardSubSelected: { color: Colors.greenDeep, opacity: 0.7 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: Colors.separator, alignItems: 'center', justifyContent: 'center' },
  radioSelected: { borderColor: Colors.green, backgroundColor: Colors.green },
  radioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff' },
  footer: { paddingHorizontal: 22, paddingBottom: 20, borderTopWidth: 0.5, borderTopColor: Colors.separator, paddingTop: 12, backgroundColor: 'rgba(255,255,255,0.95)' },
});

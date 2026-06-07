import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

// Launch-ready DRAFT copy ported from the design handoff (project/app/legal.jsx).
// Have a professional review this before submitting to the App Store.
const LEGAL: Record<string, {
  title: string; icon: keyof typeof Ionicons.glyphMap; updated: string; intro: string;
  sections: { h: string; p: string[] }[];
}> = {
  disclaimer: {
    title: 'Safety & disclaimer', icon: 'shield-outline', updated: 'Updated June 2026',
    intro: 'Spotter helps you learn how to use gym machines. It offers general fitness guidance — not medical, physiotherapy, or personal-training advice.',
    sections: [
      { h: 'Not medical advice', p: ['The guides, weights, reps, and suggestions in Spotter are general information for healthy adults. They are not a substitute for advice from a doctor, physiotherapist, or certified trainer.'] },
      { h: 'Check with a professional', p: ['Talk to a healthcare professional before starting any new exercise — especially if you are pregnant, recovering from injury or surgery, or have a heart condition, joint problem, or other medical concern.'] },
      { h: 'Listen to your body', p: ['Stop immediately if you feel sharp pain, dizziness, chest pain, or shortness of breath. Start with light weights, focus on control, and never train through pain.'] },
      { h: 'You train at your own risk', p: ['Exercise carries inherent risks. You are responsible for using equipment safely and within your ability. Spotter and its makers are not liable for injury or loss resulting from use of the app.'] },
    ],
  },
  privacy: {
    title: 'Privacy Policy', icon: 'lock-closed-outline', updated: 'Effective June 2026',
    intro: 'We built Spotter to be private by default. This explains what we collect, why, and the choices you have.',
    sections: [
      { h: 'Photos you scan', p: ['When you scan a machine, the photo is sent securely to our recognition service to identify the equipment, then deleted. We do not keep your scan photos or attach them to your identity.'] },
      { h: 'What we store', p: ['Your account details, saved machines, gyms, workout history, and progress are stored to power the app. Basic, anonymized usage data helps us fix bugs and improve guides.'] },
      { h: "What we don't do", p: ["We don't sell your data. We don't show third-party ads. We don't post anything on your behalf."] },
      { h: 'Service providers', p: ['We use trusted providers for image recognition, cloud storage, and payments. They process data only to provide their service to us, under contract.'] },
      { h: 'Your choices', p: ['You can delete your scan history or your entire account at any time from Settings → Privacy. Deleting your account removes your stored data.'] },
      { h: 'Contact', p: ['Questions about privacy? Email privacy@spotter.app.'] },
    ],
  },
  terms: {
    title: 'Terms of Service', icon: 'document-text-outline', updated: 'Effective June 2026',
    intro: 'By using Spotter you agree to these terms. Please read them — especially the parts about subscriptions and safety.',
    sections: [
      { h: 'Free trial & subscription', p: ["Spotter Premium starts with a 7-day free trial. If you don't cancel before it ends, it converts to the plan you chose: $2.99/month or $17.99/year, billing automatically until you cancel. Lifetime is a one-time $29.99 purchase with no renewal."] },
      { h: 'Billing & cancellation', p: ["Subscriptions are billed through your App Store account. Manage or cancel anytime in your device's subscription settings — at least 24 hours before a renewal to avoid the next charge. Trials and partial periods are non-refundable except where required by law."] },
      { h: 'Using Spotter', p: ["Use the app for your own personal fitness. Don't misuse, copy, or resell the content, and don't rely on it as medical advice (see the Safety & disclaimer)."] },
      { h: 'Guidance is provided “as is”', p: ["We work to keep guides accurate, but we can't guarantee results or that every instruction fits every machine model or body. You use the guidance at your own discretion and risk."] },
      { h: 'Changes', p: ["We may update these terms or the app over time. We'll note the effective date here, and significant changes will be highlighted in the app."] },
      { h: 'Contact', p: ['Questions? Email support@spotter.app.'] },
    ],
  },
};

export default function LegalScreen() {
  const router = useRouter();
  const { doc } = useLocalSearchParams<{ doc: string }>();
  const d = LEGAL[doc ?? 'disclaimer'] ?? LEGAL.disclaimer;

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color={Colors.labelPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>{d.title}</Text>
        </View>
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
          <View style={styles.titleRow}>
            <View style={styles.titleIcon}><Ionicons name={d.icon} size={24} color={Colors.greenDeep} /></View>
            <View>
              <Text style={styles.bigTitle}>{d.title}</Text>
              <Text style={styles.updated}>{d.updated}</Text>
            </View>
          </View>
          <Text style={styles.intro}>{d.intro}</Text>
          {d.sections.map((s, i) => (
            <View key={i} style={{ marginBottom: 18 }}>
              <Text style={styles.h3}>{s.h}</Text>
              {s.p.map((p, j) => <Text key={j} style={styles.para}>{p}</Text>)}
            </View>
          ))}
          {doc === 'disclaimer' && (
            <View style={styles.note}>
              <Ionicons name="information-circle-outline" size={18} color={Colors.greenDeep} style={{ marginTop: 1 }} />
              <Text style={styles.noteText}>If something hurts, stop and ask a professional. Confidence comes from doing things right, not pushing through pain.</Text>
            </View>
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
  headerTitle: { fontSize: 18, fontWeight: '700', color: Colors.labelPrimary, flex: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 13, marginBottom: 18 },
  titleIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  bigTitle: { fontSize: 20, fontWeight: '700', color: Colors.labelPrimary, letterSpacing: -0.3 },
  updated: { fontSize: 12, color: Colors.labelTertiary, marginTop: 4 },
  intro: { fontSize: 15, lineHeight: 22, color: Colors.labelSecondary, marginBottom: 22 },
  h3: { fontSize: 16, fontWeight: '700', color: Colors.labelPrimary, marginBottom: 8, letterSpacing: -0.2 },
  para: { fontSize: 14, lineHeight: 22, color: Colors.labelSecondary, marginBottom: 8 },
  note: { flexDirection: 'row', gap: 10, alignItems: 'flex-start', backgroundColor: Colors.mist, borderRadius: 14, padding: 14, marginTop: 4 },
  noteText: { flex: 1, fontSize: 13, lineHeight: 19, fontWeight: '500', color: Colors.greenInk },
});

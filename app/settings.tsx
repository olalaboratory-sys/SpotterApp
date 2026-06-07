import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch, Alert, ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Colors } from '../constants/colors';
import { useAuth, getDaysLeftInTrial } from '../context/AuthContext';
import { db } from '../lib/firebase';

const GOALS = ['Build strength', 'Lose weight', 'Feel confident', 'Stay active'];
const EXPERIENCE = ['New', 'Some', 'Confident'];
const UNITS = ['kg', 'lb'];

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.cardWrap}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const { user, userProfile } = useAuth();

  const [goal, setGoal] = useState(GOALS[2]);
  const [experience, setExperience] = useState(EXPERIENCE[0]);
  const [units, setUnits] = useState(UNITS[0]);
  const [reminders, setReminders] = useState(true);
  const [restAlerts, setRestAlerts] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [help, setHelp] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      if (user) {
        const snap = await getDoc(doc(db, 'users', user.uid)).catch(() => null);
        const d = snap?.data();
        if (d) {
          if (d.goal) setGoal(d.goal);
          if (d.experience) setExperience(d.experience);
          if (d.units) setUnits(d.units);
        }
      }
      const n = await AsyncStorage.getItem('spotter.notifs');
      if (n) { const v = JSON.parse(n); setReminders(v.reminders); setRestAlerts(v.restAlerts); }
      setLoaded(true);
    })();
  }, [user]);

  const saveProfile = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), { goal, experience, units });
      Alert.alert('Saved', 'Your fitness profile is updated.');
    } catch (e: any) { Alert.alert('Error', e.message); }
    finally { setSaving(false); }
  };

  const saveNotifs = (next: { reminders: boolean; restAlerts: boolean }) => {
    setReminders(next.reminders); setRestAlerts(next.restAlerts);
    AsyncStorage.setItem('spotter.notifs', JSON.stringify(next)).catch(() => {});
  };

  const daysLeft = getDaysLeftInTrial(userProfile?.trialStartedAt ?? null);
  const isTrial = userProfile?.subscriptionStatus === 'trial' && daysLeft > 0;

  const FAQ = [
    { q: 'How does scanning work?', a: 'Point your camera at a machine and tap capture. Spotter sends the photo to identify the machine, then shows a beginner guide. The photo is discarded after.' },
    { q: 'Do I need a gym membership?', a: 'No. You can scan or add machines anywhere — your gym, home, or a hotel — and save them into separate places.' },
    { q: 'Is my data private?', a: 'Yes. Scan photos are deleted after recognition and never sold. See the Privacy Policy for details.' },
  ];

  if (!loaded) {
    return <View style={[styles.screen, { alignItems: 'center', justifyContent: 'center' }]}><ActivityIndicator color={Colors.green} /></View>;
  }

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color={Colors.labelPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>Settings</Text>
        </View>

        <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 4, gap: 22 }}>
          <Card title="Fitness profile">
            <Text style={styles.label}>Main goal</Text>
            <View style={styles.pillWrap}>
              {GOALS.map(g => (
                <TouchableOpacity key={g} style={[styles.pill, goal === g && styles.pillActive]} onPress={() => setGoal(g)}>
                  <Text style={[styles.pillText, goal === g && styles.pillTextActive]}>{g}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.label}>Experience</Text>
            <View style={styles.segment}>
              {EXPERIENCE.map(e => (
                <TouchableOpacity key={e} style={[styles.segBtn, experience === e && styles.segBtnActive]} onPress={() => setExperience(e)}>
                  <Text style={[styles.segText, experience === e && styles.segTextActive]}>{e}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.label}>Units</Text>
            <View style={styles.segment}>
              {UNITS.map(u => (
                <TouchableOpacity key={u} style={[styles.segBtn, units === u && styles.segBtnActive]} onPress={() => setUnits(u)}>
                  <Text style={[styles.segText, units === u && styles.segTextActive]}>{u}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.saveBtn} onPress={saveProfile} disabled={saving}>
              {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveBtnText}>Save profile</Text>}
            </TouchableOpacity>
          </Card>

          <Card title="Notifications">
            <View style={styles.toggleRow}>
              <Text style={styles.rowLabel}>Workout reminders</Text>
              <Switch value={reminders} onValueChange={v => saveNotifs({ reminders: v, restAlerts })} trackColor={{ true: Colors.green }} />
            </View>
            <View style={[styles.toggleRow, styles.rowBorder]}>
              <Text style={styles.rowLabel}>Rest timer alerts</Text>
              <Switch value={restAlerts} onValueChange={v => saveNotifs({ reminders, restAlerts: v })} trackColor={{ true: Colors.green }} />
            </View>
          </Card>

          <Card title="Subscription">
            <TouchableOpacity style={styles.linkRow} onPress={() => router.push('/paywall')}>
              <View style={styles.linkIcon}><Ionicons name="flash-outline" size={18} color={Colors.greenDeep} /></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowLabel}>{isTrial ? `Trial — ${daysLeft} days left` : userProfile?.subscriptionStatus === 'active' ? 'Premium active' : 'Go Premium'}</Text>
                <Text style={styles.rowSub}>{isTrial ? 'Billing starts Day 7' : 'Manage your plan'}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Colors.labelTertiary} />
            </TouchableOpacity>
            <Text style={styles.fineprint}>Manage or cancel anytime in your device's App Store subscription settings.</Text>
          </Card>

          <Card title="Legal">
            {[
              { doc: 'disclaimer', label: 'Safety & disclaimer', icon: 'shield-outline' as const },
              { doc: 'privacy', label: 'Privacy Policy', icon: 'lock-closed-outline' as const },
              { doc: 'terms', label: 'Terms of Service', icon: 'document-text-outline' as const },
            ].map((l, i) => (
              <TouchableOpacity key={l.doc} style={[styles.linkRow, i > 0 && styles.rowBorder]} onPress={() => router.push({ pathname: '/legal/[doc]', params: { doc: l.doc } })}>
                <View style={styles.linkIcon}><Ionicons name={l.icon} size={18} color={Colors.greenDeep} /></View>
                <Text style={[styles.rowLabel, { flex: 1 }]}>{l.label}</Text>
                <Ionicons name="chevron-forward" size={18} color={Colors.labelTertiary} />
              </TouchableOpacity>
            ))}
          </Card>

          <Card title="Help & FAQ">
            {FAQ.map((f, i) => (
              <TouchableOpacity key={i} style={[styles.faqRow, i > 0 && styles.rowBorder]} onPress={() => setHelp(help === i ? null : i)} activeOpacity={0.7}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={[styles.rowLabel, { flex: 1 }]}>{f.q}</Text>
                  <Ionicons name={help === i ? 'chevron-up' : 'chevron-down'} size={18} color={Colors.labelTertiary} />
                </View>
                {help === i && <Text style={styles.faqAnswer}>{f.a}</Text>}
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={[styles.linkRow, styles.rowBorder]} onPress={() => Alert.alert('Contact support', 'Email us at support@spotter.app')}>
              <View style={styles.linkIcon}><Ionicons name="mail-outline" size={18} color={Colors.greenDeep} /></View>
              <Text style={[styles.rowLabel, { flex: 1 }]}>Contact support</Text>
              <Ionicons name="chevron-forward" size={18} color={Colors.labelTertiary} />
            </TouchableOpacity>
          </Card>
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
  cardWrap: { gap: 10 },
  cardTitle: { fontSize: 14, fontWeight: '700', color: Colors.labelSecondary, textTransform: 'uppercase', letterSpacing: 0.5, marginLeft: 4 },
  card: { backgroundColor: '#fff', borderRadius: 18, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 6 },
  label: { fontSize: 13, fontWeight: '600', color: Colors.labelSecondary, marginBottom: 8, marginTop: 8 },
  pillWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 100, backgroundColor: Colors.cloud, borderWidth: 1, borderColor: Colors.separator },
  pillActive: { backgroundColor: Colors.green, borderColor: Colors.green },
  pillText: { fontSize: 13, fontWeight: '600', color: Colors.labelSecondary },
  pillTextActive: { color: '#fff' },
  segment: { flexDirection: 'row', backgroundColor: '#e9e9ee', borderRadius: 12, padding: 3 },
  segBtn: { flex: 1, alignItems: 'center', paddingVertical: 9, borderRadius: 9 },
  segBtnActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3 },
  segText: { fontSize: 14, fontWeight: '600', color: Colors.labelSecondary },
  segTextActive: { color: Colors.labelPrimary },
  saveBtn: { height: 48, borderRadius: 14, backgroundColor: Colors.green, alignItems: 'center', justifyContent: 'center', marginTop: 18 },
  saveBtnText: { fontSize: 16, fontWeight: '700', color: '#fff' },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 },
  rowBorder: { borderTopWidth: 0.5, borderTopColor: Colors.separator },
  rowLabel: { fontSize: 16, fontWeight: '500', color: Colors.labelPrimary },
  rowSub: { fontSize: 12, color: Colors.labelSecondary, marginTop: 1 },
  linkRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13 },
  linkIcon: { width: 34, height: 34, borderRadius: 10, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  fineprint: { fontSize: 12, color: Colors.labelTertiary, marginTop: 8, lineHeight: 17 },
  faqRow: { paddingVertical: 13, gap: 8 },
  faqAnswer: { fontSize: 14, lineHeight: 21, color: Colors.labelSecondary },
});

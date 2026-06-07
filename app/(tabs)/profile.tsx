import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

const SETTINGS = [
  { icon: 'person-outline' as const, label: 'Edit fitness profile', sub: 'Goal · Experience · Preferences' },
  { icon: 'notifications-outline' as const, label: 'Notifications', sub: 'Reminders · Rest timer alerts' },
  { icon: 'camera-outline' as const, label: 'Camera & permissions', sub: '' },
  { icon: 'shield-outline' as const, label: 'Privacy', sub: '' },
  { icon: 'help-circle-outline' as const, label: 'Help center', sub: 'How scanning works · FAQ' },
];

export default function ProfileTab() {
  const router = useRouter();
  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
          {/* Premium card */}
          <View style={styles.section}>
            <TouchableOpacity style={styles.premiumCard} onPress={() => router.push('/paywall')} activeOpacity={0.9}>
              <View style={styles.premiumLeft}>
                <Text style={styles.premiumLabel}>Premium</Text>
                <Text style={styles.premiumTitle}>Trial active — 5 days left</Text>
                <Text style={styles.premiumSub}>Billing starts Day 7. Cancel anytime.</Text>
              </View>
              <View style={styles.premiumBadge}>
                <Ionicons name="flash" size={20} color={Colors.ink} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Progress summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Activity</Text>
            <View style={styles.progressRow}>
              {[{ n: '6', l: 'machines learned' }, { n: '3', l: 'workouts done' }, { n: 'Lvl 2', l: 'confidence' }].map(p => (
                <View key={p.l} style={styles.statCard}>
                  <Text style={styles.statNum}>{p.n}</Text>
                  <Text style={styles.statLabel}>{p.l}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Settings list */}
          <View style={[styles.section, { marginBottom: 8 }]}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <View style={styles.settingsList}>
              {SETTINGS.map((s, i) => (
                <TouchableOpacity key={s.label} style={[styles.settingsRow, i > 0 && styles.settingsRowBorder]} activeOpacity={0.7}>
                  <View style={styles.settingsIcon}>
                    <Ionicons name={s.icon} size={20} color={Colors.green} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.settingsLabel}>{s.label}</Text>
                    {s.sub ? <Text style={styles.settingsSub}>{s.sub}</Text> : null}
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={Colors.labelTertiary} />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <TouchableOpacity style={styles.signOutBtn}>
              <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F4F6F0' },
  header: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  title: { fontSize: 34, fontWeight: '700', letterSpacing: 0.4, color: Colors.labelPrimary },
  section: { paddingHorizontal: 20, marginBottom: 22 },
  sectionTitle: { fontSize: 19, fontWeight: '700', color: Colors.labelPrimary, marginBottom: 12, letterSpacing: -0.3 },
  premiumCard: { backgroundColor: Colors.green, borderRadius: 20, padding: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  premiumLeft: { gap: 3 },
  premiumLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 1.5, textTransform: 'uppercase', color: Colors.lime },
  premiumTitle: { fontSize: 17, fontWeight: '700', color: '#fff' },
  premiumSub: { fontSize: 13, color: 'rgba(255,255,255,0.75)' },
  premiumBadge: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.lime, alignItems: 'center', justifyContent: 'center' },
  progressRow: { flexDirection: 'row', gap: 12 },
  statCard: { flex: 1, backgroundColor: '#fff', borderRadius: 16, padding: 14, gap: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4 },
  statNum: { fontSize: 22, fontWeight: '700', color: Colors.labelPrimary, letterSpacing: -0.5 },
  statLabel: { fontSize: 11, color: Colors.labelSecondary },
  settingsList: { backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4 },
  settingsRow: { flexDirection: 'row', alignItems: 'center', gap: 13, padding: 14 },
  settingsRowBorder: { borderTopWidth: 0.5, borderTopColor: Colors.separator },
  settingsIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  settingsLabel: { fontSize: 16, fontWeight: '500', color: Colors.labelPrimary },
  settingsSub: { fontSize: 12, color: Colors.labelTertiary, marginTop: 1 },
  signOutBtn: { height: 52, borderRadius: 14, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4 },
  signOutText: { fontSize: 16, fontWeight: '500', color: '#FF3B30' },
});

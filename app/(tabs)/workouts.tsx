import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

const PRESETS = [
  { icon: 'body-outline' as const, title: 'Full Body Beginner', sub: '6 exercises · 35 min', tag: 'Starter' },
  { icon: 'arrow-up-outline' as const, title: 'Upper Body', sub: '5 exercises · 30 min', tag: 'Upper' },
  { icon: 'arrow-down-outline' as const, title: 'Lower Body & Glutes', sub: '5 exercises · 30 min', tag: 'Lower' },
  { icon: 'flash-outline' as const, title: 'Quick 15-min', sub: '3 exercises · 15 min', tag: 'Quick' },
];

export default function WorkoutsTab() {
  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Workouts</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
          {/* Build workout CTA */}
          <View style={styles.section}>
            <TouchableOpacity style={styles.buildCard} activeOpacity={0.85}>
              <View style={{ flex: 1 }}>
                <Text style={styles.buildTitle}>Build a workout</Text>
                <Text style={styles.buildSub}>Choose goal, time, and machines</Text>
              </View>
              <View style={styles.buildIcon}>
                <Ionicons name="add" size={28} color={Colors.green} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick start</Text>
            <View style={styles.presets}>
              {PRESETS.map(p => (
                <TouchableOpacity key={p.title} style={styles.presetCard} activeOpacity={0.8}>
                  <View style={styles.presetIcon}>
                    <Ionicons name={p.icon} size={22} color={Colors.greenDeep} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.presetTitle}>{p.title}</Text>
                    <Text style={styles.presetSub}>{p.sub}</Text>
                  </View>
                  <View style={styles.presetTag}>
                    <Text style={styles.presetTagText}>{p.tag}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent workouts</Text>
            <View style={styles.emptyCard}>
              <Ionicons name="barbell-outline" size={36} color={Colors.separator} />
              <Text style={styles.emptyText}>No workouts yet</Text>
              <Text style={styles.emptySub}>Complete your first workout to see it here.</Text>
            </View>
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
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionTitle: { fontSize: 19, fontWeight: '700', color: Colors.labelPrimary, marginBottom: 12, letterSpacing: -0.3 },
  buildCard: { backgroundColor: '#fff', borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
  buildTitle: { fontSize: 20, fontWeight: '700', color: Colors.labelPrimary, letterSpacing: -0.4 },
  buildSub: { fontSize: 14, color: Colors.labelSecondary, marginTop: 4 },
  buildIcon: { width: 52, height: 52, borderRadius: 16, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  presets: { gap: 10 },
  presetCard: { backgroundColor: '#fff', borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 13, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4 },
  presetIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  presetTitle: { fontSize: 16, fontWeight: '600', color: Colors.labelPrimary, letterSpacing: -0.2 },
  presetSub: { fontSize: 12, color: Colors.labelSecondary, marginTop: 2 },
  presetTag: { backgroundColor: Colors.mist, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  presetTagText: { fontSize: 11, fontWeight: '600', color: Colors.greenDeep },
  emptyCard: { backgroundColor: '#fff', borderRadius: 20, padding: 32, alignItems: 'center', gap: 8 },
  emptyText: { fontSize: 17, fontWeight: '600', color: Colors.labelSecondary },
  emptySub: { fontSize: 13, color: Colors.labelTertiary, textAlign: 'center' },
});

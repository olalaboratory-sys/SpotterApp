import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

export default function MyGymTab() {
  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.title}>My Places</Text>
          <TouchableOpacity style={styles.addBtn}>
            <Ionicons name="add" size={22} color={Colors.green} />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
          <View style={styles.section}>
            <View style={styles.gymCard}>
              <View style={styles.gymIcon}>
                <Ionicons name="business-outline" size={26} color={Colors.green} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.gymName}>My Gym</Text>
                <Text style={styles.gymSub}>12 machines saved</Text>
              </View>
              <TouchableOpacity style={styles.buildBtn}>
                <Text style={styles.buildBtnText}>Build workout</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>Machines</Text>
              <TouchableOpacity style={styles.addMachineBtn}>
                <Ionicons name="add" size={16} color={Colors.greenDeep} />
                <Text style={styles.addMachineText}>Add</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.emptyCard}>
              <Ionicons name="scan-outline" size={36} color={Colors.separator} />
              <Text style={styles.emptyText}>No machines yet</Text>
              <Text style={styles.emptySub}>Scan a machine to add it to your gym.</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F4F6F0' },
  header: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 34, fontWeight: '700', letterSpacing: 0.4, color: Colors.labelPrimary },
  addBtn: { width: 36, height: 36, borderRadius: 10, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  section: { paddingHorizontal: 20, marginBottom: 24 },
  gymCard: { backgroundColor: '#fff', borderRadius: 20, padding: 18, flexDirection: 'row', alignItems: 'center', gap: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
  gymIcon: { width: 52, height: 52, borderRadius: 16, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  gymName: { fontSize: 17, fontWeight: '700', color: Colors.labelPrimary },
  gymSub: { fontSize: 13, color: Colors.labelSecondary, marginTop: 2 },
  buildBtn: { backgroundColor: Colors.mist, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8 },
  buildBtnText: { fontSize: 13, fontWeight: '600', color: Colors.greenDeep },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 19, fontWeight: '700', color: Colors.labelPrimary, letterSpacing: -0.3 },
  addMachineBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  addMachineText: { fontSize: 14, fontWeight: '600', color: Colors.greenDeep },
  emptyCard: { backgroundColor: '#fff', borderRadius: 20, padding: 32, alignItems: 'center', gap: 8 },
  emptyText: { fontSize: 17, fontWeight: '600', color: Colors.labelSecondary },
  emptySub: { fontSize: 13, color: Colors.labelTertiary, textAlign: 'center' },
});

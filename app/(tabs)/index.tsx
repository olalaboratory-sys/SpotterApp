import React from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Dimensions, Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { iconForKey } from '../../constants/machineIcon';
import { useAuth } from '../../context/AuthContext';
import { usePlaces } from '../../context/PlacesContext';
import { useWorkouts } from '../../context/WorkoutsContext';

const { width } = Dimensions.get('window');

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function SectionHead({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <View style={styles.sectionHead}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action && <TouchableOpacity onPress={onAction}><Text style={styles.sectionAction}>{action}</Text></TouchableOpacity>}
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const { userProfile } = useAuth();
  const { current, currentMachines, recent, saved } = usePlaces();
  const { history } = useWorkouts();

  const firstName = userProfile?.displayName?.split(' ')[0] ?? 'there';

  const QUICK = [
    { icon: 'list-outline' as const, title: 'Beginner workout', sub: 'Build in 1 tap', onPress: () => router.push('/workout/builder') },
    { icon: 'business-outline' as const, title: current?.name ?? 'My place', sub: `${currentMachines.length} machines`, onPress: () => router.push('/(tabs)/my-gym') },
  ];

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.greeting}>{getGreeting()}, {firstName}</Text>
            <Text style={styles.tagline}>Ready to learn a machine?</Text>
          </View>
          <View style={styles.streak}>
            <Ionicons name="flame" size={16} color={Colors.amber} />
            <Text style={styles.streakNum}>{saved.length}</Text>
          </View>
        </View>

        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
          <View style={styles.heroWrap}>
            <TouchableOpacity style={styles.hero} onPress={() => router.push('/(tabs)/scan')} activeOpacity={0.9}>
              <LinearGradient colors={[Colors.ink2, Colors.ink]} style={StyleSheet.absoluteFill} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} />
              <View style={styles.heroCornerGraphic}><Ionicons name="scan-outline" size={28} color={Colors.lime} /></View>
              <View style={styles.heroContent}>
                <View style={styles.heroIconBox}><Ionicons name="scan-outline" size={28} color={Colors.ink} /></View>
                <Text style={styles.heroEyebrow}>Start here</Text>
                <Text style={styles.heroTitle}>Scan a machine</Text>
                <Text style={styles.heroBody}>Point your camera at any machine to get a beginner guide in seconds.</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <TouchableOpacity style={styles.addManual} activeOpacity={0.8} onPress={() => router.push('/add-machine')}>
              <Ionicons name="add-circle-outline" size={18} color={Colors.greenDeep} />
              <Text style={styles.addManualText}>Add a machine manually</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <View style={styles.quickGrid}>
              {QUICK.map(q => (
                <TouchableOpacity key={q.title} style={styles.quickCard} activeOpacity={0.8} onPress={q.onPress}>
                  <View style={styles.quickIcon}><Ionicons name={q.icon} size={20} color={Colors.greenDeep} /></View>
                  <Text style={styles.quickTitle} numberOfLines={1}>{q.title}</Text>
                  <Text style={styles.quickSub}>{q.sub}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={[styles.section, { paddingHorizontal: 0 }]}>
            <View style={{ paddingHorizontal: 20, marginBottom: 8 }}>
              <SectionHead title="Recently scanned" action={recent.length ? 'See all' : undefined} onAction={() => router.push('/library')} />
            </View>
            {recent.length === 0 ? (
              <View style={styles.emptyWrap}>
                <Ionicons name="barbell-outline" size={40} color={Colors.labelTertiary} />
                <Text style={styles.emptyTitle}>No machines saved yet</Text>
                <Text style={styles.emptySub}>Scan a machine or add one manually to get started.</Text>
                <TouchableOpacity style={styles.emptyBtn} onPress={() => router.push('/add-machine')}>
                  <Text style={styles.emptyBtnText}>Add your first machine</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 12, paddingBottom: 4 }}>
                {recent.map(m => (
                  <TouchableOpacity key={m.id} style={styles.recentCard} onPress={() => router.push({ pathname: '/guide/[key]', params: { key: m.key } })} activeOpacity={0.85}>
                    <View style={styles.recentImagePlaceholder}>
                      {m.photoUri
                        ? <Image source={{ uri: m.photoUri }} style={styles.recentPhoto} resizeMode="cover" />
                        : <Ionicons name={iconForKey(m.key)} size={36} color={Colors.green} />}
                    </View>
                    <View style={styles.recentInfo}>
                      <Text style={styles.recentName} numberOfLines={1}>{m.name}</Text>
                      <Text style={styles.recentMuscle} numberOfLines={1}>{m.cat}</Text>
                      <View style={styles.recentStatus}>
                        <View style={[styles.recentDot, { backgroundColor: m.status === 'Comfortable' ? Colors.green : m.status === 'Scanned' ? Colors.sky : Colors.amber }]} />
                        <Text style={styles.recentStatusText}>{m.status}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>

          <View style={styles.section}>
            <TouchableOpacity style={styles.browseRow} activeOpacity={0.85} onPress={() => router.push('/library')}>
              <View style={styles.browseIcon}><Ionicons name="library-outline" size={20} color={Colors.greenDeep} /></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.browseTitle}>Browse the machine library</Text>
                <Text style={styles.browseSub}>65 machines · by body area</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Colors.labelTertiary} />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <SectionHead title="Your progress" action="Details" onAction={() => router.push('/progress')} />
            <View style={styles.progressGrid}>
              {[
                { n: String(saved.length), label: 'machines\nsaved', icon: 'locate-outline' as const },
                { n: String(history.length), label: 'workouts\ndone', icon: 'barbell-outline' as const },
                { n: String(saved.filter(s => s.status === 'Comfortable').length), label: 'confident\nwith', icon: 'shield-checkmark-outline' as const },
              ].map(p => (
                <View key={p.label} style={styles.progressCard}>
                  <Ionicons name={p.icon} size={19} color={Colors.green} />
                  <Text style={styles.progressNum}>{p.n}</Text>
                  <Text style={styles.progressLabel}>{p.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F4F6F0' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 },
  greeting: { fontSize: 14, color: Colors.labelSecondary },
  tagline: { fontSize: 24, fontWeight: '700', letterSpacing: -0.5, color: Colors.labelPrimary, marginTop: 2 },
  streak: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 11, height: 34, borderRadius: 17, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6 },
  streakNum: { fontSize: 14, fontWeight: '700', color: Colors.labelPrimary },
  scroll: { flex: 1 },
  section: { paddingHorizontal: 20, marginBottom: 22 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 },
  sectionTitle: { fontSize: 19, fontWeight: '700', letterSpacing: -0.3, color: Colors.labelPrimary },
  sectionAction: { fontSize: 14, fontWeight: '600', color: Colors.greenDeep },
  heroWrap: { paddingHorizontal: 20, marginBottom: 12 },
  hero: { borderRadius: 24, overflow: 'hidden', padding: 22, shadowColor: '#000', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.22, shadowRadius: 30 },
  heroCornerGraphic: { position: 'absolute', right: 18, top: 18, opacity: 0.9 },
  heroContent: { gap: 0 },
  heroIconBox: { width: 50, height: 50, borderRadius: 15, backgroundColor: Colors.lime, alignItems: 'center', justifyContent: 'center', marginBottom: 52 },
  heroEyebrow: { fontSize: 12, fontWeight: '600', letterSpacing: 2, textTransform: 'uppercase', color: Colors.lime, marginBottom: 8 },
  heroTitle: { fontSize: 26, fontWeight: '700', color: '#fff', letterSpacing: -0.5 },
  heroBody: { fontSize: 14, color: 'rgba(223,247,231,0.62)', marginTop: 6, lineHeight: 20, maxWidth: 230 },
  addManual: { height: 46, borderRadius: 14, borderWidth: 1.5, borderColor: Colors.separator, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  addManualText: { fontSize: 15, fontWeight: '600', color: Colors.labelPrimary },
  quickGrid: { flexDirection: 'row', gap: 12 },
  quickCard: { flex: 1, backgroundColor: '#fff', borderRadius: 18, padding: 15, gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
  quickIcon: { width: 38, height: 38, borderRadius: 11, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  quickTitle: { fontSize: 15, fontWeight: '600', color: Colors.labelPrimary, letterSpacing: -0.2 },
  quickSub: { fontSize: 12, color: Colors.labelSecondary },
  emptyWrap: { alignItems: 'center', paddingVertical: 30, paddingHorizontal: 20, gap: 8 },
  emptyTitle: { fontSize: 16, fontWeight: '600', color: Colors.labelPrimary, marginTop: 8 },
  emptySub: { fontSize: 14, color: Colors.labelSecondary, textAlign: 'center', lineHeight: 20 },
  emptyBtn: { marginTop: 12, height: 42, paddingHorizontal: 20, borderRadius: 12, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: Colors.green },
  emptyBtnText: { fontSize: 14, fontWeight: '600', color: Colors.greenDeep },
  recentCard: { width: 150, backgroundColor: '#fff', borderRadius: 18, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
  recentImagePlaceholder: { height: 88, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  recentPhoto: { width: '100%', height: '100%' },
  recentInfo: { padding: 10, gap: 3 },
  recentName: { fontSize: 14, fontWeight: '600', color: Colors.labelPrimary, letterSpacing: -0.2 },
  recentMuscle: { fontSize: 12, color: Colors.labelSecondary },
  recentStatus: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 },
  recentDot: { width: 6, height: 6, borderRadius: 3 },
  recentStatusText: { fontSize: 11, color: Colors.labelSecondary, fontWeight: '500' },
  browseRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#fff', borderRadius: 16, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4 },
  browseIcon: { width: 40, height: 40, borderRadius: 11, backgroundColor: Colors.mist, alignItems: 'center', justifyContent: 'center' },
  browseTitle: { fontSize: 15, fontWeight: '600', color: Colors.labelPrimary, letterSpacing: -0.2 },
  browseSub: { fontSize: 12, color: Colors.labelSecondary, marginTop: 2 },
  progressGrid: { flexDirection: 'row', gap: 12 },
  progressCard: { flex: 1, backgroundColor: '#fff', borderRadius: 18, paddingHorizontal: 14, paddingVertical: 15, gap: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
  progressNum: { fontSize: 22, fontWeight: '700', color: Colors.labelPrimary, letterSpacing: -0.5 },
  progressLabel: { fontSize: 11, color: Colors.labelSecondary, lineHeight: 14 },
});

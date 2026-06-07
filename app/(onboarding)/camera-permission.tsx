import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCameraPermissions } from 'expo-camera';
import { Colors } from '../../constants/colors';
import { StepDots } from '../../components/ui/StepDots';

const PERKS = [
  { icon: 'lock-closed-outline' as const, label: 'Private by default' },
  { icon: 'flash-outline' as const, label: 'Instant identification' },
  { icon: 'shield-checkmark-outline' as const, label: 'Used only to recognize machines' },
];

export default function CameraPermissionScreen() {
  const router = useRouter();
  const [, requestPermission] = useCameraPermissions();

  const handleAllow = async () => {
    await requestPermission();
    router.replace('/paywall');
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#103a25', Colors.ink]} locations={[0, 0.55]} style={StyleSheet.absoluteFill} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={20} color="#fff" />
          </TouchableOpacity>
          <StepDots total={4} current={3} dark />
        </View>

        <View style={styles.content}>
          <View style={styles.iconWrap}>
            <View style={styles.iconBg} />
            <View style={styles.iconInner}>
              <Ionicons name="scan-outline" size={42} color={Colors.ink} />
            </View>
          </View>

          <Text style={styles.title}>Turn on your camera to scan machines</Text>
          <Text style={styles.body}>
            Photos are analyzed to identify equipment, then discarded. Nothing is shared, and you stay anonymous.
          </Text>

          <View style={styles.perks}>
            {PERKS.map(p => (
              <View key={p.label} style={styles.perkRow}>
                <View style={styles.perkIcon}>
                  <Ionicons name={p.icon} size={18} color={Colors.lime} />
                </View>
                <Text style={styles.perkLabel}>{p.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.btnLime} onPress={handleAllow} activeOpacity={0.85}>
            <Text style={styles.btnLimeText}>Allow camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnGhost} onPress={() => router.replace('/paywall')} activeOpacity={0.7}>
            <Text style={styles.btnGhostText}>Maybe later</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.ink },
  header: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 18, paddingVertical: 8 },
  backBtn: { width: 38, height: 38, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },
  content: { flex: 1, paddingHorizontal: 26, justifyContent: 'center', gap: 24 },
  iconWrap: { width: 112, height: 112, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  iconBg: { position: 'absolute', inset: 0, borderRadius: 32, backgroundColor: 'rgba(201,251,78,0.12)', borderWidth: 1, borderColor: 'rgba(201,251,78,0.25)' },
  iconInner: { width: 68, height: 68, borderRadius: 18, backgroundColor: Colors.lime, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 30, fontWeight: '700', letterSpacing: -0.7, color: '#fff', lineHeight: 36 },
  body: { fontSize: 16, lineHeight: 24, color: 'rgba(223,247,231,0.66)' },
  perks: { gap: 14 },
  perkRow: { flexDirection: 'row', alignItems: 'center', gap: 13 },
  perkIcon: { width: 34, height: 34, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },
  perkLabel: { fontSize: 15, color: 'rgba(223,247,231,0.86)', flex: 1 },
  footer: { paddingHorizontal: 26, paddingBottom: 12, gap: 12 },
  btnLime: { height: 56, borderRadius: 16, backgroundColor: Colors.lime, alignItems: 'center', justifyContent: 'center' },
  btnLimeText: { fontSize: 17, fontWeight: '600', color: Colors.ink, letterSpacing: -0.3 },
  btnGhost: { height: 50, alignItems: 'center', justifyContent: 'center' },
  btnGhostText: { fontSize: 16, color: 'rgba(223,247,231,0.7)' },
});

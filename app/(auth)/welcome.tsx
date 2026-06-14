import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#103a25', Colors.ink]}
        locations={[0, 0.55]}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          {/* Hero icon */}
          <View style={styles.heroWrap}>
            <View style={styles.heroPulse} />
            <View style={styles.heroIcon}>
              <Ionicons name="scan-outline" size={44} color={Colors.ink} />
            </View>
          </View>

          {/* Text block */}
          <View style={styles.textBlock}>
            <Text style={styles.eyebrow}>SPOTTER</Text>
            <Text style={styles.headline}>
              Never feel lost{'\n'}
              <Text style={styles.headlineLime}>at the gym.</Text>
            </Text>
            <Text style={styles.body}>
              Your private guide to gym equipment. Scan any machine and know exactly what to do — calm, instant, judgment-free.
            </Text>
          </View>
        </View>

        {/* CTAs */}
        <View style={styles.ctaWrap}>
          <TouchableOpacity
            style={styles.btnLime}
            onPress={() => router.push('/(auth)/signup')}
            activeOpacity={0.85}
          >
            <Ionicons name="flash" size={20} color={Colors.ink} style={{ marginRight: 8 }} />
            <Text style={styles.btnLimeText}>Get started — it's free</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnGhost}
            activeOpacity={0.7}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={styles.btnGhostText}>
              I already have an account <Text style={styles.btnGhostLink}>Sign in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.ink },
  safe: { flex: 1, paddingBottom: 8 },
  content: { flex: 1, justifyContent: 'center', gap: 30, paddingHorizontal: 28 },
  heroWrap: { width: 96, height: 96, position: 'relative', justifyContent: 'center', alignItems: 'center' },
  heroPulse: {
    position: 'absolute', top: -10, left: -10, right: -10, bottom: -10,
    borderRadius: 30, borderWidth: 1, borderColor: 'rgba(201,251,78,0.3)',
  },
  heroIcon: {
    width: 84, height: 84, borderRadius: 24, backgroundColor: Colors.lime,
    alignItems: 'center', justifyContent: 'center',
  },
  textBlock: { gap: 18, paddingRight: 8 },
  eyebrow: { fontSize: 13, fontWeight: '700', letterSpacing: 2.4, color: Colors.lime },
  headline: { fontSize: 40, fontWeight: '700', lineHeight: 46, letterSpacing: -1, color: '#fff' },
  headlineLime: { color: Colors.lime },
  body: { fontSize: 17, lineHeight: 25, color: 'rgba(231,236,245,0.66)' },
  ctaWrap: { paddingBottom: 12, gap: 6, paddingHorizontal: 28 },
  btnLime: {
    height: 56, borderRadius: 16, backgroundColor: Colors.lime,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
  },
  btnLimeText: { fontSize: 17, fontWeight: '600', color: Colors.ink, letterSpacing: -0.3 },
  btnGhost: { height: 50, alignItems: 'center', justifyContent: 'center' },
  btnGhostText: { fontSize: 15, color: 'rgba(223,247,231,0.7)' },
  btnGhostLink: { color: Colors.lime, fontWeight: '700' },
});

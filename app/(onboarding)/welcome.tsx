import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#103a25', Colors.ink]}
        locations={[0, 0.55]}
        style={StyleSheet.absoluteFill}
      />
      {/* Grid overlay */}
      <View style={styles.gridOverlay} pointerEvents="none" />

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
            <Text style={styles.eyebrow}>Spotter</Text>
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
            onPress={() => router.push('/(onboarding)/experience')}
            activeOpacity={0.85}
          >
            <Ionicons name="flash" size={20} color={Colors.ink} style={{ marginRight: 8 }} />
            <Text style={styles.btnLimeText}>Get started — it's free</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnGhost} activeOpacity={0.7}>
            <Text style={styles.btnGhostText}>I already have an account</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.ink },
  gridOverlay: {
    position: 'absolute',
    inset: 0,
    opacity: 0.35,
  },
  safe: { flex: 1, paddingHorizontal: 26 },
  content: { flex: 1, justifyContent: 'center', gap: 28, paddingTop: 20 },
  heroWrap: { width: 96, height: 96, position: 'relative', justifyContent: 'center', alignItems: 'center' },
  heroPulse: {
    position: 'absolute',
    inset: -10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(201,251,78,0.3)',
  },
  heroIcon: {
    width: 84,
    height: 84,
    borderRadius: 24,
    backgroundColor: Colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: { gap: 18 },
  eyebrow: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 2.2,
    textTransform: 'uppercase',
    color: Colors.lime,
  },
  headline: {
    fontSize: 40,
    fontWeight: '700',
    lineHeight: 44,
    letterSpacing: -1,
    color: '#fff',
  },
  headlineLime: { color: Colors.lime },
  body: {
    fontSize: 17,
    lineHeight: 25,
    color: 'rgba(231,236,245,0.66)',
    maxWidth: 300,
  },
  ctaWrap: { paddingBottom: 12, gap: 12 },
  btnLime: {
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.lime,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLimeText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.ink,
    letterSpacing: -0.3,
  },
  btnGhost: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnGhostText: {
    fontSize: 16,
    color: 'rgba(223,247,231,0.7)',
  },
});

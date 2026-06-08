import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, TouchableOpacity,
  ScrollView, NativeScrollEvent, NativeSyntheticEvent, ActivityIndicator, Alert, Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { useAuth } from '../context/AuthContext';
import { purchasePlan, restorePurchases, PlanId } from '../lib/purchases';
import PressableScale from '../components/PressableScale';
import * as haptics from '../lib/haptics';

/** A benefit row that fades + slides in on mount, staggered by index. */
function BenefitRow({ icon, title, sub, index }: { icon: keyof typeof Ionicons.glyphMap; title: string; sub: string; index: number }) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, { toValue: 1, duration: 380, delay: 120 + index * 90, useNativeDriver: true }).start();
  }, []);
  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [12, 0] });
  return (
    <Animated.View style={[styles.benefitRow, { opacity: anim, transform: [{ translateY }] }]}>
      <View style={styles.benefitIcon}>
        <Ionicons name={icon} size={18} color={Colors.lime} />
      </View>
      <View style={styles.benefitText}>
        <Text style={styles.benefitTitle}>{title}</Text>
        <Text style={styles.benefitSub}>{sub}</Text>
      </View>
    </Animated.View>
  );
}

const PLANS = [
  { id: 'monthly', name: 'Monthly', price: '$2.99', per: '/mo', sub: 'Billed monthly', trial: true },
  { id: 'yearly', name: 'Yearly', price: '$17.99', per: '/yr', orig: '$35.88', off: '50% OFF', sub: 'Just $1.50/mo · billed yearly', badge: 'POPULAR', trial: true },
  { id: 'lifetime', name: 'Lifetime', price: '$29.99', per: 'once', orig: '$49.99', off: '40% OFF', sub: 'Pay once — yours forever', badge: 'BEST VALUE', trial: false },
];

const BENEFITS = [
  { icon: 'scan-outline' as const, title: '100 machine scans a day', sub: 'Plenty for any gym session (free: 10/day)' },
  { icon: 'list-outline' as const, title: 'Personalized machine workouts', sub: 'Built from the machines at your gym' },
  { icon: 'bookmark-outline' as const, title: 'Offline machine guides', sub: 'Works even with no signal at the gym' },
  { icon: 'locate-outline' as const, title: 'Full progress tracking', sub: 'Confidence, weights, history' },
  { icon: 'business-outline' as const, title: 'Unlimited saved gyms', sub: 'Home, school, hotel — all of them' },
];

const TRIAL = [
  { icon: 'checkmark-circle-outline' as const, day: 'Today', desc: 'Full access unlocks. Explore every Premium feature, free.', color: Colors.green },
  { icon: 'information-circle-outline' as const, day: 'Day 5', desc: "We'll send a reminder that your trial is ending soon.", color: Colors.amber },
  { icon: 'star-outline' as const, day: 'Day 7', desc: 'Your subscription begins. Cancel anytime before this.', color: Colors.sky },
];

export default function PaywallScreen() {
  const router = useRouter();
  const { startTrial, activateSubscription } = useAuth();
  const [plan, setPlan] = useState('monthly');
  const [seen, setSeen] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleStartTrial = async () => {
    if (!seen) return;
    setSaving(true);
    try {
      const res = await purchasePlan(plan as PlanId);
      // Lifetime is an immediate purchase → activate now; subscriptions start a trial.
      if (res.success) await (plan === 'lifetime' ? activateSubscription(plan) : startTrial(plan));
      router.replace('/(tabs)');
    } catch {
      router.replace('/(tabs)');
    } finally {
      setSaving(false);
    }
  };

  const handleRestore = async () => {
    const res = await restorePurchases();
    Alert.alert(
      res.restored ? 'Purchases restored' : 'Nothing to restore',
      res.restored ? 'Your Premium access is active again.' : "We couldn't find a previous purchase for this Apple ID.",
    );
  };

  const onLegal = (label: string) => {
    if (label === 'Restore') return handleRestore();
    router.push({ pathname: '/legal/[doc]', params: { doc: label === 'Terms' ? 'terms' : 'privacy' } });
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 90) setSeen(true);
  };

  const currentPlan = PLANS.find(p => p.id === plan)!;

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#113a25', Colors.ink]} locations={[0, 0.55]} style={StyleSheet.absoluteFill} />
      <View style={styles.gridOverlay} />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.grabHandle} />
        {/* Close */}
        <View style={styles.closeRow}>
          <TouchableOpacity style={styles.closeBtn} onPress={handleStartTrial} activeOpacity={0.8} accessibilityRole="button" accessibilityLabel="Close">
            <Ionicons name="close" size={18} color="rgba(255,255,255,0.8)" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          onLayout={() => setSeen(false)}
        >
          {/* Hero */}
          <View style={styles.hero}>
            <View style={styles.badge}>
              <Ionicons name="flash" size={14} color={Colors.lime} />
              <Text style={styles.badgeText}>7 days free</Text>
            </View>
            <Text style={styles.heroTitle}>
              Learn every machine with{' '}
              <Text style={styles.heroLime}>Premium</Text>
            </Text>
            <Text style={styles.heroSub}>
              Try everything free for 7 days. Cancel anytime — no charge if you cancel before it ends.
            </Text>
          </View>

          {/* Benefits */}
          <View style={styles.benefits}>
            {BENEFITS.map((b, i) => (
              <BenefitRow key={b.title} icon={b.icon} title={b.title} sub={b.sub} index={i} />
            ))}
          </View>

          <View style={styles.scanNote}>
            <Ionicons name="information-circle-outline" size={15} color={Colors.lime} />
            <Text style={styles.scanNoteText}>Free & trial: 10 machine scans/day · Premium: 100/day</Text>
          </View>

          {/* Trial timeline */}
          <View style={styles.timeline}>
            <Text style={styles.timelineTitle}>How your free trial works</Text>
            {TRIAL.map((t, i) => (
              <View key={t.day} style={styles.trialRow}>
                <View style={styles.trialLeft}>
                  <View style={[styles.trialDot, { backgroundColor: t.color }]}>
                    <Ionicons name={t.icon} size={16} color="#fff" />
                  </View>
                  {i < TRIAL.length - 1 && <View style={styles.trialLine} />}
                </View>
                <View style={styles.trialInfo}>
                  <Text style={styles.trialDay}>{t.day}</Text>
                  <Text style={styles.trialDesc}>{t.desc}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Plans */}
          <View style={styles.plans}>
            {PLANS.map(p => {
              const on = plan === p.id;
              return (
                <PressableScale
                  key={p.id}
                  scaleTo={0.98}
                  style={[styles.planCard, on && styles.planCardSelected]}
                  onPress={() => { if (!on) haptics.tap(); setPlan(p.id); }}
                >
                  {p.badge && (
                    <View style={styles.planBadge}>
                      <Text style={styles.planBadgeText}>{p.badge}</Text>
                    </View>
                  )}
                  <View style={[styles.planRadio, on && styles.planRadioSelected]}>
                    {on && <Ionicons name="checkmark" size={12} color="#fff" />}
                  </View>
                  <View style={styles.planInfo}>
                    <View style={styles.planNameRow}>
                      <Text style={styles.planName}>{p.name}</Text>
                      {p.off && <Text style={styles.planOff}>{p.off}</Text>}
                    </View>
                    <Text style={styles.planSub}>{p.sub}</Text>
                  </View>
                  <View style={styles.planPrice}>
                    {p.orig && <Text style={styles.planOrig}>{p.orig}</Text>}
                    <View style={styles.planPriceRow}>
                      <Text style={styles.planPriceMain}>{p.price}</Text>
                      <Text style={styles.planPer}>{p.per}</Text>
                    </View>
                  </View>
                </PressableScale>
              );
            })}
          </View>
        </ScrollView>

        {/* Sticky CTA */}
        <View style={styles.cta}>
          <TouchableOpacity
            style={[styles.ctaBtn, !seen && styles.ctaBtnDimmed]}
            onPress={handleStartTrial}
            activeOpacity={0.85}
          >
            {saving
              ? <ActivityIndicator color={Colors.ink} style={{ marginRight: 8 }} />
              : <Ionicons name={seen ? 'flash' : 'chevron-down'} size={19} color={Colors.ink} style={{ marginRight: 8 }} />
            }
            <Text style={styles.ctaBtnText}>
              {!seen ? 'Scroll to see plans' : currentPlan.trial ? 'Start my 7-day free trial' : 'Unlock lifetime access'}
            </Text>
          </TouchableOpacity>
          <Text style={styles.ctaDisclosure}>
            {!seen
              ? 'Review your plan options above before continuing.'
              : currentPlan.trial
              ? `Free for 7 days, then ${currentPlan.price}${currentPlan.per === '/yr' ? '/year' : '/month'}. Renews automatically until canceled.`
              : `One-time payment of ${currentPlan.price}. No subscription and no renewals — yours forever.`}
          </Text>
          <View style={styles.legalRow}>
            {['Restore', 'Terms', 'Privacy'].map(l => (
              <TouchableOpacity key={l} style={styles.legalBtn} onPress={() => onLegal(l)}>
                <Text style={styles.legalText}>{l}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.ink },
  gridOverlay: { position: 'absolute', inset: 0, opacity: 0.3 },
  grabHandle: { alignSelf: 'center', width: 40, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.25)', marginTop: 8 },
  closeRow: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 16, paddingTop: 4 },
  closeBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 22, paddingBottom: 16 },
  hero: { alignItems: 'center', paddingBottom: 22, gap: 12 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 6, height: 30, paddingHorizontal: 13, borderRadius: 15, backgroundColor: 'rgba(201,251,78,0.14)' },
  badgeText: { fontSize: 13, fontWeight: '600', color: Colors.lime },
  heroTitle: { fontSize: 30, fontWeight: '700', letterSpacing: -0.7, color: '#fff', textAlign: 'center', lineHeight: 36 },
  heroLime: { color: Colors.lime },
  heroSub: { fontSize: 15, color: 'rgba(223,247,231,0.66)', textAlign: 'center', lineHeight: 22, maxWidth: 290 },
  benefits: { gap: 14, paddingBottom: 16 },
  scanNote: { flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: 'rgba(201,251,78,0.1)', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 22 },
  scanNoteText: { flex: 1, fontSize: 12, fontWeight: '600', color: 'rgba(231,236,245,0.85)' },
  benefitRow: { flexDirection: 'row', gap: 13, alignItems: 'flex-start' },
  benefitIcon: { width: 34, height: 34, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.07)', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  benefitText: { flex: 1 },
  benefitTitle: { fontSize: 15, fontWeight: '600', color: '#fff', lineHeight: 20 },
  benefitSub: { fontSize: 13, color: 'rgba(223,247,231,0.6)', marginTop: 2 },
  timeline: { borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', padding: 18, marginBottom: 22 },
  timelineTitle: { fontSize: 15, fontWeight: '700', color: '#fff', marginBottom: 16 },
  trialRow: { flexDirection: 'row', gap: 13 },
  trialLeft: { alignItems: 'center', width: 30 },
  trialDot: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  trialLine: { width: 2, flex: 1, minHeight: 22, backgroundColor: 'rgba(255,255,255,0.12)', marginVertical: 4 },
  trialInfo: { flex: 1, paddingTop: 4, paddingBottom: 10 },
  trialDay: { fontSize: 14, fontWeight: '600', color: '#fff' },
  trialDesc: { fontSize: 13, color: 'rgba(223,247,231,0.6)', marginTop: 4, lineHeight: 18 },
  plans: { gap: 13, paddingTop: 4 },
  planCard: {
    flexDirection: 'row', alignItems: 'center', gap: 13,
    padding: 15, borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.16)',
    position: 'relative',
  },
  planCardSelected: { borderColor: Colors.green, backgroundColor: 'rgba(17,185,100,0.12)' },
  planBadge: { position: 'absolute', top: -9, left: 44, backgroundColor: Colors.lime, paddingHorizontal: 7, paddingVertical: 4, borderRadius: 6 },
  planBadgeText: { fontSize: 10, fontWeight: '700', color: '#0a1f12', letterSpacing: 0.5 },
  planRadio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  planRadioSelected: { borderColor: Colors.green, backgroundColor: Colors.green },
  planInfo: { flex: 1 },
  planNameRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  planName: { fontSize: 16, fontWeight: '600', color: '#fff' },
  planOff: { fontSize: 11, fontWeight: '700', color: Colors.lime },
  planSub: { fontSize: 12, color: 'rgba(223,247,231,0.6)', marginTop: 4 },
  planPrice: { alignItems: 'flex-end', flexShrink: 0 },
  planOrig: { fontSize: 12, color: 'rgba(223,247,231,0.6)', textDecorationLine: 'line-through', marginBottom: 3 },
  planPriceRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 2 },
  planPriceMain: { fontSize: 19, fontWeight: '700', color: '#fff' },
  planPer: { fontSize: 11, color: 'rgba(223,247,231,0.6)', marginBottom: 2 },
  cta: { paddingHorizontal: 22, paddingBottom: 8, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)', paddingTop: 14, backgroundColor: 'rgba(7,20,13,0.85)' },
  ctaBtn: { height: 56, borderRadius: 16, backgroundColor: Colors.lime, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  ctaBtnDimmed: { opacity: 0.5 },
  ctaBtnText: { fontSize: 17, fontWeight: '600', color: Colors.ink, letterSpacing: -0.3 },
  ctaDisclosure: { fontSize: 11, color: 'rgba(223,247,231,0.55)', textAlign: 'center', marginTop: 11, lineHeight: 16 },
  legalRow: { flexDirection: 'row', justifyContent: 'center', gap: 18, marginTop: 10 },
  legalBtn: { paddingVertical: 6 },
  legalText: { fontSize: 12, color: 'rgba(223,247,231,0.5)', fontWeight: '500' },
});

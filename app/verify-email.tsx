import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { useAuth } from '../context/AuthContext';

export default function VerifyEmailScreen() {
  const { user, resendVerification, reloadUser, signOut } = useAuth();
  const [checking, setChecking] = useState(false);
  const [resent, setResent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Quietly re-check verification while this screen is open, so the user moves on
  // the moment they click the link in their inbox (no button press needed).
  useEffect(() => {
    const poll = setInterval(() => { reloadUser().catch(() => {}); }, 4000);
    return () => clearInterval(poll);
  }, [reloadUser]);

  // Resend cooldown countdown.
  useEffect(() => {
    if (cooldown <= 0) return;
    timer.current = setInterval(() => setCooldown(c => Math.max(0, c - 1)), 1000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [cooldown]);

  const onCheck = async () => {
    setChecking(true);
    try {
      const verified = await reloadUser();
      if (!verified) {
        Alert.alert('Almost there', "We can't see the confirmation yet. Tap the link in the email, then try again.");
      }
      // If verified, the root guard navigates onward automatically.
    } catch (e: any) {
      Alert.alert('Error', e?.message ?? 'Could not check status.');
    } finally {
      setChecking(false);
    }
  };

  const onResend = async () => {
    try {
      await resendVerification();
      setResent(true);
      setCooldown(30);
    } catch (e: any) {
      Alert.alert('Could not resend', e?.message ?? 'Please try again in a moment.');
    }
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          <View style={styles.iconWrap}>
            <Ionicons name="mail-unread-outline" size={40} color={Colors.greenDeep} />
          </View>

          <Text style={styles.title}>Confirm your email</Text>
          <Text style={styles.body}>
            We sent a confirmation link to{'\n'}
            <Text style={styles.email}>{user?.email ?? 'your email'}</Text>.
          </Text>
          <Text style={styles.hint}>
            Open it and tap the link. This screen updates on its own once you do —
            check your spam folder if it's not there.
          </Text>

          <TouchableOpacity style={styles.primaryBtn} onPress={onCheck} activeOpacity={0.85} disabled={checking}>
            {checking ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryBtnText}>I've confirmed — continue</Text>}
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn} onPress={onResend} activeOpacity={0.7} disabled={cooldown > 0}>
            <Text style={[styles.secondaryBtnText, cooldown > 0 && styles.disabledText]}>
              {cooldown > 0 ? `Resend email (${cooldown}s)` : resent ? 'Resend email again' : 'Resend email'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signOut} onPress={() => signOut()} activeOpacity={0.7}>
          <Text style={styles.signOutText}>Use a different account</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F4F6F0' },
  safe: { flex: 1, paddingHorizontal: 28 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  iconWrap: {
    width: 84, height: 84, borderRadius: 24, backgroundColor: Colors.mist,
    alignItems: 'center', justifyContent: 'center', marginBottom: 24,
  },
  title: { fontSize: 28, fontWeight: '700', color: Colors.labelPrimary, letterSpacing: -0.5, marginBottom: 12, textAlign: 'center' },
  body: { fontSize: 16, color: Colors.labelSecondary, textAlign: 'center', lineHeight: 23 },
  email: { fontWeight: '700', color: Colors.labelPrimary },
  hint: { fontSize: 14, color: Colors.labelTertiary, textAlign: 'center', lineHeight: 20, marginTop: 14, marginBottom: 32, paddingHorizontal: 6 },
  primaryBtn: { alignSelf: 'stretch', height: 54, borderRadius: 16, backgroundColor: Colors.green, alignItems: 'center', justifyContent: 'center' },
  primaryBtnText: { fontSize: 17, fontWeight: '600', color: '#fff', letterSpacing: -0.3 },
  secondaryBtn: { height: 50, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  secondaryBtnText: { fontSize: 15, fontWeight: '600', color: Colors.greenDeep },
  disabledText: { color: Colors.labelTertiary },
  signOut: { alignItems: 'center', paddingVertical: 16 },
  signOutText: { fontSize: 14, color: Colors.labelTertiary, fontWeight: '500' },
});

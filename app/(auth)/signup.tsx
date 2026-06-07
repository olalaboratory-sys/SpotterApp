import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as WebBrowser from 'expo-web-browser';
import * as Crypto from 'expo-crypto';
import { Colors } from '../../constants/colors';
import { useAuth } from '../../context/AuthContext';
import { googleWebClientId, googleIosClientId } from '../../lib/firebaseConfig';

WebBrowser.maybeCompleteAuthSession();

export default function SignupScreen() {
  const router = useRouter();
  const { signUpWithEmail, handleGoogleCredential, handleAppleCredential } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [googleRequest, googleResponse, googlePromptAsync] = Google.useAuthRequest({
    clientId: googleWebClientId,
    iosClientId: googleIosClientId,
  });

  useEffect(() => {
    if (googleResponse?.type === 'success') {
      const { id_token } = googleResponse.params;
      if (id_token) {
        setGoogleLoading(true);
        handleGoogleCredential(id_token)
          .catch(err => Alert.alert('Google Error', err.message))
          .finally(() => setGoogleLoading(false));
      }
    }
  }, [googleResponse]);

  const handleSignUp = async () => {
    if (!name.trim()) return Alert.alert('Missing info', 'Please enter your name.');
    if (!email || !password) return Alert.alert('Missing info', 'Please fill in all fields.');
    if (password.length < 6) return Alert.alert('Weak password', 'Password must be at least 6 characters.');
    setLoading(true);
    try {
      await signUpWithEmail(name.trim(), email.trim(), password);
    } catch (err: any) {
      const msg = err.code === 'auth/email-already-in-use'
        ? 'This email is already registered. Try signing in.'
        : err.message;
      Alert.alert('Sign-up failed', msg);
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignUp = async () => {
    try {
      const nonce = Math.random().toString(36).substring(2, 18);
      const hashedNonce = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, nonce);
      const cred = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        nonce: hashedNonce,
      });
      if (cred.identityToken) {
        await handleAppleCredential(cred.identityToken, nonce);
      }
    } catch (err: any) {
      if (err.code !== 'ERR_REQUEST_CANCELED') {
        Alert.alert('Apple Sign-In Error', err.message);
      }
    }
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
            <View style={styles.logoWrap}>
              <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={20} color={Colors.labelPrimary} />
              </TouchableOpacity>
              <View style={styles.logoIcon}>
                <Ionicons name="scan-outline" size={26} color={Colors.ink} />
              </View>
              <Text style={styles.logoText}>Spotter</Text>
            </View>

            <Text style={styles.title}>Create account</Text>
            <Text style={styles.sub}>Start your 7-day free trial today.</Text>

            <View style={styles.form}>
              <View style={styles.inputWrap}>
                <Ionicons name="person-outline" size={18} color={Colors.labelTertiary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Your name"
                  placeholderTextColor={Colors.labelTertiary}
                  autoCapitalize="words"
                  value={name}
                  onChangeText={setName}
                />
              </View>
              <View style={styles.inputWrap}>
                <Ionicons name="mail-outline" size={18} color={Colors.labelTertiary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor={Colors.labelTertiary}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
              <View style={styles.inputWrap}>
                <Ionicons name="lock-closed-outline" size={18} color={Colors.labelTertiary} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Password (min. 6 characters)"
                  placeholderTextColor={Colors.labelTertiary}
                  secureTextEntry={!showPw}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPw(v => !v)} style={styles.eyeBtn}>
                  <Ionicons name={showPw ? 'eye-off-outline' : 'eye-outline'} size={18} color={Colors.labelTertiary} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.primaryBtn} onPress={handleSignUp} activeOpacity={0.85}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryBtnText}>Create Account</Text>}
              </TouchableOpacity>
            </View>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialRow}>
              <TouchableOpacity
                style={styles.socialBtn}
                onPress={() => googlePromptAsync()}
                disabled={!googleRequest || googleLoading}
                activeOpacity={0.8}
              >
                {googleLoading
                  ? <ActivityIndicator size="small" color={Colors.labelPrimary} />
                  : <>
                    <Text style={styles.googleG}>G</Text>
                    <Text style={styles.socialBtnText}>Google</Text>
                  </>
                }
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialBtn, styles.appleBtn]} onPress={handleAppleSignUp} activeOpacity={0.8}>
                <Ionicons name="logo-apple" size={18} color="#fff" />
                <Text style={[styles.socialBtnText, { color: '#fff' }]}>Apple</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.bottomRow}>
              <Text style={styles.bottomText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                <Text style={styles.bottomLink}>Sign In</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.legal}>
              By creating an account you agree to our Terms of Service and Privacy Policy.
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F4F6F0' },
  scroll: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40 },
  logoWrap: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 36 },
  backBtn: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4 },
  logoIcon: { width: 40, height: 40, borderRadius: 11, backgroundColor: Colors.lime, alignItems: 'center', justifyContent: 'center' },
  logoText: { fontSize: 22, fontWeight: '700', color: Colors.labelPrimary, letterSpacing: -0.5 },
  title: { fontSize: 30, fontWeight: '700', color: Colors.labelPrimary, letterSpacing: -0.6, marginBottom: 6 },
  sub: { fontSize: 16, color: Colors.labelSecondary, marginBottom: 28 },
  form: { gap: 12 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, borderWidth: 1.5, borderColor: Colors.separator, height: 52 },
  inputIcon: { marginLeft: 14, marginRight: 4 },
  input: { flex: 1, fontSize: 16, color: Colors.labelPrimary, paddingHorizontal: 8 },
  eyeBtn: { padding: 14 },
  primaryBtn: { height: 54, borderRadius: 16, backgroundColor: Colors.green, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  primaryBtnText: { fontSize: 17, fontWeight: '600', color: '#fff', letterSpacing: -0.3 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 22 },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.separator },
  dividerText: { fontSize: 13, color: Colors.labelTertiary, fontWeight: '500' },
  socialRow: { flexDirection: 'row', gap: 12 },
  socialBtn: { flex: 1, height: 52, borderRadius: 14, backgroundColor: '#fff', borderWidth: 1.5, borderColor: Colors.separator, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  appleBtn: { backgroundColor: '#000', borderColor: '#000' },
  googleG: { fontSize: 18, fontWeight: '700', color: '#4285F4', fontFamily: 'serif' },
  socialBtnText: { fontSize: 15, fontWeight: '600', color: Colors.labelPrimary },
  bottomRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 28 },
  bottomText: { fontSize: 15, color: Colors.labelSecondary },
  bottomLink: { fontSize: 15, fontWeight: '700', color: Colors.greenDeep },
  legal: { fontSize: 12, color: Colors.labelTertiary, textAlign: 'center', marginTop: 16, lineHeight: 17 },
});

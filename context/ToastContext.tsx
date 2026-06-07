import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

export type ToastType = 'error' | 'success' | 'info';
type Toast = { message: string; type: ToastType };

type Ctx = { showToast: (message: string, type?: ToastType) => void };
const ToastContext = createContext<Ctx | null>(null);

const CONFIG: Record<ToastType, { bg: string; accent: string; icon: keyof typeof Ionicons.glyphMap }> = {
  error: { bg: '#2a1416', accent: '#FF6B6B', icon: 'alert-circle' },
  success: { bg: Colors.ink, accent: Colors.green, icon: 'checkmark-circle' },
  info: { bg: Colors.ink, accent: Colors.lime, icon: 'information-circle' },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const translateY = useRef(new Animated.Value(-140)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hide = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, { toValue: -140, duration: 200, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start(() => setToast(null));
  }, [translateY, opacity]);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    setToast({ message, type });
    if (timer.current) clearTimeout(timer.current);
    Animated.parallel([
      Animated.spring(translateY, { toValue: 0, useNativeDriver: true, bounciness: 6, speed: 14 }),
      Animated.timing(opacity, { toValue: 1, duration: 180, useNativeDriver: true }),
    ]).start();
    timer.current = setTimeout(hide, 3200);
  }, [translateY, opacity, hide]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const cfg = CONFIG[toast?.type ?? 'info'];

  return (
    <ToastContext.Provider value={{ showToast }}>
      <View style={{ flex: 1 }}>
        {children}
        {toast && (
          <Animated.View pointerEvents="none" style={[styles.wrap, { opacity, transform: [{ translateY }] }]}>
            <SafeAreaView>
              <View style={[styles.toast, { backgroundColor: cfg.bg, borderColor: cfg.accent }]}>
                <Ionicons name={cfg.icon} size={20} color={cfg.accent} />
                <Text style={styles.text} numberOfLines={2}>{toast.message}</Text>
              </View>
            </SafeAreaView>
          </Animated.View>
        )}
      </View>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx.showToast;
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', top: 0, left: 0, right: 0, paddingHorizontal: 16, zIndex: 1000 },
  toast: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    marginTop: 8, paddingHorizontal: 16, paddingVertical: 14, borderRadius: 16, borderWidth: 1,
    shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.25, shadowRadius: 16,
  },
  text: { flex: 1, fontSize: 14, fontWeight: '600', color: '#fff' },
});

import React, { useRef } from 'react';
import {
  Animated, PanResponder, StyleSheet, TouchableOpacity, View, ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

const REVEAL = 84;

/**
 * Horizontal swipe-to-reveal-delete built on PanResponder/Animated only — no
 * gesture-handler/reanimated dependency. Swipe the child left to expose a delete
 * action; tapping it (or swiping fully) calls onDelete. Vertical drags fall
 * through so the parent ScrollView still scrolls, and taps still reach children.
 */
export default function SwipeableRow({
  children, onDelete, style, containerStyle,
}: {
  children: React.ReactNode;
  onDelete: () => void;
  style?: ViewStyle | ViewStyle[];          // applied to the sliding surface
  containerStyle?: ViewStyle | ViewStyle[]; // applied to the outer wrapper (e.g. grid sizing)
}) {
  const tx = useRef(new Animated.Value(0)).current;
  const base = useRef(0);

  const snap = (to: number) => {
    base.current = to;
    Animated.spring(tx, { toValue: to, useNativeDriver: true, bounciness: 0, speed: 18 }).start();
  };

  const pan = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) =>
        Math.abs(g.dx) > 8 && Math.abs(g.dx) > Math.abs(g.dy) * 1.4,
      onPanResponderMove: (_, g) => {
        let next = base.current + g.dx;
        if (next > 0) next = 0;
        if (next < -REVEAL) next = -REVEAL - (REVEAL + next) * -0.3; // slight rubber-band
        tx.setValue(Math.max(-REVEAL - 24, next));
      },
      onPanResponderRelease: (_, g) => {
        const next = base.current + g.dx;
        snap(next < -REVEAL / 2 ? -REVEAL : 0);
      },
      onPanResponderTerminate: () => snap(base.current < -REVEAL / 2 ? -REVEAL : 0),
    }),
  ).current;

  return (
    <View style={[styles.wrap, containerStyle]}>
      <TouchableOpacity
        style={styles.deleteZone}
        activeOpacity={0.85}
        onPress={() => { snap(0); onDelete(); }}
      >
        <Ionicons name="trash-outline" size={22} color="#fff" />
      </TouchableOpacity>
      <Animated.View style={[{ transform: [{ translateX: tx }] }, style]} {...pan.panHandlers}>
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'relative' },
  deleteZone: {
    position: 'absolute', top: 0, bottom: 0, right: 0, width: REVEAL,
    backgroundColor: '#E5484D', borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
  },
});

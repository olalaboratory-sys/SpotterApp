import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

interface StepDotsProps {
  total: number;
  current: number;
  dark?: boolean;
}

export function StepDots({ total, current, dark = false }: StepDotsProps) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            i === current && styles.active,
            dark
              ? i === current
                ? styles.activeDark
                : styles.inactiveDark
              : i === current
              ? styles.activeLight
              : styles.inactiveLight,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  active: {
    width: 24,
  },
  activeDark: {
    backgroundColor: Colors.lime,
  },
  inactiveDark: {
    width: 8,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  activeLight: {
    backgroundColor: Colors.green,
  },
  inactiveLight: {
    width: 8,
    backgroundColor: Colors.separator,
  },
});

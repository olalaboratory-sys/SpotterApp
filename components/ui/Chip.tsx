import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';

interface ChipProps {
  label: string;
  variant?: 'mist' | 'lime' | 'amber' | 'sky' | 'dark';
  style?: ViewStyle;
}

export function Chip({ label, variant = 'mist', style }: ChipProps) {
  return (
    <View style={[styles.chip, styles[variant], style]}>
      <Text style={[styles.label, labelStyles[variant]]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  mist: {
    backgroundColor: Colors.mist,
  },
  lime: {
    backgroundColor: Colors.lime,
  },
  amber: {
    backgroundColor: '#FEF3DC',
  },
  sky: {
    backgroundColor: '#DCF0FC',
  },
  dark: {
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
});

const labelStyles: Record<string, object> = {
  mist: { color: Colors.greenDeep },
  lime: { color: '#0a1f12' },
  amber: { color: '#7A4F00' },
  sky: { color: '#145F8A' },
  dark: { color: Colors.white },
};

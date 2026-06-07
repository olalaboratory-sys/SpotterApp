import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '../../constants/colors';

type Variant = 'primary' | 'lime' | 'ghost' | 'outline';

interface SpotButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  style?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
  disabled?: boolean;
}

export function SpotButton({
  label,
  onPress,
  variant = 'primary',
  style,
  textStyle,
  loading = false,
  disabled = false,
}: SpotButtonProps) {
  const containerStyle = [
    styles.base,
    variant === 'primary' && styles.primary,
    variant === 'lime' && styles.lime,
    variant === 'ghost' && styles.ghost,
    variant === 'outline' && styles.outline,
    disabled && styles.disabled,
    style,
  ];

  const labelStyle = [
    styles.label,
    variant === 'primary' && styles.labelPrimary,
    variant === 'lime' && styles.labelLime,
    variant === 'ghost' && styles.labelGhost,
    variant === 'outline' && styles.labelOutline,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'lime' ? Colors.greenInk : Colors.white}
          size="small"
        />
      ) : (
        <Text style={labelStyle}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  primary: {
    backgroundColor: Colors.green,
  },
  lime: {
    backgroundColor: Colors.lime,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.green,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  labelPrimary: {
    color: Colors.white,
  },
  labelLime: {
    color: '#0a1f12',
  },
  labelGhost: {
    color: Colors.white,
    opacity: 0.7,
  },
  labelOutline: {
    color: Colors.green,
  },
});

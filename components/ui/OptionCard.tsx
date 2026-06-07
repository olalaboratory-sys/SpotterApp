import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

interface OptionCardProps {
  label: string;
  sublabel?: string;
  selected: boolean;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  emoji?: string;
}

export function OptionCard({
  label,
  sublabel,
  selected,
  onPress,
  icon,
  emoji,
}: OptionCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.selected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.left}>
        {emoji ? (
          <Text style={styles.emoji}>{emoji}</Text>
        ) : icon ? (
          <View style={[styles.iconWrap, selected && styles.iconWrapSelected]}>
            <Ionicons
              name={icon}
              size={22}
              color={selected ? Colors.white : Colors.greenDeep}
            />
          </View>
        ) : null}
        <View style={styles.textWrap}>
          <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
          {sublabel ? (
            <Text style={[styles.sublabel, selected && styles.sublabelSelected]}>
              {sublabel}
            </Text>
          ) : null}
        </View>
      </View>
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioDot} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selected: {
    borderColor: Colors.green,
    backgroundColor: Colors.mist2,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  emoji: {
    fontSize: 28,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.mist,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapSelected: {
    backgroundColor: Colors.green,
  },
  textWrap: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.labelPrimary,
    letterSpacing: -0.2,
  },
  labelSelected: {
    color: Colors.greenDeep,
  },
  sublabel: {
    fontSize: 13,
    color: Colors.labelTertiary,
    marginTop: 2,
  },
  sublabelSelected: {
    color: Colors.greenDeep,
    opacity: 0.7,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.separator,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: Colors.green,
    backgroundColor: Colors.green,
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.white,
  },
});

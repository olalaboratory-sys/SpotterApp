import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Modal, Pressable, StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { Colors } from '../constants/colors';

/**
 * Bottom sheet with the correct motion: the dim backdrop fades in place while
 * only the sheet slides up. Stays mounted through the exit animation so it
 * slides back down on close. (Modal's built-in "slide" moves both together.)
 */
export default function BottomSheet({
  visible, onClose, children, sheetStyle,
}: {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  sheetStyle?: StyleProp<ViewStyle>;
}) {
  const [show, setShow] = useState(visible);
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setShow(true);
      Animated.timing(anim, { toValue: 1, duration: 260, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
    } else if (show) {
      Animated.timing(anim, { toValue: 0, duration: 200, easing: Easing.in(Easing.cubic), useNativeDriver: true }).start(({ finished }) => {
        if (finished) setShow(false);
      });
    }
  }, [visible]);

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [600, 0] });

  return (
    <Modal visible={show} transparent animationType="none" statusBarTranslucent onRequestClose={onClose}>
      <View style={styles.root}>
        <Animated.View style={[StyleSheet.absoluteFill, styles.backdrop, { opacity: anim }]}>
          <Pressable style={{ flex: 1 }} onPress={onClose} />
        </Animated.View>
        <Animated.View style={[styles.sheet, sheetStyle, { transform: [{ translateY }] }]}>
          <View style={styles.handle} />
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { backgroundColor: 'rgba(6,12,9,0.45)' },
  sheet: { backgroundColor: Colors.cloud, borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: 20, paddingBottom: 40 },
  handle: { width: 38, height: 5, borderRadius: 3, backgroundColor: '#d9d9de', alignSelf: 'center', marginBottom: 10 },
});

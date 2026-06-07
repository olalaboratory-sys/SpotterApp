import React, { useRef } from 'react';
import { Animated, Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

type Props = PressableProps & {
  style?: StyleProp<ViewStyle>;        // visual style (the part that scales)
  containerStyle?: StyleProp<ViewStyle>; // layout style on the Pressable (e.g. flex)
  scaleTo?: number;
  children: React.ReactNode;
};

/** A Pressable that gently scales down while pressed, for tactile card feedback. */
export default function PressableScale({ children, style, containerStyle, scaleTo = 0.97, ...rest }: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const animate = (to: number) =>
    Animated.spring(scale, { toValue: to, useNativeDriver: true, speed: 40, bounciness: 0 }).start();

  return (
    <Pressable
      style={containerStyle}
      onPressIn={() => animate(scaleTo)}
      onPressOut={() => animate(1)}
      {...rest}
    >
      <Animated.View style={[style, { transform: [{ scale }] }]}>{children}</Animated.View>
    </Pressable>
  );
}

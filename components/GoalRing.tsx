import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

/**
 * Apple-Watch-style segmented goal ring drawn with plain Views — no SVG. Each
 * segment is a rounded bar parked at 12 o'clock inside a full-size container
 * that's rotated about its own centre (= the ring centre), so the bars fan out
 * evenly around the circle. Completed segments light up.
 */
export default function GoalRing({
  size = 96, goal = 3, done = 0, color = Colors.green, track = '#e4e7df', children,
}: {
  size?: number;
  goal?: number;
  done?: number;
  color?: string;
  track?: string;
  children?: React.ReactNode;
}) {
  const segs = Math.max(1, goal);
  const gapDeg = segs > 1 ? 8 : 0;
  const barW = Math.max(5, size * 0.085);
  const barLen = size * 0.2;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {Array.from({ length: segs }).map((_, i) => (
        <View
          key={i}
          style={[
            StyleSheet.absoluteFill,
            { alignItems: 'center', transform: [{ rotate: `${(360 / segs) * i + gapDeg / 2}deg` }] },
          ]}
          pointerEvents="none"
        >
          <View
            style={{
              width: barW,
              height: barLen,
              borderRadius: barW / 2,
              backgroundColor: i < done ? color : track,
            }}
          />
        </View>
      ))}
      <View style={styles.center}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
});

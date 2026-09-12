import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// Pajamas-inspired (MIT)

const C = {
  BADGE_NEUTRAL_BACKGROUND_COLOR_DEFAULT: '#dcdbd9',
  BADGE_NEUTRAL_TEXT_COLOR_DEFAULT: '#4d4b4e',
  BADGE_INFO_BACKGROUND_COLOR_DEFAULT: '#cbe2f9',
  BADGE_INFO_TEXT_COLOR_DEFAULT: '#2f5ca0',
  BADGE_SUCCESS_BACKGROUND_COLOR_DEFAULT: '#c3e6cd',
  BADGE_SUCCESS_TEXT_COLOR_DEFAULT: '#306440',
  BADGE_WARNING_BACKGROUND_COLOR_DEFAULT: '#f5d9a8',
  BADGE_WARNING_TEXT_COLOR_DEFAULT: '#894b16',
  BADGE_DANGER_BACKGROUND_COLOR_DEFAULT: '#fdd4cd',
  BADGE_DANGER_TEXT_COLOR_DEFAULT: '#a32c12',
  BADGE_TIER_BACKGROUND_COLOR_DEFAULT: '#e1d8f9',
  BADGE_TIER_TEXT_COLOR_DEFAULT: '#5c47a6',,
};

export interface GlBadgeProps {
  variant?: 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'tier';
  children?: React.ReactNode;
}

export function Badge({ variant = 'neutral', children }: GlBadgeProps) {
  const v = variant.toUpperCase();
  return (
    <View
      style={[
        styles.pill,
        {
          backgroundColor: C['GL_BADGE_' + v + '_BACKGROUND_COLOR_DEFAULT'],
        },
      ]}
    >
      <Text style={[styles.text, { color: C['GL_BADGE_' + v + '_TEXT_COLOR_DEFAULT'] }]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderRadius: 9999,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  text: { fontSize: 12, fontWeight: '600' },
});

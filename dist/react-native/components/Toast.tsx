import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// Pajamas-inspired (MIT)

const C = {
  BG: '#ffffff',
  BORDER: '#dcdbd9',
  TEXT: '#3a383d',
  TEXT_SUBTLE: '#646163',
  TEXT_STRONG: '#18171d',
  PRIMARY: '#1f75cb',
  ERROR: '#c02f12',
};

export interface GlToastProps {
  children?: React.ReactNode;
}

export function Toast({ children }: GlToastProps) {
  return <View style={styles.wrap}>{children}</View>;
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', bottom: 24, left: 24, borderRadius: 9999, padding: 16, backgroundColor: C.TEXT_STRONG },

});

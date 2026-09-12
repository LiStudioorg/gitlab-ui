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

export interface GlTableProps {
  children?: React.ReactNode;
}

export function Table({ children }: GlTableProps) {
  return <View style={styles.wrap}>{children}</View>;
}

const styles = StyleSheet.create({
  wrap: { borderRadius: 4, borderColor: C.BORDER, borderWidth: 1, padding: 8, backgroundColor: C.BG },

});

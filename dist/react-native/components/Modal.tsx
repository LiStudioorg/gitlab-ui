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

export interface GlModalProps {
  children?: React.ReactNode;
}

export function Modal({ children }: GlModalProps) {
  const [visible, setVisible] = useState(false);
  if (!visible) return null;
  return <View style={styles.wrap}>{children}</View>;
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', borderRadius: 8, padding: 16, backgroundColor: C.BG, borderColor: C.BORDER, borderWidth: 1 },

});

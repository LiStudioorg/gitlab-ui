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

export interface GlTabsProps {
  children?: React.ReactNode;
}

export function Tabs({ children }: GlTabsProps) {
  const [active, setActive] = useState(0);
  return <View style={styles.wrap}>{children}</View>;
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: C.BORDER, gap: 16, padding: 8 },

});

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// Pajamas-inspired (MIT)

const C = {
  ALERT_INFO_BACKGROUND_COLOR: '#e9f3fc',
  ALERT_INFO_TITLE_COLOR: '#18171d',
  ALERT_SUCCESS_BACKGROUND_COLOR: '#ecf4ee',
  ALERT_SUCCESS_TITLE_COLOR: '#18171d',
  ALERT_WARNING_BACKGROUND_COLOR: '#fdf1dd',
  ALERT_WARNING_TITLE_COLOR: '#18171d',
  ALERT_DANGER_BACKGROUND_COLOR: '#fcf1ef',
  ALERT_DANGER_TITLE_COLOR: '#18171d',,
  TEXT_DEFAULT: '#3a383d',
};

export interface GlAlertProps {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  children?: React.ReactNode;
}

export function Alert({ variant = 'info', title, children }: GlAlertProps) {
  const v = variant.toUpperCase();
  return (
    <View style={[styles.box, { backgroundColor: C['GL_ALERT_' + v + '_BACKGROUND_COLOR'] }]}>
      {title ? (
        <Text style={[styles.title, { color: C['GL_ALERT_' + v + '_TITLE_COLOR'] }]}>{title}</Text>
      ) : null}
      {typeof children === 'string' ? (
        <Text style={[styles.body, { color: C.TEXT_DEFAULT }]}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: { borderRadius: 4, borderWidth: 1, borderColor: 'rgba(0,0,0,0.08)', padding: 16, gap: 4 },
  title: { fontSize: 14, fontWeight: '700' },
  body: { fontSize: 14 },
});

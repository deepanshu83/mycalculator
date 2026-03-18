import React from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

export default function CalculatorDisplay({ value = '0', label = 'Display' }) {
  const { width } = useWindowDimensions();
  const valueLength = String(value).length;

  let fontSize = width < 360 ? 44 : 56;
  if (valueLength > 9) {
    fontSize = width < 360 ? 34 : 42;
  }
  if (valueLength > 13) {
    fontSize = width < 360 ? 28 : 34;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text
        adjustsFontSizeToFit
        minimumFontScale={0.45}
        numberOfLines={1}
        style={[styles.value, { fontSize }]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  label: {
    fontSize: 14,
    color: '#8b9bb0',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  value: {
    width: '100%',
    fontWeight: '600',
    color: '#f8fafc',
    textAlign: 'right',
  },
});

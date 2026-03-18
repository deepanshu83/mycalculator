import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

export default function CalculatorButton({
  label,
  onPress,
  variant = 'number',
  style,
  textStyle,
}) {
  const variantStyles = VARIANT_STYLES[variant] || VARIANT_STYLES.number;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.buttonBase,
        variantStyles.button,
        pressed && styles.buttonPressed,
        style,
      ]}
    >
      <Text style={[styles.textBase, variantStyles.text, textStyle]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    minHeight: 70,
    minWidth: 70,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 1,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  numberButton: {
    backgroundColor: '#1f2937',
    borderColor: '#334155',
  },
  operatorButton: {
    backgroundColor: '#f97316',
    borderColor: '#fb923c',
  },
  actionButton: {
    backgroundColor: '#0f766e',
    borderColor: '#14b8a6',
  },
  textBase: {
    fontSize: 30,
    fontWeight: '600',
  },
  numberText: {
    color: '#f8fafc',
  },
  operatorText: {
    color: '#fff7ed',
  },
  actionText: {
    color: '#ecfeff',
  },
});

const VARIANT_STYLES = {
  number: {
    button: styles.numberButton,
    text: styles.numberText,
  },
  operator: {
    button: styles.operatorButton,
    text: styles.operatorText,
  },
  action: {
    button: styles.actionButton,
    text: styles.actionText,
  },
};

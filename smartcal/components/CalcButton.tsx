import { Pressable, Text, StyleSheet } from 'react-native';

export default function CalcButton({ label, onPress }: any) {
  const isOperator = ['+', '-', '×', '÷', '='].includes(label);
  const isSpecial = ['C', 'DEL', '(', ')', '%'].includes(label);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        isOperator && styles.operator,
        isSpecial && styles.special,
        pressed && styles.pressed,
      ]}
      onPress={() => onPress(label)}
    >
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
button: {
  margin: 6,
  paddingVertical: 20,
  backgroundColor: '#1e293b',
  alignItems: 'center',
  borderRadius: 16,
  elevation: 5,
},
  operator: {
    backgroundColor: '#f59e0b',
  },
  special: {
    backgroundColor: '#334155',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
});
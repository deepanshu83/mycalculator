import { View, StyleSheet, Dimensions } from 'react-native';
import { useState } from 'react';
import CalcButton from '../components/CalcButton';
import Display from '../components/Display';

const { width } = Dimensions.get('window');
const btnSize = width / 4 - 10;

export default function Calculator() {
  const [input, setInput] = useState('');

const handlePress = (val: string) => {
  if (val === 'C') {
    setInput('');
    return;
  }

  if (val === 'DEL') {
    setInput((prev) => prev.slice(0, -1));
    return;
  }

  if (val === '=') {
    try {
      let expression = input
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/%/g, '*0.01');

      if (!expression) return;

      let result = eval(expression);

      // prevent weird long decimals
      result = Number(result.toFixed(6));

      setInput(result.toString());
    } catch {
      setInput('Error');
    }
    return;
  }

  // prevent multiple dots
if (val === '.' && input.split(/[+\-*/]/).pop()?.includes('.')) {
  return;
}

  // prevent double operators
  const operators = ['+', '-', '*', '/', '×', '÷', '%'];

  const lastChar = input.slice(-1);

  if (operators.includes(val) && operators.includes(lastChar)) {
    setInput(input.slice(0, -1) + val);
    return;
  }

  setInput(input + val);
};

  const buttons = [
    'C','DEL','(',')',
    '7','8','9','÷',
    '4','5','6','×',
    '1','2','3','-',
    '0','.','%','+',
    '='
  ];

  return (
    <View style={styles.container}>
      <Display value={input || '0'} />

      <View style={styles.grid}>
        {buttons.map((btn) => (
          <View key={btn} style={{ width: btnSize }}>
            <CalcButton label={btn} onPress={handlePress} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
  },
});
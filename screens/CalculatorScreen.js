import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import CalculatorButton from '../components/CalculatorButton';
import CalculatorDisplay from '../components/CalculatorDisplay';
import { CALCULATOR_BUTTON_ROWS } from '../constants/calculatorButtons';
import {
  applyCalculatorInput,
  INITIAL_CALCULATOR_STATE,
} from '../utils/calculatorState';

export default function CalculatorScreen() {
  const [calculatorState, setCalculatorState] = useState(
    INITIAL_CALCULATOR_STATE
  );

  const { currentValue, previousValue, operator } = calculatorState;

  const handleButtonPress = (label, variant) => {
    setCalculatorState((prevState) =>
      applyCalculatorInput(prevState, label, variant)
    );
  };

  const displayLabel =
    previousValue && operator
      ? `${previousValue} ${operator}`
      : 'Display';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displaySection}>
        <CalculatorDisplay value={currentValue} label={displayLabel} />
      </View>

      <View style={styles.buttonGridSection}>
        {CALCULATOR_BUTTON_ROWS.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.buttonRow}>
            {row.map((button) => (
              <CalculatorButton
                key={button.label}
                label={button.label}
                onPress={() => handleButtonPress(button.label, button.variant)}
                style={[
                  styles.button,
                  button.flex ? { flex: button.flex } : styles.singleButton,
                ]}
                variant={button.variant}
              />
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  displaySection: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 28,
    backgroundColor: '#0f172a',
  },
  buttonGridSection: {
    flex: 3,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#020617',
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
    marginBottom: 12,
  },
  button: {
    flex: 1,
  },
  singleButton: {
    flex: 1,
  },
});

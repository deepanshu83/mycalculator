import { StatusBar } from 'expo-status-bar';

import CalculatorScreen from './screens/CalculatorScreen';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <CalculatorScreen />
    </>
  );
}

import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { convert, units } from '../utils/converter';

export default function Converter() {
  const [value, setValue] = useState('');
  const [type, setType] = useState<'length' | 'weight' | 'temp'>('length');
  const [from, setFrom] = useState('m');
  const [to, setTo] = useState('km');
  const [result, setResult] = useState('');

  const handleConvert = () => {
    const num = Number(value);
    if (isNaN(num)) return setResult('Invalid');

    const res = convert(num, type, from, to);
    setResult(res.toFixed(4));
  };

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔄 Smart Converter</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter value"
        placeholderTextColor="#94a3b8"
        keyboardType="numeric"
        value={value}
        onChangeText={setValue}
      />

      {/* CATEGORY */}
      <Picker
        selectedValue={type}
        style={styles.picker}
        onValueChange={(val) => {
          setType(val);
          const u = units[val];
          setFrom(u[0]);
          setTo(u[1] || u[0]);
        }}
      >
        <Picker.Item label="Length" value="length" />
        <Picker.Item label="Weight" value="weight" />
        <Picker.Item label="Temperature" value="temp" />
      </Picker>

      {/* FROM */}
      <Text style={styles.label}>From</Text>
      <Picker selectedValue={from} style={styles.picker} onValueChange={setFrom}>
        {units[type].map((u) => (
          <Picker.Item key={u} label={u} value={u} />
        ))}
      </Picker>

      {/* SWAP BUTTON */}
      <Pressable style={styles.swap} onPress={handleSwap}>
        <Text style={styles.swapText}>⇅ Swap</Text>
      </Pressable>

      {/* TO */}
      <Text style={styles.label}>To</Text>
      <Picker selectedValue={to} style={styles.picker} onValueChange={setTo}>
        {units[type].map((u) => (
          <Picker.Item key={u} label={u} value={u} />
        ))}
      </Picker>

      {/* CONVERT */}
      <Pressable style={styles.button} onPress={handleConvert}>
        <Text style={styles.buttonText}>Convert</Text>
      </Pressable>

      {/* RESULT */}
      <View style={styles.resultBox}>
        <Text style={styles.resultText}>{result}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1e293b',
    color: 'white',
    padding: 15,
    borderRadius: 14,
    marginBottom: 20,
  },
  picker: {
    backgroundColor: '#1e293b',
    color: 'white',
    marginBottom: 10,
    borderRadius: 10,
  },
  label: {
    color: '#94a3b8',
    marginTop: 10,
  },
  swap: {
    alignItems: 'center',
    marginVertical: 10,
  },
  swapText: {
    color: '#38bdf8',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#22c55e',
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  resultBox: {
    marginTop: 25,
    padding: 20,
    backgroundColor: '#1e293b',
    borderRadius: 14,
    alignItems: 'center',
  },
  resultText: {
    color: '#22c55e',
    fontSize: 26,
    fontWeight: 'bold',
  },
});
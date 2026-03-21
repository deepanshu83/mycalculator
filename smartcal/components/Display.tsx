import { View, Text, StyleSheet } from 'react-native';

export default function Display({ value }: any) {
  return (
    <View style={styles.display}>
      <Text numberOfLines={1} adjustsFontSizeToFit style={styles.text}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  display: {
    padding: 25,
    backgroundColor: '#020617',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    minHeight: 120,
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
  },
});
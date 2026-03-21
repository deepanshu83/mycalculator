import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SmartCal</Text>
      <Text style={styles.subtitle}>Smart Calculator & Converter</Text>

      <View style={styles.cardContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.card,
            pressed && styles.cardPressed,
          ]}
          onPress={() => router.push('/calculator')}
        >
          <Text style={styles.cardTitle}>🧮 Calculator</Text>
          <Text style={styles.cardDesc}>Basic math operations</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.card,
            pressed && styles.cardPressed,
          ]}
          onPress={() => router.push('/converter')}
        >
          <Text style={styles.cardTitle}>🔄 Converter</Text>
          <Text style={styles.cardDesc}>Convert units easily</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: width * 0.1,
    color: 'white',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#94a3b8',
    marginBottom: 30,
  },
  cardContainer: {
    width: '100%',
    gap: 20,
  },
  card: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 15,
  },
  cardPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.8,
  },
  cardTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardDesc: {
    color: '#94a3b8',
    marginTop: 5,
  },
});
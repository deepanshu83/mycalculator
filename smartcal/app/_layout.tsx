import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="calculator" options={{ title: 'Calculator' }} />
      <Stack.Screen name="converter" options={{ title: 'Converter' }} />
    </Stack>
  );
}
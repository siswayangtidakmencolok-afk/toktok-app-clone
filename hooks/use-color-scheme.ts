import { useColorScheme as _useColorScheme } from 'react-native';

/**
 * useColorScheme hook (TypeScript):
 * Hook ini mendeteksi apakah perangkat user menggunakan mode Terang (Light) atau Gelap (Dark).
 */
export function useColorScheme() {
  return _useColorScheme() as 'light' | 'dark';
}

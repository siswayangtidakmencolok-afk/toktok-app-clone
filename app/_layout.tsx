import { ClerkProvider, useAuth } from "@clerk/clerk-expo"; // Import Clerk untuk autentikasi
import { useFonts } from "expo-font"; // Mengatur font kustom
import { Stack, useRouter, useSegments } from "expo-router"; // Komponen navigasi Expo Router
import * as SecureStore from "expo-secure-store"; // Untuk menyimpan token sesi login dengan aman
import * as SplashScreen from "expo-splash-screen"; // Menahan tampilan loading awal
import { useCallback, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import 'react-native-url-polyfill/auto'; // Polyfill untuk Supabase agar bisa berjalan di Mobile


// Mencegah SplashScreen menutup sendiri sebelum kita suruh
SplashScreen.preventAutoHideAsync();

// Konfigurasi Token Cache agar user tetap login meskipun aplikasi ditutup
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

/**
 * Komponen Internal untuk menangani perpindahan halaman otomatis (Redirect)
 * Ini memisahkan logika pengecekan login dari struktur Provider di atasnya.
 */
function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth(); // Ambil status login dari Clerk
  const segments = useSegments(); // Ambil informasi sedang di folder mana (misal: '(auth)')
  const router = useRouter(); // Alat untuk pindah halaman

  useEffect(() => {
    if (!isLoaded) return; // Tunggu sampai status login selesai dimuat

    const inAuthGroup = segments[0] === '(auth)';

    if (isSignedIn && inAuthGroup) {
      // Jika user SUDAH LOGIN tapi masih di halaman login (auth), pindahkan ke Home (tabs)
      router.replace('/(tabs)');
    } else if (!isSignedIn && !inAuthGroup) {
      // Jika user BELUM LOGIN tapi mencoba masuk ke dalam aplikasi, pindahkan ke Login
      router.replace('/(auth)/LoginScreen/LoginScreen'); // Pastikan nama folder auth sesuai dengan struktur Anda
    }
  }, [isSignedIn, isLoaded, segments]);

  return (
    // Menampilkan navigasi Stack dasar (tanpa header agar bersih seperti di App.js)
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  // 1. Memuat Font Kustom (Sesuai tutorial tutorial/App.js Anda)
  const [fontsLoaded, fontError] = useFonts({
    'Outfit-Bold': require('../assets/fonts/Outfit-Bold.ttf'),
    'Outfit-Medium': require('../assets/fonts/Outfit-Medium.ttf'),
    'Outfit-Regular': require('../assets/fonts/Outfit-Regular.ttf'),
  });

  // 2. Fungsi untuk menutup Splash Screen saat semua sudah siap
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Jika font sedang proses muat, jangan tampilkan apa-apa dulu
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    // ClerkProvider harus berada di paling luar agar useAuth() bisa digunakan di bawahnya
    <ClerkProvider 
      tokenCache={tokenCache} 
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <View style={styles.container} onLayout={onLayoutRootView}>
        {/* Render komponen navigasi dengan logika redirect */}
        <InitialLayout />
      </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

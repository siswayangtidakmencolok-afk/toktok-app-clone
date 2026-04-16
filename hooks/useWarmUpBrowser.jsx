import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import { Platform } from "react-native";

/**
 * useWarmUpBrowser hook:
 * Mempercepat pembukaan browser untuk OAuth di perangkat Native (Android/iOS).
 * Diperbarui agar tidak menyebabkan error di versi Web.
 */
export const useWarmUpBrowser = () => {
  useEffect(() => {
    // warmUpAsync tidak tersedia di Web, jadi kita beri pengecekan Platform
    if (Platform.OS !== 'web') {
      void WebBrowser.warmUpAsync();
      return () => {
        void WebBrowser.coolDownAsync();
      };
    }
  }, []);
};
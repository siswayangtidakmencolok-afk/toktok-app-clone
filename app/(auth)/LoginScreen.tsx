// LoginScreen.tsx
import { VideoView, useVideoPlayer } from "expo-video";
import Colors from "../utils/Color";
import { Image, Text, TouchableOpacity, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useCallback } from "react";
import { useSSO } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
// Diperlukan agar OAuth callback bekerja dengan baik
WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  
  // Hook SSO dari Clerk per standar 2026
  const { startSSOFlow } = useSSO();
  
  const onPress = useCallback(async () => {
    try {
      console.log("Login button pressed!");
      // Jalankan alur login Google
      const result = await startSSOFlow({ 
        strategy: "oauth_google",
        redirectUrl: Linking.createURL('/') 
      });

      console.log("SSO Result:", result);

      if (result.createdSessionId) {
        // Login berhasil → aktifkan session
        result.setActive!({ session: result.createdSessionId });
      }
    } catch (error) {
      console.error("SSO error:", error);
    }
  }, [startSSOFlow]);
  const player = useVideoPlayer(
    require('../../assets/images/fireworks.mp4'),
    (player) => {
      player.loop = true;  // video berulang
      player.play();       // langsung putar
    }
  );
  return (
    <View style={{ flex: 1 }}>
      {/* LAYER 1: Video latar belakang */}
      <VideoView
        player={player}
        style={{ width: "100%", height: "100%" }}
        contentFit="cover"
        nativeControls={false}
      />
      {/* LAYER 2: Semua konten menumpuk di atas video */}
      <View style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        paddingTop: 100,
        paddingHorizontal: 20,
        backgroundColor: Colors.BACKGROUND_TRANSP,
      }}>
        {/* Judul */}
        <Text style={{
          fontSize: 40,
          fontFamily: 'Outfit-Bold',
          color: Colors.WHITE,
        }}>
          TokTok
        </Text>
        {/* Tagline */}
        <Text style={{
          fontSize: 20,
          fontFamily: 'Outfit-Regular',
          color: Colors.WHITE,
          marginTop: 10,
          textAlign: 'center',
        }}>
          Ultimate Place to Share your Short Videos with Great Community
        </Text>
        {/* Tombol Sign in with Google */}
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.8}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            backgroundColor: Colors.WHITE,
            padding: 10,
            paddingHorizontal: 40,
            borderRadius: 99,
            position: 'absolute',
            bottom: 150,
            zIndex: 100, // Memastikan tombol di paling atas
          }}
        >
          <Image
            source={require('../../assets/images/google.png')}
            style={{ width: 20, height: 20 }}
          />
          <Text style={{
            fontFamily: 'Outfit-Medium',
            fontSize: 16,
            color: '#000000',
          }}>
            Sign in with Google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
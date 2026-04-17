// LoginScreen.tsx
import { VideoView, useVideoPlayer } from "expo-video";
import Colors from "../utils/Color";
import { Image, Text, Pressable, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useCallback } from "react";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import {supabase} from "../utils/SupabaseConfig"
// Diperlukan agar OAuth callback bekerja dengan baik
WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  
// Panaskan browser sebelum OAuth dibuka
  useWarmUpBrowser();
  // Hook OAuth dari Clerk untuk Google
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  
  const onPress = useCallback(async () => {
    try {
  // Fungsi yang dipanggil saat tombol Google ditekan
  const { createdSessionId, signIn, signUp, setActive} =
  await startOAuthFlow({ redirectUrl: Linking.createURL('/') });
      if (createdSessionId) {
        // Login berhasil → aktifkan session
        setActive!({ session: createdSessionId });
        if(signUp?.emailAddress)
        {

          const { data, error } = await supabase
          .from('Users')
          .insert([
          { name: signUp?.firstName,
            email: signUp?.emailAddress,
            username: signUp?.emailAddress.split('@')[0]
          },
          ])
          .select()
        }
      } else {}
       //use signIn or signUp for next steps such as MFA
    } catch (error) {
      console.error("OAuth error:", error);
    }
  },[]);
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
        <Pressable
          onPress={onPress}
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
        </Pressable>
      </View>
    </View>
  );
}
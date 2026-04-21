// LoginScreen.tsx
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { VideoView, useVideoPlayer } from "expo-video";
import * as WebBrowser from "expo-web-browser";
import { useCallback } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
import Colors from "../../utils/Colors";
import { supabase } from "../../utils/SupabaseConfig";

// Diperlukan agar OAuth callback bekerja dengan baik
WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  
// Panaskan browser sebelum OAuth dibuka
  useWarmUpBrowser();
  // Hook OAuth dari Clerk untuk Google
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  
  const onPress = useCallback(async () => {
    try {
      // SAaya mengganti dengan library Linkking karena sempat ada masalah dengan startOAuthFlow yang tidak membuka browser di beberapa perangkat
      const { createdSessionId, setActive, signUp } =
        await startOAuthFlow({ redirectUrl: Linking.createURL('/') });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });

        // Hanya insert ke Supabase kalau user BARU (signUp, bukan signIn)
        if (signUp?.emailAddress) {
          const { error } = await supabase
            .from('Users')
            .insert([{
              name: signUp.firstName,
              email: signUp.emailAddress,
              username: signUp.emailAddress.split('@')[0],
            }]);

          if (error) console.error('Supabase insert error:', error.message);
        }
      }
    } catch (err) {
      const error = err as Error;
      // Kalau sudah login, abaikan error ini
      if (error.message?.includes('already signed in')) {
        console.log('User sudah login, redirect ke tabs...');
        return;
      }
      console.error('OAuth error:', error);
    }
  }, [startOAuthFlow]);
  const player = useVideoPlayer(
    require('../../../assets/images/sportcars.mp4'),
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
          Silahkan menikmati video pendek dan temukan kebahagian di dalamnya!
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
            source={require('../../../assets/images/google.png')}
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
// LoginScreen.tsx
import { ResizeMode, Video } from "expo-av";
import Colors from "../utils/Color";
import { Image, Text, Pressable, View } from "react-native";

export default function LoginScreen() {

  const handleGoogleSignIn = () => {
    console.log('Tombol Google Sign In ditekan');
    // TODO: tambahkan logika autentikasi Google di sini
  };

  return (
    <View style={{ flex: 1 }}>

      {/* LAYER 1: Video latar belakang */}
      <Video
        source={require("../../assets/images/fireworks.mp4")}
        style={{ width: "100%", height: "100%" }}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
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
        // Ganti TouchableOpacity → Pressable (lebih reliable di web & mobile)
<Pressable
  onPress={() => console.log('Google Sign In ditekan')}
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
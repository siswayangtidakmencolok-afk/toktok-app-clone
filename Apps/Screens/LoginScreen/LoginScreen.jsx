import { View, Text, StyleSheet, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import React from 'react';
import { Video, ResizeMode } from 'expo-av';
import Colors from '../../utils/color';

export default function LoginScreen() {
  const { width, height } = useWindowDimensions();

  return (
    <View style={{ flex: 1, width, height }}>
      {/* Background Video - Fullscreen */}
      <Video
        style={{ position: 'absolute', top: 0, left: 0, width, height }}
        source={{
          uri: 'https://www.w3schools.com/html/mov_bbb.mp4'
        }}
        shouldPlay
        resizeMode={ResizeMode.COVER}
        isLooping={true}
        isMuted={true}
      />

      {/* Dark overlay agar teks terbaca */}
      <View style={{ position: 'absolute', top: 0, left: 0, width, height, backgroundColor: Colors.BACKGROUND_TRANSP }} />

      {/* Konten di atas video */}
      <View style={styles.content}>
        <Text style={styles.title}>Taka Tak</Text>
        <Text style={styles.subtitle}>
          Ultimate Place to Share your Short Videos with Great Community
        </Text>

        {/* Tombol Sign In with Google */}
        <TouchableOpacity
          onPress={() => console.log('Sign in with Google pressed')}
          style={styles.googleButton}
        >
          <Image
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png' }}
            style={styles.googleLogo}
          />
          <Text style={styles.googleButtonText}>Sign In with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 80,
    paddingHorizontal: 30,
  },
  title: {
    color: Colors.WHITE,
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: Colors.WHITE,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 99,
    gap: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  googleLogo: {
    width: 24,
    height: 24,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

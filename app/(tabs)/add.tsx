// app/(tabs)/add.tsx
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

export default function AddScreen() {

  const handlePickVideo = () => {
    console.log('Pilih video ditekan');
    // TODO: buka file picker untuk pilih video
  };

  return (
    <View style={styles.container}>

      {/* Icon folder */}
      <Image
        source={require('../../assets/images/folder.png')}
        style={styles.image}
      />

      {/* Judul */}
      <Text style={styles.title}>
        Start Uploading Short Video
      </Text>

      {/* Deskripsi */}
      <Text style={styles.description}>
        Lets upload short video and start sharing your creativity with community
      </Text>

      {/* Tombol pilih video */}
      <TouchableOpacity
        style={styles.button}
        onPress={handlePickVideo}
      >
        <Text style={styles.buttonText}>
          Pick Video From Gallery
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                    // mengisi seluruh layar
    justifyContent: 'center',   // konten di tengah vertikal
    alignItems: 'center',       // konten di tengah horizontal
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 140,
    height: 140,
  },
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    color: '#888',
  },
  button: {
    backgroundColor: '#000',    // tombol hitam
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 99,           // pill shape
    marginTop: 30,
  },
  buttonText: {
    fontFamily: 'Outfit-Medium',
    color: '#fff',
    fontSize: 16,
  },
});
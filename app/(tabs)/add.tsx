// app/(tabs)/add.tsx
import * as ImagePicker from 'expo-image-picker';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AddScreen() {
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const generateVideoThumbnail = async (uri: string) => {
    try {
      const { uri: thumbUri } = await VideoThumbnails.getThumbnailAsync(uri, {
        time: 15000,
      });
      console.log('Thumbnail:', thumbUri);
      setThumbnail(thumbUri);
    } catch (e) {
      console.warn(e);
    }
  };

  const selectVideoFile = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access media library is required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['videos'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      console.log('Selected video URI:', uri);
      setVideoUri(uri);
      generateVideoThumbnail(uri);
    }
  };

  return (
    <View style={styles.container}>

      {/* Tampilkan thumbnail kalau sudah ada, atau icon folder */}
      {thumbnail ? (
        <Image source={{ uri: thumbnail }} style={styles.image} />
      ) : (
        <Image source={require('../../assets/images/folder.png')} style={styles.image} />
      )}

      <Text style={styles.title}>Start Uploading Short Video</Text>

      <Text style={styles.description}>
        Lets upload short video and start sharing your creativity with community
      </Text>

      <TouchableOpacity style={styles.button} onPress={selectVideoFile}>
        <Text style={styles.buttonText}>Pick Video From Gallery</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 10,
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
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 99,
    marginTop: 30,
  },
  buttonText: {
    fontFamily: 'Outfit-Medium',
    color: '#fff',
    fontSize: 16,
  },
});
// app/(tabs)/add.tsx
import * as ImagePicker from 'expo-image-picker';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AddScreen() {

  const SelectVideoFile = async () => {
    // No permissions request is necessary for launching the image library.
    // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
    // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
    // so the app users aren't surprised by a system dialog after picking a video.
    // See "Invoke permissions for videos" sub section for more details.
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the media library is required.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      console.log('Selected video URI:', result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
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
        onPress={SelectVideoFile}
        style={styles.button}
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
    padding: 20,             // padding agar tidak mepet ke tepi layar
    backgroundColor: '#fff',  // latar belakang putih
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
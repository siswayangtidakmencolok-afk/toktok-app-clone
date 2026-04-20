import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function AddScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New</Text>
      <Text style={styles.text}>Halaman upload video sedang dikembangkan.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    marginTop: 10,
    color: '#666',
  },
});

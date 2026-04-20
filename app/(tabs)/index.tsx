import { View, Text } from 'react-native';import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { supabase } from '../utils/SupabaseConfig';

/**
 * Interface untuk struktur data User di Supabase
 */
interface SupabaseUser {
  id?: number;
  name: string | null | undefined;
  email: string | undefined;
  username: string | undefined;
  profileImage?: string | null;
}

export default function HomeScreen() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      updateProfileImage();
    }
  }, [user]);

  /**
   * Mengupdate foto profil user di database Supabase
   */
  const updateProfileImage = async (): Promise<void> => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    const { data, error } = await supabase
      .from('Users')
      .update({ profileImage: user?.imageUrl })
      .eq('email', user?.primaryEmailAddress?.emailAddress)
      .select();

    if (error) {
      console.error('Supabase error:', error.message);
    } else {
      console.log('Profile updated:', data);
    }
  }

  return (
    <View style={{ flex: 1, padding: 50, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Home Screen</Text>
      <Text style={{ marginTop: 10 }}>Halo, {user?.firstName || 'User'}!</Text>
      <Text style={{ color: '#666', marginTop: 5 }}>Anda sudah login di TokTok</Text>
ext>
    </View>
  );
}

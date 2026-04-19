// app/(tabs)/index.tsx
import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { supabase } from '../../utils/SupabaseConfig';

export default function HomeScreen() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      updateProfileImage();
    }
  }, [user]);

  const updateProfileImage = async () => {
    console.log('User email:', user?.primaryEmailAddress?.emailAddress);
    console.log('User imageUrl:', user?.imageUrl);

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
    <View style={{ padding: 50 }}>
      <Text>HomeScreen</Text>
    </View>
  );
}
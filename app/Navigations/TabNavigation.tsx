import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../(auth)/Home/HomeScreen'
import SearchScreen from '../(auth)/Search/SearchScreen'
import AddScreen from '../(auth)/Add/AddScreen'
import ProfileScreen from '../(auth)/Profile/ProfileScreen'

const Tab=createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Add" component={AddScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}
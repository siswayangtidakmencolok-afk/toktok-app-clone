import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../(tabs)/index'
import SearchScreen from '../(tabs)/explore'
import AddScreen from '../(tabs)/add'
import ProfileScreen from '../(tabs)/profile'
import { Colors } from '@/constants/theme'

const Tab=createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor:Colors.BLACK,
        headerShown:false,

      }}
      >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Add" component={AddScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}
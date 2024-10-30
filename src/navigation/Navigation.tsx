import { View, Text } from 'react-native'
import React, { FC } from 'react'
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../feature/auth/SplashScreen';
import { navigationRef } from '../utils/NavigationUtils';



const Stack = createNativeStackNavigator();

const Navigation:FC = () => {

  return (
    <NavigationContainer ref = {navigationRef}>
      <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{headerShown : false}}>
        <Stack.Screen name='SpashScreen' component={SplashScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
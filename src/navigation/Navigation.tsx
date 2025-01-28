import { View, Text } from 'react-native';
import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../feature/auth/SplashScreen';
import { navigationRef } from '../utils/NavigationUtils';
import CustomerLogin from '../feature/auth/CustomerLogin';
import DeliveryLogin from '../feature/auth/DeliveryLogin';
import ProductDashboard from '../feature/dashboard/ProductDashboard';
import DeliveryDashboard from '../feature/delivery/DeliveryDashboard';

const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
  return (
   
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen
          name="CustomerLogin"
          component={CustomerLogin}
          options={{
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="DeliveryLogin"
          component={DeliveryLogin}
          options={{
            animation: 'fade',
          }}
        />
         <Stack.Screen
          name="ProductDashboard"
          component={ProductDashboard}
          options={{
            animation: 'fade',
          }}
        />
           <Stack.Screen
          name="DeliveryDashboard"
          component={DeliveryDashboard}
          options={{
            animation: 'fade',
          }}
        />
      </Stack.Navigator>

  );
};

export default Navigation;

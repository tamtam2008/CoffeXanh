import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from './login/Login.screen';
import OTPVerifyScreen from './otpVerify/OTPVerify.screen';
import PhoneNumberLockedScreen from './phoneNumberLocked/PhoneNumberLocked.screen';

const Stack = createStackNavigator();

const AuthScreen = () => {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="OTPVerify" component={OTPVerifyScreen} />
      <Stack.Screen
        name="phoneLocked"
        component={PhoneNumberLockedScreen}
        options={{
          title: 'Thông báo',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthScreen;

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from './login/Login.screen';
import RegisterScreen from './register/Register.screen';
import ResetPasswordScreen from './resetPassword/ResetPassword.screen';
import ResetPasswordSuccessScreen from './resetPasswordSuccess/ResetPasswordSuccess.screen';
import RegisterSuccessScreen from './register/RegisterSuccess.screen';

const Stack = createStackNavigator();

const AuthScreen = () => {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="resetPassword"
        component={ResetPasswordScreen}
        options={{ title: 'Quên mật khẩu', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="resetPasswordSuccess"
        component={ResetPasswordSuccessScreen}
        options={{ title: 'Quên mật khẩu', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="register"
        component={RegisterScreen}
        options={{ title: 'Tạo tài khoản', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="registerSuccess"
        component={RegisterSuccessScreen}
        options={{ title: 'Đăng ký', headerTitleAlign: 'center' }}
      />
    </Stack.Navigator>
  );
};

export default AuthScreen;

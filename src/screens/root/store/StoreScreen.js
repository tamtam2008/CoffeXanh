import loadable from '@loadable/component';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

const Stack = createStackNavigator();

const AuthScreens = () => {
  return (
    <Stack.Navigator initialRouteName="store">
      <Stack.Screen
        name="store"
        component={loadable(() => import('./mapStore/MapStore.screen'))}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthScreens;

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MapStoreScreen from './mapStore/MapStore.screen';

const Stack = createStackNavigator();

const StoreScreens = () => {
  return (
    <Stack.Navigator initialRouteName="store">
      <Stack.Screen
        name="store"
        component={MapStoreScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StoreScreens;

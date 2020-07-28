import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from './components/TabBarIcon';
import { routes } from '../screens/routes';
import Colors from '../constants/Colors';
import { normalize } from '../constants/Layout';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/core';
import { backButtonHandler } from '../utils/AppUtils';

const Tab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'home';
export default function BottomTabNavigator({ navigation, route }) {
  const tabBarOptions = {
    style: { height: normalize(60), paddingBottom: 5, paddingTop: 5 },
    activeTintColor: Colors.tabIconSelected,
    inactiveTintColor: Colors.tabIconDefault,
  };
  const { t } = useTranslation();

  useFocusEffect(React.useCallback(backButtonHandler({ route }), [route]));

  return (
    <Tab.Navigator
      unmountOnBlur={true}
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={tabBarOptions}>
      {routes.bottomTabs.map((tab, idx) => {
        return (
          <Tab.Screen
            key={idx}
            name={tab.name}
            component={tab.component}
            options={{
              title: t(tab.title),
              tabBarIcon: ({ focused }) => (
                <TabBarIcon
                  focused={focused}
                  icon={
                    tab.icon ? tab.icon : { type: 'Ionicons', name: 'md-help' }
                  }
                />
              ),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

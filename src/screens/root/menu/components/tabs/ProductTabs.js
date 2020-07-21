import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import posed from 'react-native-pose';
import XIconButton from '../../../../../components/XIconButton';
import {
  BaseFontStyles,
  BaseStyles,
} from '../../../../../constants/BaseStyles';
import Colors from '../../../../../constants/Colors';
import { IconType } from '../../../../../constants/Icon';
import Layout from '../../../../../constants/Layout';
import DrinkTab from './DrinkTab/DrinkTab';
import FoodTab from './FoodTab/FoodTab';
import PopularTab from './PopularTab/PopularTab';

const Tab = createMaterialTopTabNavigator();

const tabBarOptions = {
  labelStyle: BaseFontStyles.menuOrBody2,
  activeTintColor: Colors.tintColor,
  inactiveTintColor: Colors.gray,
  indicatorStyle: { backgroundColor: Colors.tintColor },
  style: { backgroundColor: '#fff' },
};

const ProductTabs = props => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      initialRouteName={'tab.drink'}
      lazy={true}
      tabBarOptions={tabBarOptions}
      tabBar={p => <CustomTabBar {...p} openSearch={props.openSearch} />}>
      <Tab.Screen
        name={'tab.popular'}
        component={PopularTab}
        options={{ title: t('Menu.ProductTabs.popular') }}
      />
      <Tab.Screen
        name={'tab.drink'}
        component={DrinkTab}
        options={{ title: t('Menu.ProductTabs.drink') }}
      />
      <Tab.Screen
        name={'tab.food'}
        component={FoodTab}
        options={{ title: t('Menu.ProductTabs.food') }}
      />
    </Tab.Navigator>
  );
};

const tabWidth = (Layout.window.width - 36) / 3;
const SpotLight = posed.View({
  route0: { x: 0 },
  route1: { x: tabWidth },
  route2: { x: tabWidth * 2 },
});
function CustomTabBar(props) {
  const { state, navigation, descriptors } = props;
  const { index: activeRouteIndex } = state;
  return (
    <View
      style={[BaseStyles.boxWithShadow, BaseStyles.flexRow, styles.container]}>
      <View style={[styles.headerContainer]}>
        <View style={StyleSheet.absoluteFillObject}>
          <SpotLight
            style={styles.spotLight}
            pose={`route${activeRouteIndex}`}
          />
        </View>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.tabItem]}>
              <Text
                style={[
                  BaseFontStyles.menuOrBody2,
                  { color: isFocused ? Colors.tintColor : Colors.gray },
                  styles.title,
                ]}
                lineBreakMode={'tail'}
                numberOfLines={1}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={[styles.searchItemContainer]}>
        <XIconButton
          color={Colors.gray}
          icon={{ name: 'search', type: IconType.FONTAWESOME, size: 18 }}
          onPress={props.openSearch}
        />
      </View>
    </View>
  );
}

export default ProductTabs;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    width: Layout.window.width - 36,
    justifyContent: 'space-around',
  },
  tabItem: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  title: {
    width: tabWidth,
    textAlign: 'center',
  },
  searchItemContainer: {
    width: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spotLight: {
    width: tabWidth,
    height: '100%',
    borderBottomWidth: 2,
    borderBottomColor: Colors.tintColor,
  },
});

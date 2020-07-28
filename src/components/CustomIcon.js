import * as React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Platform } from 'react-native';
import Colors from '../constants/Colors';
import { Image } from 'react-native';
import { IconType } from '../constants/Icon';

export default function CustomIcon({
  name,
  type,
  size,
  focused,
  other,
  custom = { style: {} },
}) {
  const ImageStyle = {
    width: size,
    height: size,
  };
  const Icon = getIconComponent(type);
  return type !== IconType.IMAGE ? (
    <Icon
      name={
        type === IconType.IONICON
          ? Platform.OS === 'ios'
            ? `ios-${name}`
            : `md-${name}`
          : name
      }
      size={size}
      type={type}
      color={
        focused
          ? custom.color
            ? custom.color
            : Colors.tabIconSelected
          : Colors.tabIconDefault
      }
      {...other}
      style={custom.style instanceof Array ? custom.style : [custom.style]}
    />
  ) : focused ? (
    <Image source={name.active} style={ImageStyle} />
  ) : (
    <Image source={name.inactive} style={ImageStyle} />
  );
}

const getIconComponent = type => {
  switch (type) {
    case IconType.IONICON:
      return Ionicons;
    case IconType.FONTAWESOME:
      return FontAwesome5;
    case IconType.ANTDESIGN:
      return AntDesign;
    case IconType.EVILICON:
      return EvilIcons;
    case IconType.FEATHER:
      return Feather;
    case IconType.MATERIAL:
      return MaterialIcons;
    case IconType.MATERIAL_COMMUNITY:
      return MaterialCommunityIcons;
    case IconType.OCTICONS:
      return Octicons;
    default:
      return FontAwesome5;
  }
};

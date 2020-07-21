import * as React from 'react';
import CustomIcon from './CustomIcon';
import { IconType } from '../constants/Icon';
import { BaseStyles } from '../constants/BaseStyles';
import { View } from 'react-native';

export default function PointIcon({ size, focused }) {
  return (
    <View>
      <CustomIcon
        name={{
          active: require('../../assets/images/point.png'),
          inactive: require('../../assets/images/point2.png'),
        }}
        type={IconType.IMAGE}
        size={size}
        focused={focused}
        custom={{ style: BaseStyles.textShadow }}
      />
    </View>
  );
}

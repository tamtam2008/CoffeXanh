import React from 'react';
import { View } from 'react-native';
import XIconButton from '../../../../../components/XIconButton';
import { BaseStyles } from '../../../../../constants/BaseStyles';
import { IconType } from '../../../../../constants/Icon';
import Layout from '../../../../../constants/Layout';
import useRootNavigation from '../../../../../utils/useRootNavigation';
import styles from './TopButton.style';

const TopButtons = () => {
  const navigation = useRootNavigation();
  const iconSize = Layout.window.width * 0.3 - 20;
  return (
    <View style={[BaseStyles.flexRow, styles.content]}>
      <XIconButton
        icon={{
          name: {
            active: require('../../../../../../assets/images/5.png'),
            inactive: require('../../../../../../assets/images/5.png'),
          },
          type: IconType.IMAGE,
          size: iconSize,
        }}
        onPress={() => {
          navigation.navigate('yourCode');
        }}
      />
      <XIconButton
        icon={{
          name: {
            active: require('../../../../../../assets/images/2.png'),
            inactive: require('../../../../../../assets/images/2.png'),
          },
          type: IconType.IMAGE,
          size: iconSize,
        }}
        onPress={() => {
          navigation.navigate('menu');
        }}
      />
      <XIconButton
        icon={{
          name: {
            active: require('../../../../../../assets/images/3.png'),
            inactive: require('../../../../../../assets/images/3.png'),
          },
          type: IconType.IMAGE,
          size: iconSize,
        }}
        onPress={() => {
          navigation.navigate('yourCoupon');
        }}
      />
    </View>
  );
};

export default TopButtons;

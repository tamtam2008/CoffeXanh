import * as React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import {
  BaseStyles,
  BaseFontStyles,
} from '../../../../../constants/BaseStyles';
import CustomIcon from '../../../../../components/CustomIcon';
import { IconType, FontAwesomeType } from '../../../../../constants/Icon';
import Colors from '../../../../../constants/Colors';
import { normalize } from '../../../../../constants/Layout';
import { useFocusEffect } from '@react-navigation/native';

export default function CartIcon({ number }) {
  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  useFocusEffect(() => {
    scaleAnim.setValue(0);
    const scale = async () => {
      // Will change fadeAnim value to 1 in 5 seconds
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true, // <-- Add this
      }).start();
    };
    scale();
  });
  return (
    <View
      style={[
        styles.container,
        BaseStyles.boxWithShadow,
        number > 0 ? styles.haveItem : null,
      ]}>
      <CustomIcon
        name="coffee"
        type={IconType.FONTAWESOME}
        size={30}
        other={FontAwesomeType.SOLID}
        focused
        custom={{ color: '#fff', style: BaseStyles.textShadow }}
      />
      {number && number > 0 ? (
        <Animated.View
          style={[
            BaseStyles.boxWithShadow,
            styles.numberContainer,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}>
          <Text style={[BaseFontStyles.caption, styles.numberValue]}>
            {number > 9 ? '9+' : number}
          </Text>
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  haveItem: {
    paddingTop: 10,
  },
  numberContainer: {
    position: 'absolute',
    top: normalize(3),
    right: normalize(-3),
    zIndex: 10,
    width: normalize(24),
    height: normalize(24),
    borderRadius: 50,
    backgroundColor: Colors.red,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberValue: {
    fontWeight: '700',
    color: '#fff',
  },
});

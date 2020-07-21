import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomIcon from '../../../../components/CustomIcon';
import { BaseFontStyles, BaseStyles } from '../../../../constants/BaseStyles';
import Colors from '../../../../constants/Colors';
import { FontAwesomeType, IconType } from '../../../../constants/Icon';
import { normalize } from '../../../../constants/Layout';
import useRootNavigation from '../../../../utils/useRootNavigation';

export default function NotifyIcon({ number, size }) {
  const navigation = useRootNavigation();
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
    <View style={[styles.container, BaseStyles.boxWithShadow]}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('noti');
        }}>
        <CustomIcon
          name="bell"
          type={IconType.FONTAWESOME}
          size={size}
          other={FontAwesomeType.SOLID}
          focused={number && number > 0}
          custom={{ style: BaseStyles.textShadow }}
        />
      </TouchableOpacity>
      {number && number > 0 ? (
        <Animated.View
          style={[
            BaseStyles.boxWithShadow,
            styles.numberContainer,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}>
          <Text style={[BaseFontStyles.menuOrBody2, styles.numberValue]}>
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
    // paddingTop: 10,
  },
  numberContainer: {
    position: 'absolute',
    top: normalize(-5),
    right: normalize(-5),
    zIndex: 10,
    width: normalize(20),
    height: normalize(20),
    paddingBottom: 1,
    borderRadius: 50,
    backgroundColor: Colors.red,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberValue: {
    color: '#fff',
  },
});

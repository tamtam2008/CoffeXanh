import React, { useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { Animated, Text, Platform } from 'react-native';
import Container from '../../../../../../components/layout/Container';
import {
  BaseFontStyles,
  BaseStyles,
} from '../../../../../../constants/BaseStyles';
import CustomIcon from '../../../../../../components/CustomIcon';
import { IconType } from '../../../../../../constants/Icon';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geolocation from 'react-native-geolocation-service';
import MapUtils from '../../../../../../utils/MapUtils';

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = MapUtils.getLongitudeDelta(LATITUDE_DELTA);

const FindYourPositionContent = ({ onAfterFinding, dispatch }) => {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: -10,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => {
      animation.stop();
    };
  });

  useLayoutEffect(() => {
    if (Platform.OS === 'android') {
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
      })
        .then((data) => {
          console.log(
            'FindYourPositionContent',
            'Finding your position...',
            data,
          );
          findLocation();
        })
        .catch((err) => {
          console.log(err);
          onAfterFinding();
        });
    } else {
      findLocation();
    }
  }, [findLocation, onAfterFinding]);

  const findLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      (pos) => {
        console.log('FindYourPositionContent', pos);
        onAfterFinding({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });
      },
      (e) => {
        console.log('FindYourPositionContent', e);
        onAfterFinding();
      },
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 },
    );
  }, [onAfterFinding]);
  return (
    <Container
      contentStyle={[
        BaseStyles.baseContent,
        {
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}>
      <Animated.View style={{ transform: [{ translateY: anim }] }}>
        <CustomIcon
          name={'map-marker-alt'}
          type={IconType.FONTAWESOME}
          size={48}
          focused={true}
          custom={{ style: [BaseStyles.textShadow] }}
        />
      </Animated.View>
      <Text style={[BaseFontStyles.body1, BaseStyles.ml_5]}>
        Đang tìm vị trí của bạn...
      </Text>
    </Container>
  );
};

export default FindYourPositionContent;

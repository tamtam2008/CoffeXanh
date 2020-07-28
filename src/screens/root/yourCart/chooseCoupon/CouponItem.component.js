import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { BaseFontStyles, BaseStyles } from '../../../../constants/BaseStyles';
import CustomIcon from '../../../../components/CustomIcon';
import { IconType } from '../../../../constants/Icon';
import Colors from '../../../../constants/Colors';
import moment from 'moment';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import useRootNavigation from '../../../../utils/useRootNavigation';

moment.locale(i18next.language);
const navigation = useRootNavigation();
const CouponItem = ({ value, selected, onPress }) => {
  const { title, couponName, to, inValid } = value;
  const { t } = useTranslation();
  return (
    <TouchableOpacity
      onPress={() => {
        onPress(selected ? null : value);
        navigation.navigate('cart');
      }}
      disabled={!inValid}
      style={StyleSheet.flatten({
        marginBottom: 10,
      })}>
      <ListItem
        title={
          <View style={[BaseStyles.flexColumn]}>
            <Text
              style={[
                BaseFontStyles.body1,
                { color: inValid ? Colors.gray : Colors.lightGray },
              ]}
              numberOfLines={2}
              lineBreakMode={'tail'}>
              {title}
            </Text>
            <Text style={[BaseFontStyles.body1, { color: Colors.lightGray }]}>
              {couponName}
            </Text>
            <Text
              style={[
                BaseFontStyles.caption,
                { color: inValid ? Colors.gray : Colors.lightGray },
              ]}>
              {t('ChooseCoupon.time', {
                date: moment(to).format('DD/MM/YYYY'),
              })}
            </Text>
          </View>
        }
        leftElement={
          // <Image
          //   source={require('../../../../../assets/images/4.png')}
          //   style={StyleSheet.flatten({ height: 48, width: 48 })}
          // />
          <CustomIcon
            name="ticket-alt"
            type={IconType.FONTAWESOME}
            size={24}
            focused={inValid}
          />
        }
        rightElement={
          selected ? (
            <CustomIcon
              name={'check'}
              type={IconType.FONTAWESOME}
              size={20}
              focused
            />
          ) : (
            <View style={StyleSheet.flatten({ width: 20 })} />
          )
        }
        containerStyle={StyleSheet.flatten({
          ...BaseStyles.baseContainer,
          backgroundColor: inValid ? Colors.layoutBGColor : Colors.lighterGray,
        })}
      />
    </TouchableOpacity>
  );
};

export default CouponItem;

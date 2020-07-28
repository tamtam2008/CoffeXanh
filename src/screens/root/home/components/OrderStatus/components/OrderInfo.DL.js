import React from 'react';

import { Linking, Platform, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  BaseFontStyles,
  BaseStyles,
} from '../../../../../../constants/BaseStyles';
import XButton2 from '../../../../../../components/XButton2';
import Colors from '../../../../../../constants/Colors';
import { Avatar, ListItem } from 'react-native-elements';
import Layout from '../../../../../../constants/Layout';
import HTML from 'react-native-render-html';
import XButton from '../../../../../../components/XButton';
import moment from 'moment';
import 'moment/locale/vi';
import i18next from 'i18next';

moment.locale(i18next.language);
const OrderInfoDL = ({ data }) => {
  const { t } = useTranslation();
  const { receiveTime, receiveAddress, currentStatus } =
    data?.detailOrder[0] || {};
  const { driverName, vehicleNumber, shared_link } = data?.orderDriver[0] || {};
  const driverPhone = '0342387350';
  return (
    <View>
      <Text style={[BaseFontStyles.body1]}>
        {t(`OrderDetail.msg.${currentStatus}`)}
      </Text>
      <ListItem
        leftElement={
          <Avatar
            rounded
            source={{
              uri:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTW__rQDpyOPZ1mgyvhg0_nRvJBKGkVkw1Dbw&usqp=CAU',
            }}
            title={driverName}
            size={60}
            containerStyle={{
              backgroundColor: Colors.lightGray,
              ...BaseStyles.boxWithShadow,
            }}
          />
        }
        title={
          <View style={[BaseStyles.flexColumn]}>
            <Text style={[BaseFontStyles.menuOrBody2]}>{driverName}</Text>
            <Text style={[BaseFontStyles.body1, styles.vehicleLicense]}>
              {vehicleNumber}
            </Text>
            <Text style={[BaseFontStyles.body1, styles.textLightGray]}>
              {driverPhone}
            </Text>
          </View>
        }
        rightElement={
          <XButton
            title={'Gọi'}
            style={{ width: 100 }}
            onPress={() => {
              console.log('callNumber ----> ', driverPhone);
              let phoneNumber = driverPhone;
              if (Platform.OS !== 'android') {
                phoneNumber = `telprompt:${driverPhone}`;
              } else {
                phoneNumber = `tel:${driverPhone}`;
              }
              Linking.canOpenURL(phoneNumber)
                .then(supported => {
                  if (!supported) {
                    alert('Phone number is not available');
                  } else {
                    return Linking.openURL(phoneNumber);
                  }
                })
                .catch(err => console.log(err));
            }}
          />
        }
        containerStyle={{
          backgroundColor: Colors.backgroundColor,
          marginTop: 10,
          paddingVertical: 10,
          marginHorizontal: -16,
          ...BaseStyles.boxWithShadow,
        }}
      />
      <View style={[BaseStyles.flexRow]}>
        <View style={[BaseStyles.flexColumn, { width: '60%' }]}>
          <Text style={[BaseFontStyles.body1, styles.textLightGray]}>
            Giao Hàng đến
          </Text>
          <Text
            style={[BaseFontStyles.body1]}
            numberOfLines={3}
            lineBreakMode={'tail'}>
            {receiveAddress}
          </Text>
        </View>
        <View style={[BaseStyles.flexColumn, { width: '40%' }]}>
          <Text
            style={[
              BaseFontStyles.body1,
              styles.textLightGray,
              { textAlign: 'right' },
            ]}>
            Dự kiến giao hàng
          </Text>
          <Text
            style={[BaseFontStyles.body1, { textAlign: 'right' }]}
            numberOfLines={3}
            lineBreakMode={'tail'}>
            {moment().to(receiveTime)}
          </Text>
        </View>
      </View>
      <ListItem
        containerStyle={{ paddingHorizontal: 0, paddingBottom: 0 }}
        rightElement={<XButton2 title={'Chi tiết'} style={styles.btn} />}
      />
    </View>
  );
};

export default OrderInfoDL;

const styles = StyleSheet.create({
  detailContent: {
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  textLightGray: {
    color: Colors.lightGray,
  },
  btn: {
    width: 100,
  },
  vehicleLicense: {
    backgroundColor: '#fff',
    borderColor: Colors.lightGray,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    width: 110,
    textAlign: 'center',
  },
});

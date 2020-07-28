import React from 'react';

import {FlatList, Linking, Text, View} from 'react-native';
import {BaseFontStyles, BaseStyles,} from '../../../../../constants/BaseStyles';
import LazyImage from '../../../../../components/LazyImage';
import {useTranslation} from 'react-i18next';
import Layout from "../../../../../constants/Layout";
import XButton2 from "../../../../../components/XButton2";
import XButton from "../../../../../components/XButton";
import useRootNavigation from "../../../../../utils/useRootNavigation";

const navigation = useRootNavigation();
const widthItem = Layout.window.width * 0.6 - 10;
const RewardsComponent = ({data}) => {
  const {t} = useTranslation();
  return data.length > 0 ? (
    <View style={[BaseStyles.mt_16, {marginHorizontal: -16}]}>
      <Text style={[BaseFontStyles.title, BaseStyles.ml_16, BaseStyles.mb_5]}>
        {t('Home.Rewards.title')}
      </Text>
      {data.length > 0
        ? <FlatList
          data={data}
          renderItem={({item}) => (
            <View style={[BaseStyles.boxWithShadow, {
              marginHorizontal: 5,
              backgroundColor: '#fff',
              borderRadius: 5,
              width: widthItem,
            }]}>
              <LazyImage
                url={item.thumb}
                width={widthItem}
                height={widthItem * 2 / 3}
                style={{borderTopRightRadius: 5, borderTopLeftRadius: 5}}
              />
              <View style={[BaseStyles.flexColumn, {padding: 10, paddingBottom: 10}]}>
                <Text style={[BaseFontStyles.menuOrBody2, BaseStyles.mb_10]} numberOfLines={1}
                      lineBreakMode={'tail'}>{item.name}</Text>
                {item?.orderNow == 1
                  ? (<XButton title={'Đặt ngay'} onPress={() => {
                    navigation.navigate('menu');
                  }}/>)
                  : (<XButton2 title={'Chi tiết'} onPress={async () => {
                    // Checking if the link is supported for links with custom URL scheme.
                    const supported = await Linking.canOpenURL(item?.link);

                    if (supported) {
                      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                      // by some browser in the mobile
                      await Linking.openURL(item?.link);
                    } else {
                      console.log('Can not open link', item?.link);
                    }
                  }}/>)}
              </View>
            </View>
          )}
          keyExtractor={(item, idx) => idx}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{padding: 5, paddingHorizontal: 11}}
        />
        : <Text style={[BaseFontStyles.body1, BaseStyles.ml_16]}>{t('Home.Rewards.empty')}</Text>}
    </View>
  ) : null;
};

export default RewardsComponent;

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Text, View, Image, StyleSheet } from 'react-native';
import Container from '../../../components/layout/Container';
import useRootNavigation from '../../../utils/useRootNavigation';
import NoticeUtils from '../../../session/NoticeUtils';
import { dynamicSort } from '../../../utils/AppUtils';
import { ListItem } from 'react-native-elements';
import { BaseFontStyles, BaseStyles } from '../../../constants/BaseStyles';
import Colors from '../../../constants/Colors';

const navigation = useRootNavigation();
const NotiScreen = ({}) => {
  const { t } = useTranslation();
  const [notiData, setNotiData] = useState(
    NoticeUtils.notices().sort(dynamicSort('sentTime', 'desc')),
  );
  useLayoutEffect(() => {
    const cb = NoticeUtils.addCallBack(() => {
      setNotiData(NoticeUtils.notices().sort(dynamicSort('sentTime', 'desc')));
    });
    return () => {
      NoticeUtils.removeCallBack(cb);
    };
  }, []);
  return (
    <Container
      isFail={notiData.length === 0}
      failMsg={t('NotiScreen.emptyMsg')}>
      <FlatList
        data={notiData}
        renderItem={({ item }) => (
          <ListItem
            title={
              <View style={[BaseStyles.flexColumn]}>
                <Text
                  style={[BaseFontStyles.menuOrBody2]}
                  numberOfLines={1}
                  lineBreakMode={'tail'}>
                  {item.notification.title}
                </Text>
                <Text
                  style={[BaseFontStyles.body1]}
                  numberOfLines={2}
                  lineBreakMode={'tail'}>
                  {item.notification.body}
                </Text>
              </View>
            }
            leftElement={
              <Image
                source={
                  item?.data?.type
                    ? icon[(item?.data?.type)] ??
                      require('../../../../assets/images/1.png')
                    : require('../../../../assets/images/1.png')
                }
                style={{ width: 36, height: 36 }}
              />
            }
            rightElement={
              <View
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: Colors.red,
                  borderRadius: 5,
                }}
              />
            }
            containerStyle={{
              ...BaseStyles.boxWithShadow,
              marginVertical: 5,
              borderRadius: 5,
              marginHorizontal: 16,
            }}
          />
        )}
      />
    </Container>
  );
};

const icon = {
  1: require('../../../../assets/images/3.png'),
  2: require('../../../../assets/images/3.png'),
  3: require('../../../../assets/images/2.png'),
};

export default NotiScreen;

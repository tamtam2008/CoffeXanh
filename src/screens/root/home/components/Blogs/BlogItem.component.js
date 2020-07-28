import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Card} from 'react-native-elements';
import {
  BaseFontStyles,
  BaseStyles,
} from '../../../../../constants/BaseStyles';
import Layout from '../../../../../constants/Layout';
import XButton2 from '../../../../../components/XButton2';
import useRootNavigation from '../../../../../utils/useRootNavigation';
import {useTranslation} from 'react-i18next';
import Colors from '../../../../../constants/Colors';
import LazyImage from "../../../../../components/LazyImage";

const widthItem = Layout.window.width * 0.6 - 10;
const BlogItemComponent = ({data}) => {
  const navigation = useRootNavigation();
  const {t} = useTranslation();
  return (
    <View style={[styles.container, BaseStyles.boxWithShadow]}>
      <LazyImage
        url={data?.thumb ?? ''}
        style={styles.image}
        width={widthItem}
        height={widthItem * 2 / 3}/>
      <View style={{padding: 10}}>
      <Text
        style={[BaseFontStyles.menuOrBody2]}
        numberOfLines={2}
        lineBreakMode="tail">
        {(data?.ten ?? '...')}
      </Text>
      <Text
        style={[BaseFontStyles.body1, BaseStyles.mb_16]}
        numberOfLines={3}
        lineBreakMode="tail">
        {data?.mota ?? '...'}
      </Text>
        <XButton2
          title={t('Home.BlogItem.detail')}
          onPress={() => {
            navigation.navigate('blogDetail', {
              id: data.id,
              title: data.ten,
              image: data.thumb,
            });
          }}
        />
      </View>
    </View>
  );
};

export default BlogItemComponent;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    width: widthItem,
  },
  image: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  title: {
    color: Colors.tintColor,
  },
});

import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Card } from 'react-native-elements';
import { BaseFontStyles } from '../../../../../constants/BaseStyles';
import Layout from '../../../../../constants/Layout';
import XButton2 from '../../../../../components/XButton2';
import useRootNavigation from '../../../../../utils/useRootNavigation';
import { useTranslation } from 'react-i18next';

const BlogItem = ({ data }) => {
  const navigation = useRootNavigation();
  const { t } = useTranslation();
  return (
    <View style={[styles.container]}>
      <Card
        image={{ uri: data.thumb }}
        imageStyle={styles.image}
        containerStyle={StyleSheet.flatten({
          borderRadius: 5,
          margin: 10,
        })}>
        <Text
          style={[BaseFontStyles.menuOrBody2]}
          numberOfLines={2}
          lineBreakMode="tail">
          {data.ten}
        </Text>
        <Text
          style={[BaseFontStyles.body1]}
          numberOfLines={3}
          lineBreakMode="tail">
          {data.noidung}
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
      </Card>
    </View>
  );
};

export default BlogItem;

const styles = StyleSheet.create({
  container: {
    width: Layout.window.width * 0.5,
    borderRadius: 5,
  },
  image: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});

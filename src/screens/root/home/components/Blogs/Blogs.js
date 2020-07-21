import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import {
  BaseFontStyles,
  BaseStyles,
} from '../../../../../constants/BaseStyles';
import BlogItem from './BlogItem';
import { useTranslation } from 'react-i18next';

const Blogs = ({ data }) => {
  const { t } = useTranslation();
  return (
    <View style={[styles.container]}>
      <View style={[styles.title]}>
        <Text style={[BaseFontStyles.title]}>Blogs</Text>
      </View>
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal
        />
      ) : (
        <Text
          style={[BaseFontStyles.body1, BaseStyles.ml_16, BaseStyles.mt_10]}>
          {t('Home.Blogs.empty')}
        </Text>
      )}
    </View>
  );
};

const renderItem = ({ item }) => {
  return <BlogItem data={item} />;
};

export default Blogs;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 6,
  },
  title: {
    paddingHorizontal: 16,
  },
});

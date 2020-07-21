import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import LazyImage from '../../../../../../../components/LazyImage';
import XButton from '../../../../../../../components/XButton';
import { BaseFontStyles } from '../../../../../../../constants/BaseStyles';
import Colors from '../../../../../../../constants/Colors';
import Layout from '../../../../../../../constants/Layout';
import { formatCurrency } from '../../../../../../../utils/formatUtils';

const ProductDetailContent = props => {
  const { style, state, closeAction } = props;
  const { detailProduct, photo } = state.data || { photo: [] };
  const entries =
    photo
      .filter(val => val.image)
      .map(val => ({
        image: {
          url: val.image,
        },
      })) || [];
  console.log(state.data);
  return (
    <View style={style}>
      <ScrollView>
        <View style={[styles.container]}>
          <RenderCarousel {...{ entries }} />
          <Text style={[BaseFontStyles.title, styles.productName]}>
            {detailProduct.tenSp}
          </Text>
          <Text style={[BaseFontStyles.menuOrBody2, styles.price]}>
            {formatCurrency(detailProduct.giaban)}
          </Text>
          <Text style={[BaseFontStyles.body1, styles.description]}>
            {detailProduct.mota}
          </Text>
          <XButton title={'Đóng'} onPress={closeAction} />
        </View>
      </ScrollView>
    </View>
  );
};

const _renderItem = ({ item, index }) => {
  const { image } = item;
  console.log(index, item);
  return (
    <ImageBackground
      source={require('./../../../../../../../../assets/images/1.png')}
      style={[styles.imageContainer]}
      imageStyle={styles.imageBG}>
      {!!image && (
        <LazyImage
          url={image.url || ''}
          headers={image.headers || {}}
          style={styles.imageContainer}
        />
      )}
    </ImageBackground>
  );
};

const RenderCarousel = props => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { entries } = props;
  return (
    <View>
      <Carousel
        data={entries}
        renderItem={_renderItem}
        onSnapToItem={index => setActiveSlide(index)}
        sliderWidth={Layout.window.width * 0.9 - 32}
        itemWidth={Layout.window.width * 0.9 - 32}
      />
      {pagination({ entries, activeSlide, setActiveSlide })}
    </View>
  );
};

const pagination = props => {
  const { entries, activeSlide } = props;
  return (
    <Pagination
      dotsLength={entries.length}
      activeDotIndex={activeSlide}
      containerStyle={styles.containerStyle}
      dotStyle={styles.dotStyle}
      inactiveDotStyle={styles.inactiveDotStyle}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
    />
  );
};

export default ProductDetailContent;

const styles = StyleSheet.create({
  container: {
    maxHeight: Layout.window.height * 0.9,
    borderRadius: 5,
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: Colors.tintColor,
  },
  inactiveDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  containerStyle: { backgroundColor: 'rgba(0, 0, 0, 0.0)', paddingTop: 5 },
  imageContainer: {
    width: Layout.window.width * 0.9 - 32,
    height: Layout.window.width * 0.9 - 32,
    backgroundColor: 'rgba(194,194,194,0.5)',
    borderRadius: 5,
    marginRight: 10,
  },
  imageBG: {
    width: Layout.window.width * 0.9 - 42,
    height: Layout.window.width * 0.9 - 42,
    margin: 5,
  },
  productName: {
    textAlign: 'center',
    paddingTop: 5,
  },
  price: {
    textAlign: 'center',
    color: Colors.tintColor,
  },
  description: {
    textAlign: 'center',
    marginVertical: 10,
  },
});

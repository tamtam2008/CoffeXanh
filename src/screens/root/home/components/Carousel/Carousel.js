import React, { useState } from 'react';
import { Linking, TouchableWithoutFeedback, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import LazyImage from '../../../../../components/LazyImage';
import { BaseStyles } from '../../../../../constants/BaseStyles';
import Layout from '../../../../../constants/Layout';
import styles from './Carousel.style';

const CarouselComponent = ({ data }) => {
  const entries =
    data?.map(val => ({
      image: val.thumb,
      link: val.link,
    })) || [];
  return (
    <View style={[styles.container]}>
      {entries.length > 0 && <RenderCarousel {...{ entries }} />}
    </View>
  );
};
const _renderItem = ({ item, index }) => {
  const { image, link } = item;
  console.log('CarouselComponent', index, item);
  return (
    <TouchableWithoutFeedback
      style={[BaseStyles.boxWithShadow, styles.imageContainer]}
      onPress={async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(link);

        if (supported) {
          // Opening the link with some app, if the URL scheme is "http" the web link should be opened
          // by some browser in the mobile
          await Linking.openURL(link);
        }
      }}>
      {!!image && <LazyImage url={image || ''} style={styles.imageContainer} />}
    </TouchableWithoutFeedback>
  );
};
const RenderCarousel = props => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { entries } = props;
  return (
    <View style={styles.carouselContainer}>
      <Carousel
        data={entries}
        renderItem={_renderItem}
        onSnapToItem={index => setActiveSlide(index)}
        sliderWidth={Layout.window.width - 32}
        itemWidth={Layout.window.width - 32}
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

export default CarouselComponent;

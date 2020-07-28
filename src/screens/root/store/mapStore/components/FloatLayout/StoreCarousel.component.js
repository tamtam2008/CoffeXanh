import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  BaseFontStyles,
  BaseStyles,
} from '../../../../../../constants/BaseStyles';
import Layout from '../../../../../../constants/Layout';
import Carousel from 'react-native-snap-carousel/src/carousel/Carousel';
import LazyImage from '../../../../../../components/LazyImage';
import Colors from '../../../../../../constants/Colors';

const StoreCarousel = ({ store, district, mapRef, style }) => {
  const moveToStore = useCallback(
    pos => {
      mapRef.current?.animateCamera({
        center: pos,
        zoom: 18,
      });
    },
    [mapRef],
  );
  console.log(store);
  return (
    <View style={style}>
      <Carousel
        data={store}
        onSnapToItem={index => {
          const gps = store[index].mapGps
            .trim()
            .split(',')
            .map(_s => Number.parseFloat(_s));
          moveToStore({
            latitude: gps[0],
            longitude: gps[1],
          });
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[BaseStyles.flexColumn, BaseStyles.baseContainer]}
            onPress={() => {
              const gps = item.mapGps
                .trim()
                .split(',')
                .map(_s => Number.parseFloat(_s));
              moveToStore({
                latitude: gps[0],
                longitude: gps[1],
              });
            }}>
            <View
              style={{
                marginHorizontal: -16,
                marginTop: -16,
                marginBottom: 16,
              }}>
              <LazyImage
                url={item.image}
                width={Math.max(Layout.window.width * 0.6, 300)}
                height={100}
                style={{
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                  backgroundColor: Colors.lightGray,
                }}
              />
            </View>
            <Text
              style={[BaseFontStyles.menuOrBody2]}
              numberOfLines={1}
              lineBreakMode={'tail'}>
              {district.name}
            </Text>
            <Text
              style={[BaseFontStyles.body1]}
              numberOfLines={1}
              lineBreakMode={'tail'}>
              {item.address}
            </Text>
          </TouchableOpacity>
        )}
        sliderWidth={Layout.window.width}
        itemWidth={Math.max(Layout.window.width * 0.6, 300)}
        contentContainerCustomStyle={{ padding: 5 }}
      />
    </View>
  );
};

export default StoreCarousel;

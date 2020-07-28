import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Colors from '../constants/Colors';

export default function LazyImage({
  url = '',
  headers = {},
  priority,
  width,
  height,
  style,
}) {
  const _style = {
    ...style,
    width: width ? width : '100%',
    height: height ? height : '100%',
  };
  const [isLoading, setLoading] = useState(true);
  return (
    <View>
      <FastImage
        style={_style}
        tintColor={'rbga(0,0,0,0.5)'}
        source={{
          uri: url,
          headers: headers,
          priority: priority ? priority : FastImage.priority.normal,
          cache: FastImage.cacheControl.immutable,
        }}
        resizeMode={FastImage.resizeMode.cover}
        fallback={true}
        onLoadEnd={() => {
          setLoading(false);
        }}
      />
      {isLoading && (
        <ActivityIndicator
          style={[StyleSheet.absoluteFillObject]}
          size={50}
          color={Colors.tintColor}
        />
      )}
    </View>
  );
}

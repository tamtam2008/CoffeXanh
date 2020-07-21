import React from 'react';
import FastImage from 'react-native-fast-image';

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
  return (
    <FastImage
      style={_style}
      tintColor={'rbga(0,0,0,0)'}
      source={{
        uri: url,
        headers: headers,
        priority: priority ? priority : FastImage.priority.normal,
        cache: FastImage.cacheControl.immutable,
      }}
      resizeMode={FastImage.resizeMode.cover}
      fallback={true}
    />
  );
}

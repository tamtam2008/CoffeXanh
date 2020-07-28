import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

const indicatorSize = Layout.window.width * 0.1;
const FallBack = () => {
  return (
    <View style={[styles.content]}>
      <ActivityIndicator size={indicatorSize} color={Colors.tintColor} />
    </View>
  );
};

export default FallBack;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
  },
});

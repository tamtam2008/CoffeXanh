import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Layout from '../../constants/Layout';
import { BaseStyles, BaseFontStyles } from '../../constants/BaseStyles';
import Colors from '../../constants/Colors';

const FallBack = () => {
  return (
    <View style={[styles.content]}>
      <View style={[BaseStyles.flexColumn]}>
        <ActivityIndicator
          size={Layout.window.width * 0.1}
          color={Colors.tintColor}
        />
        {/* <Text
          style={[BaseFontStyles.body1, styles.textCenter, BaseStyles.mt_10]}>
          Đang tải
        </Text> */}
      </View>
    </View>
  );
};

export default FallBack;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: Colors.backgroundColor,
  },
  textCenter: {
    textAlign: 'center',
  },
});

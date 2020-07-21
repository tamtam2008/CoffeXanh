import React from 'react';
import { Text, View } from 'react-native';
import XModal from '../../../../../../components/layout/XModal';

export default function CouponModal({ visible, onClose }) {
  return (
    <XModal visible={visible} onClose={onClose}>
      <View>
        <Text>111</Text>
      </View>
    </XModal>
  );
}

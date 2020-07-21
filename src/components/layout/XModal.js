import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';

const XModal = ({ animationType, visible, onClose, children }) => {
  return (
    <Modal
      animationType={animationType ? animationType : 'fade'}
      transparent={true}
      visible={visible || false}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>{children}</View>
    </Modal>
  );
};

export default XModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(83,82,82,0.9)',
  },
});

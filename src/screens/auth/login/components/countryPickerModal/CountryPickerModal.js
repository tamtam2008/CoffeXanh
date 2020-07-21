import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Image } from 'react-native-elements';
import {} from 'react-native-gesture-handler';
import CustomIcon from '../../../../../components/CustomIcon';
import XModal from '../../../../../components/layout/XModal';
import XButton2 from '../../../../../components/XButton2';
import {
  BaseFontStyles,
  BaseStyles,
} from '../../../../../constants/BaseStyles';
import Colors from '../../../../../constants/Colors';
import Layout from '../../../../../constants/Layout';
import CountryData from '../countryData';

const CountryPickerModal = ({
  visible,
  chooseCountry,
  onSelectItem,
  onClose,
}) => {
  return (
    <XModal visible={visible} onClose={onClose}>
      <View style={[BaseStyles.boxWithShadow, styles.container]}>
        <Text style={[BaseFontStyles.menuOrBody2, styles.title, styles.line]}>
          Chọn Quốc gia
        </Text>
        <View style={styles.content}>
          {CountryData.map((data, idx) =>
            renderItem(data, idx, chooseCountry, onSelectItem, onClose),
          )}
        </View>
        <View style={styles.footer}>
          <XButton2 title={'Đóng'} onPress={onClose} />
        </View>
      </View>
    </XModal>
  );
};

const renderItem = (data, idx, chooseCountry, onSelectItem, onClose) => (
  <View style={CountryData.length - 1 > idx ? styles.line : null} key={idx}>
    <TouchableOpacity
      onPress={() => {
        onSelectItem(data);
        onClose();
      }}
      style={[BaseStyles.flexRow, styles.group2]}>
      <View style={[BaseStyles.flexRow, styles.group1]}>
        <Image
          source={{ uri: data.image }}
          style={styles.flag}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text style={[BaseFontStyles.subHeader, BaseStyles.ml_10]}>
          {`${data.name} (${data.callingCode})`}
        </Text>
      </View>
      {data.code === chooseCountry && <CustomIcon name="check" focused />}
    </TouchableOpacity>
  </View>
);

export default CountryPickerModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: Math.min(Layout.window.width * 0.9, 350),
    borderRadius: 5,
  },
  group1: {
    width: '70%',
  },
  group2: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  flag: { width: 30, height: 20 },
  title: {
    padding: 16,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: Colors.lightGray,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: Colors.lightGray,
    padding: 16,
  },
  content: {
    paddingHorizontal: 16,
  },
});

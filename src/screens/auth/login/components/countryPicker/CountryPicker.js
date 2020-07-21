import React, { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Image } from 'react-native-elements';
import { BaseFontStyles } from '../../../../../constants/BaseStyles';
import Colors from '../../../../../constants/Colors';
import { normalize } from '../../../../../constants/Layout';
import CountryData from '../countryData';
import CountryPickerModal from '../countryPickerModal/CountryPickerModal';

const CountryPicker = ({ countryCode, onSelect }) => {
  const _data = CountryData.filter(d => d.code === countryCode);
  const [data, setData] = useState(_data > 0 ? _data[0] : CountryData[0]);
  const [modal, showModal] = useState(false);
  return (
    // <TouchableOpacity>
    <TouchableOpacity
      style={[styles.countryPicker]}
      onPress={() => {
        showModal(true);
      }}>
      <CountryPickerModal
        visible={modal}
        chooseCountry={data.code}
        onSelectItem={d => {
          onSelect(d);
          setData(d);
        }}
        onClose={() => {
          showModal(false);
        }}
      />
      <Image
        source={{ uri: data.image }}
        style={styles.flag}
        PlaceholderContent={<ActivityIndicator />}
      />
      <Text style={[BaseFontStyles.subHeader]}>{data.callingCode}</Text>
    </TouchableOpacity>
    // </TouchableOpacity>
  );
};

export default CountryPicker;

const styles = StyleSheet.create({
  countryPicker: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Colors.lightGray,
    width: normalize(85),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  flag: { width: 30, height: 20 },
});

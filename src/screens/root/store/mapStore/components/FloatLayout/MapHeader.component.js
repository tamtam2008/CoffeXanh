import React, { useCallback, useState } from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  BaseFontStyles,
  BaseStyles,
} from '../../../../../../constants/BaseStyles';
import Colors from '../../../../../../constants/Colors';
import CustomIcon from '../../../../../../components/CustomIcon';
import { IconType } from '../../../../../../constants/Icon';
import Layout from '../../../../../../constants/Layout';
import ChooseProvinceOrDistrictModal from '../Modal/ChooseProvinceOrDistrict.modal';

const MapHeader = ({ province, district, filter, updateFilter }) => {
  const [visibleProvinceModal, showProvinceModal] = useState(false);
  const [visibleDistrictModal, showDistrictModal] = useState(false);

  const onSubmit = useCallback(
    (id, isProvince) => {
      updateFilter(
        isProvince
          ? {
              provinceId: id,
              districtId: province.filter(val => val.id === id)[0].listDist[0]
                .distId,
            }
          : { provinceId: filter.province.id, districtId: id },
      );
    },
    [filter.province.id, province, updateFilter],
  );
  return (
    <View style={[BaseStyles.baseContent, BaseStyles.flexRow, styles.content]}>
      <TouchableOpacity
        style={[styles.chooseLayout, BaseStyles.flexRow]}
        onPress={() => showProvinceModal(true)}>
        <Text
          style={[BaseFontStyles.body1, styles.chooseItem, BaseStyles.mr_10]}
          numberOfLines={1}
          lineBreakMode={'tail'}>
          {filter?.province.name}
        </Text>
        <CustomIcon name={'sort-down'} type={IconType.FONTAWESOME} size={18} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.chooseLayout, BaseStyles.flexRow]}
        onPress={() => showDistrictModal(true)}>
        <Text
          style={[BaseFontStyles.body1, styles.chooseItem, BaseStyles.mr_10]}
          numberOfLines={1}
          lineBreakMode={'tail'}>
          {filter?.district.name}
        </Text>
        <CustomIcon name={'sort-down'} type={IconType.FONTAWESOME} size={18} />
      </TouchableOpacity>
      <ChooseProvinceOrDistrictModal
        visible={visibleProvinceModal || visibleDistrictModal}
        data={visibleProvinceModal ? province : district}
        selected={
          visibleProvinceModal ? filter.province.id : filter.district.id
        }
        onClose={() => {
          showProvinceModal(false);
          showDistrictModal(false);
        }}
        isProvince={visibleProvinceModal}
        onSubmit={onSubmit}
      />
    </View>
  );
};

export default MapHeader;

const styles = StyleSheet.create({
  content: {
    justifyContent: 'space-between',
  },
  chooseLayout: {
    borderRadius: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    backgroundColor: '#fff',
    paddingTop: 7,
    paddingBottom: 8,
    width: Layout.window.width / 2 - 20,
    justifyContent: 'space-between',
    ...BaseStyles.boxWithShadow,
  },
  chooseItem: {
    paddingHorizontal: 10,
  },
});

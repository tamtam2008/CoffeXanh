import React from 'react';

import { FlatList, StyleSheet, Text, View } from 'react-native';
import XModal from '../../../../../../components/layout/XModal';
import { Divider, ListItem } from 'react-native-elements';
import Layout from '../../../../../../constants/Layout';
import CustomIcon from '../../../../../../components/CustomIcon';
import { IconType } from '../../../../../../constants/Icon';
import { BaseFontStyles } from '../../../../../../constants/BaseStyles';

const ChooseProvinceOrDistrictModal = ({
  data,
  selected,
  visible,
  onClose,
  isProvince,
  onSubmit,
}) => {
  return (
    <XModal
      visible={visible}
      onClose={onClose}
      contentStyle={StyleSheet.flatten({
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'flex-end',
        alignContent: 'stretch',
      })}>
      <View
        style={[
          StyleSheet.flatten({
            backgroundColor: '#fff',
            width: Layout.window.width,
            maxHeight: Layout.window.height * 0.8,
          }),
        ]}>
        <Text
          style={[
            BaseFontStyles.menuOrBody2,
            StyleSheet.flatten({ textAlign: 'center', paddingVertical: 10 }),
          ]}>
          {isProvince ? 'Chọn tỉnh (thành phố)' : 'Chọn quận (huyện)'}
        </Text>
        <Divider />
        {(data || []).length > 0 ? (
          <FlatList
            data={data || []}
            renderItem={({ item }) => (
              <ListItem
                title={isProvince ? item.name : item.distName}
                titleStyle={BaseFontStyles.body1}
                bottomDivider
                rightElement={
                  (isProvince ? item.id : item.distId) === selected ? (
                    <CustomIcon
                      name={'check'}
                      type={IconType.FONTAWESOME}
                      size={18}
                      focused
                    />
                  ) : null
                }
                onPress={() => {
                  onClose();
                  if ((isProvince ? item.id : item.distId) !== selected) {
                    onSubmit(isProvince ? item.id : item.distId, isProvince);
                  }
                }}
              />
            )}
            keyExtractor={item => (isProvince ? item.id : item.distId).toString()}
          />
        ) : (
          <Text style={[BaseFontStyles.body1]}>Không có dữ liệu</Text>
        )}
      </View>
    </XModal>
  );
};

export default ChooseProvinceOrDistrictModal;

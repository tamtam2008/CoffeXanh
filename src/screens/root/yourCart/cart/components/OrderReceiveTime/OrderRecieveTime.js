import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import CustomIcon from '../../../../../../components/CustomIcon';
import {
  BaseFontStyles,
  BaseStyles,
} from '../../../../../../constants/BaseStyles';
import Colors from '../../../../../../constants/Colors';
import { IconType } from '../../../../../../constants/Icon';
import AppActions from '../../../../../../redux/app.actions';
import ChooseReceiveTime from './components/chooseReceiveTime/ChooseReceiveTime';
import styles from './OrderRecieveTime.style';
import formatDate from '../../../../../../utils/formatDate';

const OrderRecieveTime = ({ time, updateTime }) => {
  const [chooseRecieveTimeModal, showChooseRecieveTimeModal] = useState(false);
  return (
    <View>
      <Text style={styles.title}>Thời gian giao</Text>
      <TouchableOpacity
        onPress={() => showChooseRecieveTimeModal(true)}
        style={[
          BaseStyles.baseContainer,
          BaseStyles.flexRow,
          styles.centerItems,
          styles.container,
        ]}>
        <CustomIcon
          name="alarm"
          type={IconType.IONICON}
          size={24}
          custom={{ color: Colors.tintColor }}
          focused
        />
        <Text style={[BaseStyles.ml_10, BaseFontStyles.body1]}>
          {time.isEarlyRecieve
            ? 'Nhận sớm nhất có thể'
            : formatDate.getTime(new Date(time.date))}
        </Text>
      </TouchableOpacity>
      {chooseRecieveTimeModal && (
        <ChooseReceiveTime
          visible={chooseRecieveTimeModal}
          onClose={() => {
            showChooseRecieveTimeModal(false);
          }}
          {...{ time, updateTime }}
        />
      )}
    </View>
  );
};

const mapStateToProps = state => ({ time: state.cart.time });

const mapDispatchToProps = dispatch => ({
  updateTime: time =>
    dispatch({ type: AppActions.CART_UPDATE_TIME, payload: time }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderRecieveTime);

import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import XModal from '../../../../../../../../components/layout/XModal';
import XButton from '../../../../../../../../components/XButton';
import XButton2 from '../../../../../../../../components/XButton2';
import {
  BaseFontStyles,
  BaseStyles,
} from '../../../../../../../../constants/BaseStyles';
import Colors from '../../../../../../../../constants/Colors';
import formatDate from '../../../../../../../../utils/formatDate';
import styles from './ChooseRecieveTime.style';

const ChooseReceiveTime = props => {
  const { time, updateTime, onClose, visible } = props;
  const [isEarlyReceive, setEarlyReceive] = useState(time.isEarlyReceive);
  const current = new Date();
  const maxDate = new Date(current.getTime());
  maxDate.setDate(maxDate.getDate() + 5);
  const [date, setDate] = useState(
    time.date > 0 ? new Date(time.date) : current,
  );
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [isValid, setValid] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setValid(!checkTime(currentDate));
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const checkTime = currentDate => {
    const _time = new Date();
    _time.setMinutes(_time.getMinutes() + 30);
    // console.log(formatDate.toHours(currentDate), formatDate.toHours(_time));
    return currentDate.getTime() >= _time.getTime();
  };

  return (
    <XModal animationType={'fade'} visible={visible} onClose={onClose}>
      <View style={[BaseStyles.baseContainer, styles.container]}>
        <Text style={[BaseFontStyles.title]}>Thời gian hàng</Text>
        {isEarlyReceive ? (
          <View style={[BaseStyles.flexRow, styles.dateTime]}>
            <View style={[styles.dateTimeItem]}>
              <Text
                style={[BaseFontStyles.title, styles.dateTimeDetailDisable]}>
                {formatDate.toHours(date)}
              </Text>
            </View>
            <View style={[styles.dateTimeItem]}>
              <Text
                style={[BaseFontStyles.title, styles.dateTimeDetailDisable]}>
                {formatDate.toDate(date)}
              </Text>
            </View>
          </View>
        ) : (
          <View style={[BaseStyles.flexRow, styles.dateTime]}>
            <TouchableOpacity
              style={[styles.dateTimeItem]}
              onPress={showTimepicker}>
              <Text
                style={[
                  BaseFontStyles.title,
                  styles.dateTimeDetail,
                  isValid ? styles.redText : null,
                ]}>
                {formatDate.toHours(date)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.dateTimeItem]}
              onPress={showDatepicker}>
              <Text style={[BaseFontStyles.title, styles.dateTimeDetail]}>
                {formatDate.toDate(date)}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {isValid && (
          <Text style={[BaseFontStyles.caption, styles.redText]}>
            * Thời gian nhận hàng phải lớn hơn 30 phút kể từ khi đặt hàng.
          </Text>
        )}
        <View style={[BaseStyles.flexRow, styles.centerItems]}>
          <CheckBox
            center
            title="Nhận sớm nhất có thể"
            titleProps={{ style: BaseFontStyles.body1 }}
            containerStyle={styles.checkBox}
            iconType="material"
            checkedIcon="check-box"
            uncheckedIcon="check-box-outline-blank"
            checkedColor={Colors.tintColor}
            checked={isEarlyReceive}
            onPress={() => {
              if (isEarlyReceive) {
                setValid(!checkTime(date));
              }
              setEarlyReceive(!isEarlyReceive);
            }}
          />
        </View>
        <View
          style={[
            BaseStyles.flexRow,
            BaseStyles.mt_10,
            styles.footerContainer,
          ]}>
          <XButton2 title={'Huỷ'} style={styles.footerBtn} onPress={onClose} />
          <XButton
            title={'Chọn'}
            style={styles.footerBtn}
            onPress={() => {
              if (!isValid) {
                const _time = {};
                if (isEarlyReceive) {
                  _time.date = 0;
                  _time.isEarlyRecieve = true;
                } else {
                  _time.date = date.getTime();
                  _time.isEarlyRecieve = false;
                }
                // console.log(_time);
                updateTime(_time);
                onClose();
              }
            }}
            disabled={isValid}
          />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={date.getTimezoneOffset() * 60 * 60}
            value={date}
            mode={mode}
            is24Hour={true}
            minimumDate={current}
            maximumDate={maxDate}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
    </XModal>
  );
};

export default ChooseReceiveTime;

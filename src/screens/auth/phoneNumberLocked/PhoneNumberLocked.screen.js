import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Container from '../../../components/layout/Container';
import XButton from '../../../components/XButton';
import { BaseFontStyles, BaseStyles } from '../../../constants/BaseStyles';
import actions from '../../../redux/app.actions';
import store from '../../../redux/store';

const PhoneNumberLockedScreen = () => {
  return (
    <Container>
      <View style={[BaseStyles.baseContent]}>
        <Text style={[BaseFontStyles.title, styles.textCenter]}>
          Tài khoản đã tạm khoá
        </Text>

        <Text
          style={[BaseFontStyles.body1, styles.textCenter, BaseStyles.mt_16]}>
          Bạn đã thực hiện lấy OTP vượt quá số lần quy định. Vui lòng thực hiện
          lại sau 30 phút.
        </Text>
        <View style={[BaseStyles.mt_24]}>
          <XButton
            title={'Thoát ứng dụng'}
            onPress={() => store.dispatch({ type: actions.EXIT_APP })}
          />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  textCenter: {
    textAlign: 'center',
  },
});

export default PhoneNumberLockedScreen;

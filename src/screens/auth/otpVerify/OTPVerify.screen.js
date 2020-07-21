import React, { useEffect, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import TimerMixin from 'react-timer-mixin';
import Container from '../../../components/layout/Container';
import XLabelButon from '../../../components/XLabelButon';
import XTextBox from '../../../components/XTextBox';
import { BaseFontStyles, BaseStyles } from '../../../constants/BaseStyles';
import Colors from '../../../constants/Colors';
import { normalize } from '../../../constants/Layout';
import Controller from './OTPVerify.controller';
import styles from './OTPVerify.style';
import countDownReducer, { Actions } from './reducer/countDown.reducer';
import OTPVerifyReducer from './reducer/OTPVerify.reducer';

// enableScreens();

function OTPVerifyScreen({ phone, navigation }) {
  const [countDownState, countDownDispatch] = useReducer(
    countDownReducer.reducer,
    countDownReducer.initState,
  );
  const [state, dispatch] = useReducer(
    OTPVerifyReducer.reducer,
    OTPVerifyReducer.initState,
  );
  const [otp, setOtp] = useState('');
  const [isFirst, setIsFirst] = useState(true);
  const { t } = useTranslation();
  const [countDownTimer, setCountDownTimer] = useState(null);

  const onChangeText = code => {
    const newCode = code.trim();
    if (newCode.length >= 6) {
      Controller.login({ phone: phone, otp: newCode }, dispatch);
    }
    setOtp(newCode);
  };

  useEffect(() => {
    navigation.setOptions({
      title: t('otp_screen.screenName'),
    });
    const createCountDown = () => {
      if (countDownTimer) {
        TimerMixin.clearInterval(countDownTimer);
      }
      const timer = TimerMixin.setInterval(() => {
        if (countDownState.count <= 0) {
          TimerMixin.clearInterval(countDownTimer);
          setCountDownTimer(null);
        }
        countDownDispatch({ type: Actions.countDown });
      }, 1000);
      setCountDownTimer(timer);
    };
    if (isFirst) {
      createCountDown();
      setIsFirst(false);
      return () => {
        if (countDownTimer) {
          TimerMixin.clearInterval(countDownTimer);
          console.log('cancle timer');
        }
      };
    }
  }, [
    countDownTimer,
    countDownDispatch,
    isFirst,
    countDownState.count,
    navigation,
    t,
  ]);

  return (
    <Container
      isRequesting={state.isRequesting}
      style={[BaseFontStyles.body1, BaseStyles.baseContent]}>
      <View style={[styles.container]}>
        <Text>
          {t('otp_screen.title1')}
          <Text style={[BaseFontStyles.menuOrBody2, styles.phoneNumber]}>
            {phone}
          </Text>
          {t('otp_screen.title2')}
        </Text>
        <View style={styles.mTop}>
          <XTextBox
            onChange={onChangeText}
            onSubmit={() => onChangeText(otp)}
            value={otp}
            keyboardType="numeric"
            maxLength={6}
            size={normalize(200)}
            textAlign={'center'}
            autoFocus={true}
          />
        </View>
        {countDownState.count > 0 ? (
          <Text style={styles.mTop}>
            {t('otp_screen.getOtpAgain')} {`[${countDownState.count}]`}
          </Text>
        ) : (
          <XLabelButon
            title={t('otp_screen.getOtpAgain')}
            style={styles.mTop2}
            color={Colors.tintColor}
            onPress={() => {
              Controller.getNewOTP(
                {
                  phone,
                  onSuccess: () => {
                    countDownDispatch({ type: Actions.renew });
                    setIsFirst(true);
                  },
                },
                dispatch,
              );
            }}
          />
        )}
      </View>
    </Container>
  );
}

const mapStateToProps = state => {
  const { auth } = state;
  return {
    phone: auth.phone || '',
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OTPVerifyScreen);

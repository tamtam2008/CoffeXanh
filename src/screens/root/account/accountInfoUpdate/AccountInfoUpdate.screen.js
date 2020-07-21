import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { ScrollView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import RadioForm from 'react-native-simple-radio-button';
import { connect } from 'react-redux';
import Container from '../../../../components/layout/Container';
import XButton from '../../../../components/XButton';
import XTextBox2 from '../../../../components/XTextBox2';
import { BaseFontStyles, BaseStyles } from '../../../../constants/BaseStyles';
import Colors from '../../../../constants/Colors';
import Layout from '../../../../constants/Layout';
import Actions from './AccountInfoUpdate.actions';
import Controller from './AccountInfoUpdate.controller';
import AccountInfoUpdateScreenReducer from './AccountInfoUpdate.reducer';
import styles from './AccountInfoUpdate.style';

enableScreens();

const AccountInfoUpdateScreen = props => {
  const [state, dispacth] = React.useReducer(
    AccountInfoUpdateScreenReducer.reducer,
    AccountInfoUpdateScreenReducer.initState,
  );
  const { t } = useTranslation();
  const radio_props = [
    { label: t('sex.male'), value: 11 },
    { label: t('sex.female'), value: 12 },
  ];
  const { userInfo, userId } = props;
  const [name, setName] = useState(userInfo.name);
  const [dob, setDoB] = useState(addFormatDate(userInfo.dob));
  // const [phone, setPhone] = useState(props.phone);
  const [sex, setSex] = useState(userInfo.sex);
  const [error, setError] = useState({});

  const checkData = useCallback(() => {
    const e = {};
    if (name.trim().length === 0) {
      e.name = t('AccountInfoUpdateScreen.error.name');
    }
    if (dob.trim().length < 8) {
      e.dob = t('AccountInfoUpdateScreen.error.dob');
    }
    if (Object.keys(e).length === 0) {
      dispacth({ type: Actions.GetData_request });
      Controller.updateInfo(
        userId,
        {
          name,
          dob: getDateTime(dob).getTime(),
          sex,
        },
        () => {
          dispacth({ type: Actions.GetData_success });
        },
        () => {
          dispacth({ type: Actions.GetData_fail });
        },
      );
    } else {
      setError(e);
    }
  }, [dob, name, sex, t, userId]);
  return (
    <Container isRequesting={state.isRequesting}>
      <View style={[styles.flexContainer]}>
        <ScrollView style={[styles.flexContainer]}>
          <View style={[styles.flexContainer, styles.container]}>
            <Grid>
              <Row>
                <Col
                  style={[
                    BaseStyles.baseContainer2,
                    BaseStyles.mt_10,
                    styles.borderRadius,
                  ]}>
                  <Row style={[styles.row]}>
                    <Col>
                      <Row>
                        <Text
                          style={[BaseFontStyles.caption, BaseStyles.label]}>
                          {t('AccountInfoUpdateScreen.name')}
                        </Text>
                      </Row>
                      <Row>
                        <XTextBox2
                          maxLength={50}
                          value={name}
                          onChange={_name => {
                            setError({});
                            setName(_name);
                          }}
                          size={Layout.window.width - 64}
                          isValid={error.name}
                        />
                      </Row>
                      {error.name && (
                        <Row>
                          <Text
                            style={[BaseFontStyles.caption, styles.errorMsg]}>
                            {error.name}
                          </Text>
                        </Row>
                      )}
                    </Col>
                  </Row>
                  <Row style={[styles.row]}>
                    <Col>
                      <Row>
                        <Col>
                          <Row>
                            <Text
                              style={[
                                BaseFontStyles.caption,
                                BaseStyles.label,
                              ]}>
                              {t('AccountInfoUpdateScreen.dob')}
                            </Text>
                          </Row>
                          <Row>
                            <XTextBox2
                              maxLength={10}
                              value={dob}
                              onChange={(formatted, extracted) => {
                                setError({});
                                setDoB(formatted);
                              }}
                              keyboardType={'numeric'}
                              mask={'[00]/[00]/[0000]'}
                              size={85}
                              isValid={error.dob}
                              placeholder={'dd/mm/yyyy'}
                            />
                          </Row>
                          {error.dob && (
                            <Row>
                              <Text
                                style={[
                                  BaseFontStyles.caption,
                                  styles.errorMsg,
                                ]}>
                                {error.dob}
                              </Text>
                            </Row>
                          )}
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <Row>
                        <Text
                          style={[BaseFontStyles.caption, BaseStyles.label]}>
                          {t('AccountInfoUpdateScreen.sexTitle')}
                        </Text>
                      </Row>
                      <Row>
                        <RadioForm
                          radio_props={radio_props}
                          initial={userInfo.sex === 11 ? 0 : 1}
                          onPress={setSex}
                          buttonColor={Colors.gray}
                          buttonSize={12}
                          buttonOuterSize={24}
                          selectedButtonColor={Colors.tintColor}
                          labelColor={Colors.gray}
                          selectedLabelColor={Colors.tintColor}
                          formHorizontal={true}
                          style={styles.radioContainer}
                        />
                      </Row>
                    </Col>
                  </Row>
                  {/* <Row style={[styles.row]}>
                    <Col>
                      <Row>
                        <Text
                          style={[BaseFontStyles.caption, BaseStyles.label]}>
                          {t('AccountInfoScreen.phone')}
                        </Text>
                      </Row>
                      <Row>
                        <XTextBox2
                          maxLength={10}
                          value={phone}
                          onChange={setPhone}
                          size={90}
                        />
                      </Row>
                    </Col>
                  </Row> */}
                </Col>
              </Row>
            </Grid>
          </View>
        </ScrollView>
        <View style={[styles.saveBtnContainer]}>
          <XButton
            title={t('AccountInfoUpdateScreen.submitBtn')}
            onPress={() => {
              checkData();
            }}
          />
        </View>
      </View>
    </Container>
  );
};

const addFormatDate = timeStamp => {
  const date = new Date(timeStamp);
  const addZeroIfNeed = number => (number > 9 ? number : `0${number}`);
  return `${addZeroIfNeed(date.getDate())}/${addZeroIfNeed(
    date.getMonth() + 1,
  )}/${date.getFullYear()}`;
};

const getDateTime = dob => {
  const parts = dob.split('/');
  console.log('getDateTimed', dob, parts);
  return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
};

const mapStateToProps = state => ({
  userId: state.auth.userId,
  userInfo: state.auth.userInfo,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountInfoUpdateScreen);

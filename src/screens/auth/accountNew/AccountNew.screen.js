import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { enableScreens } from 'react-native-screens';
import RadioForm from 'react-native-simple-radio-button';
import Actions from './AccountNew.actions';
import Controller from './AccountNew.controller';
import AccountInfoUpdateScreenReducer from './AccountNew.reducer';
import styles from './AccountNew.style';
import moment from 'moment';
import SessionUtils from '../../../session/SessionUtils';
import Container from '../../../components/layout/Container';
import { BaseFontStyles, BaseStyles } from '../../../constants/BaseStyles';
import XTextBox2 from '../../../components/XTextBox2';
import Layout from '../../../constants/Layout';
import Colors from '../../../constants/Colors';
import XButton from '../../../components/XButton';
import { useFocusEffect } from '@react-navigation/core';
import { backButtonHandler } from '../../../utils/AppUtils';
import AppConfig from '../../../config/App.config';

enableScreens();
const DOB_FORMAT = 'DD/MM/YYYY';
const AccountNewScreen = (props) => {
  const [state, dispatch] = React.useReducer(
    AccountInfoUpdateScreenReducer.reducer,
    AccountInfoUpdateScreenReducer.initState,
  );
  const { t } = useTranslation();
  const radio_props = [
    { label: t('sex.male'), value: 11 },
    { label: t('sex.female'), value: 12 },
  ];
  const [name, setName] = useState('');
  const [dob, setDoB] = useState(
    moment(AppConfig.DefaultBOD).format(DOB_FORMAT),
  );
  const [sex, setSex] = useState(11);
  const [error, setError] = useState({});

  const checkData = useCallback(() => {
    const e = {};
    if (name.trim().length === 0) {
      e.name = t('AccountInfoUpdateScreen.error.name');
    }
    if (dob.trim().length < 8 || !moment(dob, DOB_FORMAT, true).isValid()) {
      e.dob = t('AccountInfoUpdateScreen.error.dob');
    }
    if (Object.keys(e).length === 0) {
      dispatch({ type: Actions.GetData_request });
      Controller.updateInfo(
        SessionUtils.session().userId,
        {
          name,
          dob: moment(dob, DOB_FORMAT).valueOf(),
          sex,
        },
        () => {
          // dispatch({ type: Actions.GetData_success });
        },
        () => {
          dispatch({ type: Actions.GetData_fail });
        },
      );
    } else {
      setError(e);
    }
  }, [dob, name, sex, t]);

  useFocusEffect(
    React.useCallback(backButtonHandler({ route: props.route }, [props.route])),
    [],
  );

  return (
    <Container isRequesting={state.isRequesting} scrollEnabled={false}>
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
                      <Text style={[BaseFontStyles.caption, BaseStyles.label]}>
                        {t('AccountInfoUpdateScreen.name')}
                      </Text>
                    </Row>
                    <Row>
                      <XTextBox2
                        maxLength={50}
                        value={name}
                        onChange={(_name) => {
                          setError({});
                          setName(_name);
                        }}
                        size={Layout.window.width - 64}
                        isError={error.name}
                      />
                    </Row>
                    {error.name && (
                      <Row>
                        <Text style={[BaseFontStyles.caption, styles.errorMsg]}>
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
                            style={[BaseFontStyles.caption, BaseStyles.label]}>
                            {t('AccountInfoUpdateScreen.dob')}
                          </Text>
                        </Row>
                        <Row>
                          <XTextBox2
                            maxLength={10}
                            value={dob}
                            onChange={(formatted, extracted) => {
                              setDoB(formatted);
                              console.log('update dob', extracted);
                            }}
                            keyboardType={'numeric'}
                            mask={'DD/MM/YYYY'}
                            maskType={'datetime'}
                            size={90}
                            isError={error.dob}
                            placeholder={'dd/mm/yyyy'}
                            textAlign={'center'}
                          />
                        </Row>
                        {error.dob && (
                          <Row>
                            <Text
                              style={[BaseFontStyles.caption, styles.errorMsg]}>
                              {error.dob}
                            </Text>
                          </Row>
                        )}
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <Text style={[BaseFontStyles.caption, BaseStyles.label]}>
                        {t('AccountInfoUpdateScreen.sexTitle')}
                      </Text>
                    </Row>
                    <Row>
                      <RadioForm
                        radio_props={radio_props}
                        initial={sex === 11 ? 0 : 1}
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
    </Container>
  );
};

export default AccountNewScreen;

import React, { useLayoutEffect, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Container from '../../../components/layout/Container';
import useRootNavigation from '../../../utils/useRootNavigation';
import PaymentReducer, { initialState } from './Payment.reducer';
import styles from './Payment.style';

const PaymentScreen = ({}) => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(PaymentReducer, initialState);
  const navigation = useRootNavigation();
  useLayoutEffect(() => {
    return () => {};
  }, []);
  return (
    <Container isFail={true} failMsg={'Tính năng đang được phát triển.'}>
      <ScrollView
        style={[styles.flexContainer]}
        contentContainerStyle={styles.contentContainer}
      />
    </Container>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentScreen);

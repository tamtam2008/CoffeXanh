import React, { useLayoutEffect, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Container from '../../../components/layout/Container';
import useRootNavigation from '../../../utils/useRootNavigation';
import OrderHistoryReducer, { initialState } from './OrderHistory.reducer';
import styles from './OrderHistory.style';

const OrderHistoryScreen = ({}) => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(OrderHistoryReducer, initialState);
  const navigation = useRootNavigation();
  useLayoutEffect(() => {
    return () => {};
  }, []);
  return (
    <Container isFail={true} failMsg={'Không có lịch sử đơn hàng nào.'}>
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
)(OrderHistoryScreen);

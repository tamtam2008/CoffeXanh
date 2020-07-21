import React, { useLayoutEffect, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import Container from '../../../../components/layout/Container';
import useRootNavigation from '../../../../utils/useRootNavigation';
import ChangeRewardReducer, { initialState } from './ChangeReward.reducer';

const ChangeRewardScreen = ({ userInfo, userId }) => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(ChangeRewardReducer, initialState);
  const navigation = useRootNavigation();
  useLayoutEffect(() => {
    // ChangeRewardController.getChangeReward(userId, dispatch);
    return () => {};
  }, [userId]);
  return (
    <Container isFail={true} failMsg={'Tính năng đang được phát triển.'} />
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangeRewardScreen);

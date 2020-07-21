import React, { useLayoutEffect, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Container from '../../../components/layout/Container';
import useRootNavigation from '../../../utils/useRootNavigation';
import NotiReducer, { initialState } from './AddressBook.reducer';
import styles from './AddressBook.style';

const AddressBookScreen = ({}) => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(NotiReducer, initialState);
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
)(AddressBookScreen);

import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  SafeAreaView,
  TextInput,
  View,
} from 'react-native';
import Container from '../../../../../../components/layout/Container';
import XModal from '../../../../../../components/layout/XModal';
import XIconButton from '../../../../../../components/XIconButton';
import {
  BaseFontStyles,
  BaseStyles,
} from '../../../../../../constants/BaseStyles';
import Colors from '../../../../../../constants/Colors';
import { IconType } from '../../../../../../constants/Icon';
import Layout from '../../../../../../constants/Layout';
import ProductList from '../../productList/ProductList';
import SearchProductScreenReducer from './SearchProduct.reducer';
import SearchProductScreenController from './SearchProduct.controller';
import { HeaderBackButton } from '@react-navigation/stack';

const SearchProductScreen = ({ visible, onClose }) => {
  const [state, dispatch] = useReducer(
    SearchProductScreenReducer.reducer,
    SearchProductScreenReducer.initState,
  );
  const [term, setTerm] = useState('');
  const { t } = useTranslation();

  var buttonRightSize = 0;
  if (state.isRequesting) {
    buttonRightSize += 30;
  }
  if (term && term.trim() !== '') {
    buttonRightSize += 30;
  }
  const closeModal = useCallback(() => {
    setTerm('');
    onClose();
  }, [onClose]);
  return (
    <XModal visible={visible} onClose={closeModal}>
      <SafeAreaView style={[styles.popupContainer]}>
        <View style={[BaseStyles.boxWithShadow, styles.headerContainer]}>
          <HeaderBackButton onPress={closeModal} />
          <View
            style={[
              styles.titleContainer,
              StyleSheet.flatten({
                width: Layout.window.width - buttonRightSize - 78,
              }),
            ]}>
            <TextInput
              placeholder={'Tìm kiếm'}
              autoFocus={true}
              style={[BaseFontStyles.body1, styles.textInput]}
              value={term}
              onChangeText={(txt) => {
                setTerm(txt);
                SearchProductScreenController.search(term, dispatch);
              }}
              onEndEditing={(e) => {}}
            />
          </View>
          {state.isRequesting ? (
            <ActivityIndicator size={20} style={[styles.buttonRight]} />
          ) : null}
          {term && term.trim() !== '' ? (
            <XIconButton
              icon={{ name: 'times', type: IconType.FONTAWESOME, size: 20 }}
              color={Colors.gray}
              style={[
                styles.buttonRight,
                { paddingHorizontal: 10, paddingVertical: 6 },
              ]}
              onPress={() => setTerm('')}
            />
          ) : null}
        </View>
        <Container
          isLoading={state.isRequesting}
          isFail={state.isFail}
          failMsg={t(state.failMsg)}
          scrollEnabled={false}>
          {term ? <ProductList productData={state.productData} /> : null}
        </Container>
      </SafeAreaView>
    </XModal>
  );
};

export default SearchProductScreen;

const styles = StyleSheet.create({
  popupContainer: { flex: 1, width: Layout.window.width },
  headerContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  titleContainer: {
    paddingRight: 10,
  },
  textInput: {
    width: '100%',
    paddingHorizontal: 5,
  },
  buttonLeft: {
    paddingHorizontal: 16,
  },
  buttonRight: {
    paddingHorizontal: 5,
  },
});

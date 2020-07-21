import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Animated, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
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
import CartBar from '../../cartBar/CartBar';
import ProductList from '../../productList/ProductList';
import SearchProductScreenReducer from './SearchProduct.reducer';
import SearchProductScreenController from './SearchProduct.controller';

const cartHeight = 60;
const SearchProductScreen = ({
  visible,
  onClose,
  haveItems,
  numberItems,
  totalAmount,
  refreshScreen,
}) => {
  const [state, dispatch] = useReducer(
    SearchProductScreenReducer.reducer,
    SearchProductScreenReducer.initState,
  );
  const [term, setTerm] = useState('');
  const { t } = useTranslation();
  const translateY = useRef(new Animated.Value(cartHeight)).current;
  useEffect(() => {
    const animtion = async () => {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true, // <-- Add this
      }).start();
    };
    haveItems && animtion();
  }, [haveItems, translateY]);

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
      <Container style={[styles.popupContainer]}>
        <View style={[BaseStyles.boxWithShadow, styles.headerContainer]}>
          <XIconButton
            icon={{
              name: 'arrow-back',
              type: IconType.MATERIAL,
              size: 24,
            }}
            color={Colors.gray}
            style={[styles.buttonLeft]}
            onPress={closeModal}
          />
          <View
            style={[
              styles.titleContainer,
              StyleSheet.flatten({
                width: Layout.window.width - buttonRightSize - 62,
              }),
            ]}>
            <TextInput
              placeholder={'Tìm kiếm'}
              autoFocus={true}
              style={[BaseFontStyles.body1, styles.textInput]}
              value={term}
              onChangeText={txt => {
                setTerm(txt);
                SearchProductScreenController.search(term, dispatch);
              }}
              onEndEditing={e => {}}
            />
          </View>
          {state.isRequesting ? (
            <ActivityIndicator size={20} style={[styles.buttonRight]} />
          ) : null}
          {term && term.trim() !== '' ? (
            <XIconButton
              icon={{ name: 'times', type: IconType.FONTAWESOME, size: 20 }}
              color={Colors.gray}
              style={[styles.buttonRight]}
              onPress={() => setTerm('')}
            />
          ) : null}
        </View>
        <Container
          isLoading={state.isRequesting}
          isFail={state.isFail}
          failMsg={t(state.failMsg)}>
          {term ? <ProductList productData={state.productData} /> : null}
        </Container>
        {haveItems && (
          <Animated.View
            style={[
              BaseStyles.boxWithShadow2,
              styles.float,
              {
                transform: [
                  {
                    translateY: translateY,
                  },
                ],
              },
            ]}>
            <CartBar
              numberItems={numberItems}
              totalAmount={totalAmount}
              refreshScreen={refreshScreen}
            />
          </Animated.View>
        )}
      </Container>
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
  },
  titleContainer: {
    paddingRight: 10,
  },
  textInput: {
    width: '100%',
  },
  buttonLeft: {
    paddingHorizontal: 16,
  },
  buttonRight: {
    paddingHorizontal: 5,
  },
});

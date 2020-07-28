import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from 'react';
import Container from '../../../../../../components/layout/Container';
import ProductList from '../../productList/ProductList';
import popularTabReducer from './reducer/popularTab.reducer';
import { useTranslation } from 'react-i18next';
import Actions from './reducer/popularTab.action';
import { StyleSheet } from 'react-native';
import ChooseProductModal from '../../productModal/chooseProductModal/ChooseProduct.modal';
import AppActions from '../../../../../../redux/app.actions';
import { connect } from 'react-redux';
import { callGetProducts } from './popularTab.controller';

const PopularTab = props => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(
    popularTabReducer.reducer,
    popularTabReducer.initState,
  );
  const {
    selectedItem,
    closeChooseProductModal,
    addChooseProduct,
    navigation,
  } = props;
  const [callRequested, setCallRequested] = useState(false);

  useLayoutEffect(() => {
    if (!callRequested) {
      callGetProducts(dispatch);
      setCallRequested(true);
    }
  }, [callRequested]);

  const onRefresh = useCallback(() => {
    dispatch({ type: Actions.GET_DATA });
    callGetProducts(dispatch);
  }, []);
  const updateFavorite = useCallback(() => {
    dispatch({ type: Actions.UPDATE_FAVORITE_LIST });
  }, []);

  useEffect(() => {
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return navigation.addListener('focus', () => {
      dispatch({ type: Actions.UPDATE_FAVORITE_LIST });
    });
  }, [navigation]);
  return (
    <Container
      contentStyle={StyleSheet.flatten({ backgroundColor: '#fff' })}
      scrollEnabled={false}
      isLoading={state.isRequesting}
      isFail={state.isFail || state.productData.length === 0}
      failMsg={t(state.failMsg || 'Menu.ProductTabs.empty')}>
      <ProductList
        productData={state.productData}
        onRefresh={onRefresh}
        updateFavorite={updateFavorite}
      />
      {navigation.isFocused() && (
        <ChooseProductModal
          id={selectedItem}
          footerAction={{
            cancelAction: closeChooseProductModal,
            submitAction: product => addChooseProduct(product),
          }}
          updateFavorite={updateFavorite}
        />
      )}
    </Container>
  );
};
const mapStateToProps = state => {
  const { cart } = state;
  return {
    selectedItem: cart.selectedItem,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    closeChooseProductModal: () =>
      dispatch({ type: AppActions.CART_SELECT_ITEM, payload: null }),
    addChooseProduct: product =>
      dispatch({ type: AppActions.CART_ADD_ITEM, payload: product }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PopularTab);

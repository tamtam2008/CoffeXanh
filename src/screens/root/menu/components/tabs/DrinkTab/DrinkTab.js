import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../../../../../../components/layout/Container';
import ProductList from '../../productList/ProductList';
import { callGetProducts } from './drinkTab.controller';
import drinkTabReducer from './reducer/drinkTab.reducer';
import Actions from './reducer/drinkTab.action';
import { StyleSheet } from 'react-native';
import ChooseProductModal from '../../productModal/chooseProductModal/ChooseProduct.modal';
import AppActions from '../../../../../../redux/app.actions';
import { connect } from 'react-redux';

const DrinkTab = props => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(
    drinkTabReducer.reducer,
    drinkTabReducer.initState,
  );
  const {
    selectedItem,
    closeChooseProductModal,
    addChooseProduct,
    navigation,
  } = props;
  const [callRequested, setCallRequested] = useState(false);
  useEffect(() => {
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return navigation.addListener('focus', () => {
      dispatch({ type: Actions.UPDATE_FAVORITE_LIST });
    });
  }, [navigation]);
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
  return (
    <Container
      style={StyleSheet.flatten({ backgroundColor: '#fff' })}
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
)(DrinkTab);

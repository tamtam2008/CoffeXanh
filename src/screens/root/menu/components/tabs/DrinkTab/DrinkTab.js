import React, { useEffect, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../../../../../../components/layout/Container';
import ProductList from '../../productList/ProductList';
import { callGetProducts } from './drinkTab.controller';
import drinkTabReducer from './reducer/drinkTab.reducer';
import Actions from './reducer/drinkTab.action';
import { StyleSheet } from 'react-native';

// enableScreens();

const DrinkTab = props => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(
    drinkTabReducer.reducer,
    drinkTabReducer.initState,
  );

  const [callRequested, setCallRequested] = useState(false);
  useEffect(() => {
    if (!callRequested) {
      callGetProducts(dispatch);
      setCallRequested(true);
    }
  }, [callRequested]);
  const onRefresh = React.useCallback(() => {
    dispatch({ type: Actions.GET_DATA });
    callGetProducts(dispatch);
  }, []);
  return (
    <Container
      style={StyleSheet.flatten({ backgroundColor: '#fff' })}
      isLoading={state.isRequesting}
      isFail={state.isFail || state.productData.length === 0}
      failMsg={t(state.failMsg || 'Menu.ProductTabs.empty')}>
      <ProductList productData={state.productData} onRefresh={onRefresh} />
    </Container>
  );
};

export default DrinkTab;

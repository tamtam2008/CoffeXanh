import React, { useEffect, useReducer, useState } from 'react';
import {StyleSheet, TouchableHighlight} from 'react-native';
import Container from '../../../../../../components/layout/Container';
import FallBack from '../../../../../../components/utils/FallBack';
import ProductList from '../../productList/ProductList';
import foodTabReducer from './reducer/foodTab.reducer';
import { callGetProducts } from './foodTab.controller';
import { useTranslation } from 'react-i18next';

const FoodTab = props => {
  const [state, dispatch] = useReducer(
    foodTabReducer.reducer,
    foodTabReducer.initState,
  );
  const { t } = useTranslation();
  const [callRequested, setCallRequested] = useState(false);
  useEffect(() => {
    if (!callRequested) {
      // callGetProducts(dispatch);
      setCallRequested(true);
    }
  }, [callRequested]);

  return (
    <Container
      contentStyle={StyleSheet.flatten({ backgroundColor: '#fff' })}
      isRequesting={state.isRequesting}
      isFail={state.isFail || state.productData.length === 0}
      failMsg={t(state.failMsg || 'Menu.ProductTabs.empty')}>
      {!state.isFail ? (
        <ProductList productData={state.productData} />
      ) : (
        <TouchableHighlight
          onPress={() => callGetProducts(dispatch)}
          style={{ flex: 1 }}>
          <FallBack />
        </TouchableHighlight>
      )}
    </Container>
  );
};

export default FoodTab;

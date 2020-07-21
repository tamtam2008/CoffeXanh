import React, { useEffect, useReducer, useState } from 'react';
import Container from '../../../../../../components/layout/Container';
import ProductList from '../../productList/ProductList';
import popularTabReducer from './reducer/popularTab.reducer';
import { useTranslation } from 'react-i18next';

// enableScreens();

const PopularTab = props => {
  const [state, dispatch] = useReducer(
    popularTabReducer.reducer,
    popularTabReducer.initState,
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
      isFail={state.isFail || state.productData.length === 0}
      failMsg={t(state.failMsg || 'Menu.ProductTabs.empty')}>
      <ProductList productData={state.productData} />
    </Container>
  );
};

export default PopularTab;

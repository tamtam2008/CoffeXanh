import React, { useEffect, useReducer, useState, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import FallBack from '../../../../../../components/utils/FallBack';
import XModal from '../../../../../../components/layout/XModal';
import { BaseStyles } from '../../../../../../constants/BaseStyles';
import Layout from '../../../../../../constants/Layout';
import Actions from './chooseProduct.actions';
import chooseProductController from './chooseProduct.controller';
import chooseProductReducer from './chooseProduct.reducer';
import ChooseProductContent from './components/ChooseProductContent';
import ProductDetailContent from './components/ProductDetailContent';

const ChooseProductModal = ({
  id,
  footerAction = { submitAction: () => {}, cancelAction: () => {} },
}) => {
  const [state, dispatch] = useReducer(
    chooseProductReducer.reducer,
    chooseProductReducer.initialState,
  );
  // const [callAPI, setCallAPI] = useState(false);
  const [isShowDetail, showDetail] = useState(false);
  useLayoutEffect(() => {
    console.log('ChooseProductModal', id !== null);
    if (id !== null) {
      // setCallAPI(true);
      chooseProductController.getProductData(dispatch, id);
    }
  }, [id]);
  useEffect(() => {
    if (state.isFail) {
      footerAction.cancelAction();
    }
  }, [footerAction, state.isFail]);
  return (
    <XModal
      visible={id !== null}
      onClose={() => {
        if (!isShowDetail) {
          footerAction.cancelAction();
        } else {
          showDetail(false);
        }
      }}>
      {!state.isRequesting ? (
        !isShowDetail ? (
          <ChooseProductContent
            {...{
              style: [styles.popup],
              showDetail: () => showDetail(true),
              decreaseQuantity: () =>
                dispatch({ type: Actions.DECREASE_QUANTITY }),
              increaseQuantity: () =>
                dispatch({ type: Actions.INCREASE_QUANTITY }),
              state,
              footerAction,
            }}
          />
        ) : (
          <ProductDetailContent
            {...{
              style: [BaseStyles.baseContainer, styles.popup],
              state,
              closeAction: () => {
                showDetail(false);
              },
            }}
          />
        )
      ) : (
        <View style={[BaseStyles.baseContainer, styles.popup]}>
          <FallBack />
        </View>
      )}
    </XModal>
  );
};

export default ChooseProductModal;

const styles = StyleSheet.create({
  // centeredView: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(83,82,82,0.9)',
  //   padding: 10,
  // },
  popup: {
    backgroundColor: '#fff',
    borderRadius: 5,
    width: Layout.window.width * 0.9,
    minHeight: 200,
  },
});

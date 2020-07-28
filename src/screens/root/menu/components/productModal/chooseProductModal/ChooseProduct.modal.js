import React, {
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import XModal from '../../../../../../components/layout/XModal';
import { BaseStyles } from '../../../../../../constants/BaseStyles';
import Layout from '../../../../../../constants/Layout';
import Actions from './chooseProduct.actions';
import chooseProductController from './chooseProduct.controller';
import chooseProductReducer from './chooseProduct.reducer';
import ChooseProductContent from './components/ChooseProductContent';
import ProductDetailContent from './components/ProductDetailContent';
import Colors from '../../../../../../constants/Colors';

const ChooseProductModal = ({
  id,
  footerAction = {
    submitAction: () => {
    },
    cancelAction: () => {
    },
  },
  updateFavorite,
}) => {
  const [state, dispatch] = useReducer(
    chooseProductReducer.reducer,
    chooseProductReducer.initialState,
  );
  const [isShowDetail, showDetail] = useState(false);
  useLayoutEffect(() => {
    if (id !== null) {
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
            style={[styles.popup]}
            showDetail={() => showDetail(true)}
            decreaseQuantity={() =>
              dispatch({ type: Actions.DECREASE_QUANTITY })
            }
            increaseQuantity={() =>
              dispatch({ type: Actions.INCREASE_QUANTITY })
            }
            state={state}
            footerAction={footerAction}
          />
        ) : (
          <ProductDetailContent
            style={[BaseStyles.baseContainer, styles.popup]}
            state={state}
            closeAction={() => {
              showDetail(false);
            }}
          />
        )
      ) : (
        <View
          style={[
            BaseStyles.baseContainer,
            styles.popup,
            StyleSheet.flatten(state.isRequesting ? { width: 120 } : {}),
          ]}>
          <ActivityIndicator size={32} color={Colors.tintColor}/>
        </View>
      )}
    </XModal>
  );
};

export default ChooseProductModal;

const styles = StyleSheet.create({
  popup: {
    backgroundColor: '#fff',
    borderRadius: 5,
    width: Layout.window.width * 0.9,
    minHeight: 60,
  },
});

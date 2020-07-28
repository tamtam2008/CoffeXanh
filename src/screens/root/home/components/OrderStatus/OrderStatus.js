import React, { useCallback, useReducer, useState } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import HomeService from '../../../../../services/HomeService';
import reducer, { initialState } from './OrderStatus.reducer';
import { getContentData } from './OrderStatus.config';
import Actions from './OrderStatus.actions';
import Carousel from 'react-native-snap-carousel/src/carousel/Carousel';
import Layout from '../../../../../constants/Layout';
import {
  BaseFontStyles,
  BaseStyles,
} from '../../../../../constants/BaseStyles';
import { ListItem } from 'react-native-elements';
import { Pagination } from 'react-native-snap-carousel';
import styles from './OrderStatus.style';
import Container from '../../../../../components/layout/Container';
import Colors from '../../../../../constants/Colors';

const OrderStatus = ({ userId }) => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [activeSlide, setActiveSlide] = useState(0);

  useFocusEffect(
    useCallback(() => {
      // dispatch({ type: Actions.GET_DATA });
      HomeService.getOrdersStatus(userId).subscribe(data => {
        if (data.response.status === 200) {
          dispatch({
            type: Actions.GET_DATA_SUCCESS,
            payload: data.response.data,
          });
        } else {
          dispatch({ type: Actions.GET_DATA_FAIL, payload: '' });
        }
      });
    }, [userId]),
    [],
  );
  return !state.isFail && state.data.length > 0 ? (
    <View>
      <Text style={[BaseFontStyles.title, BaseStyles.mt_16, BaseStyles.mb_10]}>
        {t('Home.OrderStatus.title')}
      </Text>
      <Container
        isLoading={state.isRequesting}
        noBackground={true}
        scrollEnabled={false}
        contentStyle={{ paddingHorizontal: 0, paddingVertical: 0 }}>
        <Carousel
          data={state.data}
          renderItem={({ item }) => {
            const Component =
              getContentData(item.currentStatus).content || null;
            return (
              <View style={[BaseStyles.baseContainer, BaseStyles.mb_5]}>
                <ListItem
                  leftElement={
                    <Text
                      style={[
                        BaseFontStyles.title,
                        { color: Colors.tintColor },
                      ]}>
                      {item.status}
                    </Text>
                  }
                  rightElement={
                    <Text style={[BaseFontStyles.menuOrBody2]}>
                      #{item.orderName}
                    </Text>
                  }
                  containerStyle={{ paddingHorizontal: 0, paddingTop: 0 }}
                />
                {Component && <Component data={item} />}
              </View>
            );
          }}
          sliderWidth={Layout.window.width}
          itemWidth={Layout.window.width - 32}
          containerCustomStyle={{ marginHorizontal: -16 }}
          onSnapToItem={index => setActiveSlide(index)}
          autoplay={true}
          autoplayDelay={10000} // 10 sec
        />
        {pagination({ entries: state.data, activeSlide, setActiveSlide })}
      </Container>
    </View>
  ) : null;
};

const pagination = props => {
  const { entries, activeSlide } = props;
  return entries?.length > 0 ? (
    <Pagination
      dotsLength={entries.length}
      activeDotIndex={activeSlide}
      containerStyle={styles.containerDotStyle}
      dotStyle={styles.dotStyle}
      inactiveDotStyle={styles.inactiveDotStyle}
      inactiveDotOpacity={0.3}
      inactiveDotScale={0.5}
    />
  ) : null;
};

export default OrderStatus;

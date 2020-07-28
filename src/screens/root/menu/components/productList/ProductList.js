import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LargeList } from 'react-native-largelist-v3';
import { NormalHeader } from 'react-native-spring-scrollview/NormalHeader';
import {
  BaseFontStyles,
  BaseStyles,
} from '../../../../../constants/BaseStyles';
import { normalize } from '../../../../../constants/Layout';
import ProductItem from './ProductItem/ProductItem';
import styles from './ProductList.style';
import { useTranslation, withTranslation } from 'react-i18next';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.productData =
      props.productData.length > 0 ? props.productData : [{ items: [] }];
    this.state = { isLoading: true };
    // console.log('ProductList', 'productData', JSON.stringify(this.productData));
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const shouldUpdate =
      JSON.stringify(nextProps.productData) !==
      JSON.stringify(this.productData);
    if (shouldUpdate) {
      this.productData = nextProps.productData;
    }
    return shouldUpdate;
  }

  render() {
    const { onRefresh } = this.props;
    const _props = {};
    if (onRefresh) {
      _props.onRefresh = () => {
        this.props.productData ? onRefresh() : this._list.endRefresh();
      };
      _props.refreshHeader = NormalHeader;
    }
    return (
      <View
        style={[styles.container]}>
        <LargeList
          style={[styles.container]}
          data={this.productData}
          heightForIndexPath={({ section, row }) =>
            Math.ceil(this.productData[section].items[row].items.length / 2) *
              (normalize(233) + 16) +
            25
          }
          renderIndexPath={this.renderItemList}
          // renderEmpty={this.renderEmpty}
          groupCount={this.productData.length}
          updateTimeInterval={100}
          ref={ref => (this._list = ref)}
          contentStyle={{paddingVertical: 10}}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          {..._props}
        />
      </View>
    );
  }

  renderItemList = ({ section, row }) => {
    let item = this.productData[section].items[row];
    return this.renderItems({ item });
  };

  renderItem = (props, key) => (
    <ProductItem
      {...props}
      key={key}
      updateFavorite={this.props.updateFavorite}
    />
  );

  renderItems = ({ item: { header, items } }) => {
    return (
      <View style={[BaseStyles.flexColumn]}>
        <Text style={[BaseFontStyles.title, styles.title]}>
          {this.props.t(header).toUpperCase()}
        </Text>
        <View style={[BaseStyles.flexRow, styles.itemListContainer]}>
          {items.map((val, key) => this.renderItem(val, key))}
        </View>
      </View>
    );
  };
}

export default withTranslation()(ProductList);

import React from 'react';
import CouponItem from './CouponItem.component';
import { BaseStyles } from '../../../../constants/BaseStyles';
import Container from '../../../../components/layout/Container';
import actions from '../../../../redux/app.actions';
import { connect } from 'react-redux';
import { dynamicSort } from '../../../../utils/AppUtils';

const ChooseCouponScreen = ({
  selectedCoupon,
  updateCoupon,
  totalAmount,
  route,
}) => {
  const { data, items } = route.params;
  const itemIds = items?.map(item => item.id) || [];
  const filterCoupons = data
    .map(coupon => {
      let inValid = true;
      // kiểm tra danh sách sản phẩm k áp dụng
      coupon.excludeProduct
        .map(value => value.id)
        .forEach(id => {
          if (itemIds.includes(id)) {
            inValid = false;
          }
        });
      // kiểm tra danh sách sản phẩm áp dụng
      if (
        coupon.includeProduct
          .map(value => value.id)
          .filter(id => itemIds.includes(id)).length === 0
      ) {
        inValid = false;
      }
      // kiểm tra tổng tiền tạm tính
      if (coupon.totalForApplyDescrease > totalAmount) {
        inValid = false;
      }
      return { ...coupon, inValid };
    })
    .sort(dynamicSort('inValid', 'desc'));
  return (
    <Container contentStyle={[BaseStyles.baseContent]}>
      {filterCoupons.map((val, idx) => (
        <CouponItem
          value={val}
          key={idx}
          selected={
            selectedCoupon?.couponName
              ? val.couponName === selectedCoupon.couponName
              : false
          }
          onPress={updateCoupon}
        />
      ))}
    </Container>
  );
};

const mapStateToProps = state => ({
  selectedCoupon: state.cart.coupon,
  totalAmount: state.cart.totalAmount,
});

const mapDispatchToProps = dispatch => ({
  updateCoupon: coupon =>
    dispatch({ type: actions.CART_UPDATE_COUPON, payload: coupon }),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChooseCouponScreen);

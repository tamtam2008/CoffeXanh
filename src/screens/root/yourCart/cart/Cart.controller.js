const buildRequestBody = ({
  userId,
  receiveName,
  phone,
  address,
  paymentType,
  fee,
  promotionFee,
  totalPaid,
  position,
  items,
  coupons,
  notes,
}) => ({
  customerId: userId,
  receiveName: receiveName,
  paidYn: 'N',
  sumPaidMoney: totalPaid,
  receiveTime: buildDate(new Date()),
  typePayment: paymentType,
  receiveGps: `${position.latitude},${position.longitude}`,
  receivePhone: phone,
  feeShip: fee,
  receiveAddress: address,
  promotionMoney: promotionFee,
  strItems: buildItems(items),
  strCoupons: buildCoupons(coupons),
  noteDriver: notes.driver,
  noteToShop: notes.shop,
});

const buildDate = date => {
  return `${date.getFullYear()}-${formatTime(date.getMonth() + 1)}-${formatTime(
    date.getDate(),
  )} ${formatTime(date.getHours())}:${formatTime(
    date.getMinutes(),
  )}:${formatTime(date.getMilliseconds())}`;
};
const formatTime = time => (time > 9 ? `${time}` : `0${time}`);

const buildItems = items =>
  JSON.stringify(
    items.map(i => ({
      orderId: 0,
      productId: i.id,
      quantity: i.quantity,
      price: i.price,
      sizeId: i.sizeId,
      sizeName: i.sizeName,
    })),
  );

const buildCoupons = coupons =>
  JSON.stringify(
    coupons.map(i => ({
      orderId: 0,
      couponId: i.id,
    })),
  );

export default {
  createOrder: (cartInfo, dispatch) => {},
};

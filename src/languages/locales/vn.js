export default {
  login_screen: {
    ignoreBtn: 'Bỏ qua',
    loginBtn: 'Đăng nhập',
    title1: 'Chào bạn,',
    title2: 'nhập số điện thoại để tiếp tục',
    otherLoginTypeTitle: 'hoặc đăng nhập bằng',
    phoneNumber: 'Số điện thoại',
    error: {
      phoneNumber: 'Số điện thoại không hợp lệ.',
    },
    notify: {
      otp_success: 'Mã OTP đã được gửi đến số điên thoại của bạn',
    },
  },
  otp_screen: {
    screenName: 'Xác thực số điện thoại',
    title1: 'Nhập mã xác thực gồm 6 số đã được gửi đến số điện thoại ',
    title2: ' để tiếp tục',
    getOtpAgain: 'Gửi lại',
    notify: {
      smsFail: 'Gửi SMS thất bại. Vui lòng thử lại sau',
    },
  },
  AccountInfoUpdateScreen: {
    name: 'Tên',
    dob: 'Ngày sinh',
    sexTitle: 'Giới tính',
    phone: ' Số điện thoại',
    submitBtn: 'Cập nhật',
    error: {
      name: 'Tên không hợp lệ.',
      dob: 'Ngày sinh không hợp lệ.',
    },
  },
  sex: {
    male: 'Nam',
    11: 'Nam',
    female: 'Nữ',
    12: 'Nữ',
  },
  rank: {
    NC: 'Khách hàng mới',
    CP: 'Đồng',
    SI: 'Bạc',
    GO: 'Vàng',
    DI: 'Kim cương',
  },
  Home: {
    header: {
      loginBtn: 'Đăng nhập',
    },
    Blogs: {
      empty: 'Không có bài viết nào.',
    },
    BlogItem: {
      detail: 'Chi tiết',
    },
  },
  Menu: {
    ProductTabs: {
      drink: 'Đồ uống',
      food: 'Thức ăn',
      popular: 'Phổ biến',
      empty: 'Không có sản phẩm nào.',
    },
    AddressBar: {
      shipTo: 'Giao hàng đến',
    },
    CartBar: {
      viewYourCart: 'Xem giỏ hàng',
    },
    FavoriteButton: {
      favorite: 'Yêu thích',
    },
  },
  AccountInfoScreen: {
    userInfo: 'Thông tin cá nhân',
    name: 'Tên',
    dob: 'Ngày sinh',
    sex: 'Giới tính',
    phone: ' Số điện thoại',
    link: 'Liên kết',
    linked: 'Đã liên kết',
    notLinked: 'Chưa liên kết',
  },
  SettingsScreen: {
    addressBook: 'Địa chỉ đã lưu',
    language: 'Ngôn ngữ',
    noti: 'Thông báo đẩy',
  },
  notify: {
    status: {
      fail: 'Thất bại',
      success: 'Thành công',
    },
    code: {
      500: 'Máy chủ gặp sự cố, vui lòng thực hiện lại sau!',
    },
    failMsg: 'Yêu cầu của bạn đã thất bại!',
  },
  Languages: {
    vi_VN: 'Tiếng Việt',
    en_US: 'Tiếng Anh',
  },
  AccountScreen: {
    SettingsScreen: 'Cài đặt',
    ChooseLanguageScreen: 'Chọn ngôn ngữ',
  },
  routes: {
    bottomTabs: {
      home: 'Trang chủ',
      menu: 'Đặt hàng',
      store: 'Cửa hàng',
      account: 'Tài khoản',
    },
    screens: {
      accountInfo: 'Thông tin tài khoản',
      accountInfoUpdate: 'Cập nhật thông tin',
      cart: 'Giỏ hàng',
      paymentType: 'Phương thức thanh toán',
      blogDetail: 'Blog',
      reward: 'Ưu đãi',
      yourCoupon: 'Ưu đãi của bạn',
      noti: 'Thông báo',
      orderHistory: 'Lịch sử đặt hàng',
      payment: 'Thanh toán',
      addressBook: 'Địa chỉ đã lưu',
      help: 'Điều khoản sử dụng và trợ giúp',
      findAddress: 'Tìm địa chỉ giao hàng',
      yourCode: 'Mã giao dịch',
      settings: 'Cài đặt',
    },
  },
  paymentType: {
    CS: 'Tiền mặt',
  },
  common: {
    Container: {
      loginRequired: 'Đăng nhập để tiếp tục',
      AuthRequiredMsgDefalt: 'Bạn cần đăng nhập để sử dụng chức năng này.',
    },
  },
  YourCouponScreen: {
    couponCode: 'Mã khuyến mãi',
    AuthRequiredMsg: 'Đăng nhập hoặc đăng ký ngay để nhận nhiều ưu đãi',
    addCouponBtn: 'Thêm',
    applyTo: 'Áp dụng đến hết ngày',
    error: {
      noCoupon: 'Bạn không có ưu đãi nào.',
    },
  },
  YourCouponDetailScreen: {
    description: 'Mô tả',
    conditionApply: 'Điều kiện áp dụng',
    applyAllOrder: 'Áp dụng cho mọi đơn hàng.',
    excludeProducts: 'Ngoại trừ một số sản phẩm sau: ...',
    apply: 'Áp dụng',
    applyTo: 'Áp dụng đến hết ngày',
    numberUse: 'Số lần sử dụng còn lại',
  },
  CartScreen: {
    orderBtn: 'Đặt hàng',
    OrderInfo: {
      title: 'Thông tin đơn hàng',
      shipTo: 'Giao hàng đến',
      emptyAddress: 'Chưa chọn địa điểm giao hàng',
    },
    OrderItemDetails: {
      title: 'Chi tiết đơn hàng',
      provisionalSum: 'Tạm tính',
      shippingFee: 'Phí giao hàng',
      promotion: 'Khuyến mãi',
      total: 'Tổng cộng',
    },
    OrderNotes: {
      title: 'Ghi chú',
      noteForStore: 'Ghi chú cho cửa hàng',
      noteForDriver: 'Ghi chú cho tài xế',
    },
    OrderPaymentAndCoupon: {
      title: 'Thanh toán & khuyến mãi',
      payment: 'Thanh toán',
      promotion: 'Khuyến mãi',
      noPromotion: 'Không có',
    },
  },
  SettingMenu: {
    accountInfo: 'Thông tin tài khoản',
    rewards: 'Ưu đãi',
    orderHistory: 'Lịch sử đơn hàng',
    payment: 'Thanh toán',
    help: 'Điều khoản sử dụng và trợ giúp',
    settings: 'Cài đặt',
    logout: 'Đăng xuất',
    SettingHeader: {
      loginBtn: 'Đăng nhập',
    },
  },
  YourCodeScreen: {
    UserCode: 'Mã khách hàng',
    TransactionCode: 'Mã giao dịch của bạn',
    notes:
      '*Vì lý do an toàn, bạn nên giữ bảo mật mã BarCode và QRCode để tránh bị người khác sử dụng vì mục đích không tốt.',
  },
  LoadingPopup: {
    isLoading: 'Đang xử lý',
  },
};

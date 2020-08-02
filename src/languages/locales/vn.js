export default {
  login_screen: {
    loginBtn: 'Đăng nhập',
    message: 'Bạn chưa có tài khoản?',
    username: 'Tài khoản',
    password: 'Mật khẩu',
    error: 'Tài khoản hoặc mật khẩu không đúng.',
    resetPwdBtn: 'Quên mật khẩu',
    registerBtn: 'Tạo tài khoản',
  },
  RegisterScreen: {
    title: 'Đăng ký',
    message: 'Vui lòng nhập thông tin đăng ký',
    username: 'Họ và tên',
    password: 'Mật khẩu',
    phonenumber: 'Số điện thoại',
    email: 'Email',
    confirmPassword: 'Xác nhận mật khẩu',
    successMessage: 'Bạn đã đăng ký thành công',
    successAlert:
      'Bán sẽ nhận được email thông báo đã hoàn tât đăng ký khi thông tin của bạn được xác nhận',
    gotoLogin: 'Về trang đăng nhập',
  },
  ChangePasswordScreen: {
    title: 'Đổi mật khẩu',
    message: 'Vui lòng nhập thông tin dưới đây',
    changePassword: 'Đổi mật khẩu',
  },
  ResetPasswordScreen: {
    title: 'Nhập thông tin để khôi phục mật khẩu của bạn',
    resetPwdBtn: 'Khôi phục mật khẩu',
    email: 'Email hoặc số điện thoại của bạn',
  },
  ResetPasswordSuccessScreen: {
    title: 'Khôi phục mật khẩu thành công!',
    title2: 'Vui lòng kiểm tra email để thực hiện khôi phục mật khẩu của bạn.',
    closeApp: 'Đóng ứng dụng',
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
  role: {
    staff: 'Nhân viên',
    admin: 'Quản lý',
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
    phone: 'Số điện thoại',
    email: 'Email',
    empty: 'Chưa có',
    changePassword: 'Đổi mật khẩu',
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
      menu: 'Menu',
      store: 'Cửa hàng',
      account: 'Tài khoản',
      order: 'Đơn hàng',
    },
    screens: {
      accountInfo: 'Thông tin tài khoản',
      accountInfoUpdate: 'Cập nhật thông tin',
      cart: 'Giỏ hàng',
      paymentType: 'Phương thức thanh toán',
      blogDetail: 'Blog',
      reward: 'Ưu đãi',
      changeReward: 'Đổi điểm thưởng',
      yourCoupon: 'Ưu đãi của bạn',
      noti: 'Thông báo',
      orderHistory: 'Lịch sử đặt hàng',
      payment: 'Thanh toán',
      addressBook: 'Địa chỉ đã lưu',
      help: 'Điều khoản sử dụng và trợ giúp',
      findAddress: 'Tìm địa chỉ giao hàng',
      yourCode: 'Mã khách hàng',
      settings: 'Cài đặt',
      chooseLanguageScreen: 'Chọn ngôn ngữ',
      chooseReceiveAddress: 'Giao đến',
      changePassword: 'Đổi mật khẩu',
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
    pressContinueToExit: 'Nhấn 1 lần nữa để thoát khỏi ứng dụng',
    TimeUnit: {
      min: 'Phút',
      hour: 'Giờ',
    },
  },
  SettingMenu: {
    accountInfo: 'Thông tin tài khoản',
    rewards: 'Quản lý Ưu đãi',
    notifyReward: 'Gửi thông báo khuyến mãi',
    report: 'Thống kê',
    users: 'Quản lý nhân viên',
    help: 'Điều khoản sử dụng và trợ giúp',
    settings: 'Cài đặt',
    logout: 'Đăng xuất',
    createUser: 'Tạo tài khoản mới',
  },
  YourCodeScreen: {
    UserCode: 'Mã khách hàng',
    TransactionCode: 'Mã giao dịch của bạn',
    notes:
      '*Mã khách hàng được dùng cho mục đích tích điểm, bạn có thể sử dụng mã này khi thanh toán ở toàn bộ các chuỗi cửa hàng của Xanh Coffee.',
  },
  LoadingPopup: {
    isLoading: 'Đang xử lý',
  },
  SplashScreen: {
    name: 'PHẦN MỀM QUẢN LÝ XANH COFFEE',
  },
};

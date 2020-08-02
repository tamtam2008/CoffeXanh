export default {
  login_screen: {
    ignoreBtn: 'Skip',
    loginBtn: 'Login',
    title1: 'Hello,',
    title2: 'enter the phone number to continue',
    otherLoginTypeTitle: 'or login by',
    phoneNumber: 'Phone number',
    error: {
      phoneNumber: 'Phone number invalid.',
    },
    notify: {
      otp_success: 'The OTP code has been sent to your phone number.',
    },
    registerBtn: 'Create new account',
  },
  otp_screen: {
    screenName: 'Verify phone number',
    title1: 'Enter the 6-digit verification code sent to the phone number',
    title2: ' to continue',
    getOtpAgain: 'Resend',
    notify: {
      smsFail: 'SMS sending failed. Please try again later!',
    },
  },
  RegisterScreen: {
    title: 'Sign Up',
    message: 'Please fill out information to sign up',
    username: 'Tài khoản',
    password: 'Mật khẩu',
    phonenumber: 'So dien thoai',
    email: 'Email',
    confirmPassword: 'Xac nhan mat khau',
    successMessage: 'Sign up success',
    successAlert:
      'Ban se nhan duoc email thong bao da hoan tat dang ky khi thong tin cua ban duoc xac nhan',
    gotoLogin: 'Dong ung dung',
  },
  ChangePasswordScreen: {
    title: 'Đổi mật khẩu',
    message: 'Vui lòng nhập thông tin dưới đây',
    changePassword: 'Đổi mật khẩu',
  },
  AccountInfoUpdateScreen: {
    name: 'Name',
    dob: 'Date of birth',
    sexTitle: 'Sex',
    phone: 'Phone number',
    submitBtn: 'Update',
    error: {
      name: 'Name invalid.',
      dob: 'Date of birth invalid.',
    },
  },
  sex: {
    male: 'Male',
    11: 'Male',
    female: 'Fmale',
    12: 'Fmale',
  },
  rank: {
    NC: 'New Customer',
    CP: 'Đồng',
    SI: 'Bạc',
    GO: 'Vàng',
    DI: 'Kim cương',
  },
  Home: {
    header: {
      loginBtn: 'Login',
    },
    Blogs: {
      empty: 'Empty blogs.',
    },
  },
  Menu: {
    ProductTabs: {
      drink: 'Food',
      food: 'Drink',
      popular: 'Popular',
    },
  },
  AccountInfoScreen: {
    userInfo: 'Personal infomation',
    name: 'Name',
    dob: 'Date of birth',
    sex: 'Sex',
    phone: 'Phone number',
    link: 'Link',
    linked: 'Linked',
    notLinked: 'Not linked',
    changePassword: 'Change password',
  },
  SettingAppScreen: {
    addressBook: 'Address book',
    language: 'Language',
  },
  notify: {
    status: {
      fail: 'Fail',
      success: 'Success',
    },
    code: {
      500: 'Server errors. Please try again later!',
    },
    failMsg: 'Your request has failed!',
  },
  Languages: {
    vi_VN: 'Vietnamese',
    en_US: 'English',
  },
  AccountScreen: {
    SettingAppScreen: 'Settings',
    ChooseLanguageScreen: 'Choose language',
  },
  routes: {
    bottomTabs: {
      home: 'Home',
      menu: 'Order',
      store: 'Store',
      account: 'Account',
    },
    screens: {
      accountInfo: 'Account infomation',
      accountInfoUpdate: 'Update infomation',
      cart: 'Cart',
      paymentType: 'Choose payment type',
      blogDetail: 'Blog',
      changePassword: 'Change password',
    },
    paymentType: {
      CS: 'Cash',
    },
  },
};

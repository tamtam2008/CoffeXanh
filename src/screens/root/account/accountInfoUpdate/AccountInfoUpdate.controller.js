import UserService from '../../../../services/UserService';
import useRootNavigation from '../../../../utils/useRootNavigation';
import moment from 'moment';
import TopNotifyUtils from '../../../../utils/TopNotifyUtils';
import SessionUtils from '../../../../session/SessionUtils';

const navigation = useRootNavigation();

const Controller = {
  updateInfo: (userId, userInfo, onSuccess, onFail) => {
    const putData = {
      id: userId,
      ...getName(userInfo.name),
      birthday: moment(userInfo.dob).format('YYYY-MM-DD'),
      gender: userInfo.sex,
      phone: userInfo.phone,
      email: userInfo.email,
    };
    console.log('updateInfo - userInfo', userInfo);
    console.log('updateInfo - putData', putData);
    UserService.updateUserInfo(userId, putData).subscribe(resp => {
      const { status } = resp.response;
      if (status === 200) {
        SessionUtils.updateUserInfo(userInfo, () => {
          onSuccess();
          navigation.navigate('accountInfo');
        });
      } else {
        console.log('updateInfo', 'Fail!!', putData);
        TopNotifyUtils.fail(
          status === 500 || status === 0
            ? `notify.code.${status}`
            : 'notify.failMsg',
        );
        onFail();
      }
    });
  },
};

const getName = name => {
  const _name = name.trim().split(' ');
  if (_name.length >= 2) {
    return {
      firstName: _name.filter((val, idx) => idx > 0).join(' '),
      lastName: _name[0],
    };
  } else {
    return { firstName: name, lastName: '' };
  }
};

export default Controller;

import moment from 'moment';
import UserService from '../../../services/UserService';
import TopNotifyUtils from '../../../utils/TopNotifyUtils';
import useRootNavigation from '../../../utils/useRootNavigation';
import RNRestart from 'react-native-restart';

const navigation = useRootNavigation();

const Controller = {
  updateInfo: (userId, userInfo, onSuccess, onFail) => {
    const putData = {
      id: userId,
      ...getName(userInfo.name),
      birthday: moment(userInfo.dob).format('YYYY-MM-DD'),
      gender: userInfo.sex,
    };
    UserService.updateUserInfo(userId, putData).subscribe(resp => {
      const { status } = resp.response;
      if (status === 200) {
        // Immediately reload the React Native Bundle
        RNRestart.Restart();
        onSuccess();
        // navigation.navigate('Root');
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

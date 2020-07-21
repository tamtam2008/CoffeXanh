import AsyncStorage from '@react-native-community/async-storage';
import actions from '../../../../redux/app.actions';
import UserService from '../../../../services/UserService';
import store from '../../../../redux/store';
import useRootNavigation from '../../../../utils/useRootNavigation';

const navigation = useRootNavigation();

const Controller = {
  updateInfo: (userId, userInfo, onSuccess, onFail) => {
    const putData = {
      id: userId,
      ...getName(userInfo.name),
      birthday: addFormatDateToRequest(userInfo.dob),
      gender: userInfo.sex,
    };
    console.log('updateInfo - userInfo', userInfo);
    console.log('updateInfo - putData', putData);
    UserService.updateUserInfo(userId, putData).subscribe(
      resp => {
        console.log('updateInfo', resp.response);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo)).then(() => {
          store.dispatch({
            type: actions.USER_INFO_UPDATE,
            payload: userInfo,
          });
          navigation.navigate('Root', {
            screen: 'bottomTabs',
            params: { screen: 'home' },
          });
          onSuccess();
        });
      },
      e => {
        console.log('updateInfo', 'Fail!!', putData);
        onFail();
      },
    );
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

const addFormatDateToRequest = timeStamp => {
  const date = new Date(timeStamp);
  const addZeroIfNeed = number => (number > 9 ? number : `0${number}`);
  return `${date.getFullYear()}-${addZeroIfNeed(
    date.getMonth() + 1,
  )}-${addZeroIfNeed(date.getDate())}`;
};
export default Controller;

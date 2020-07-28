import iid from '@react-native-firebase/iid';
import messaging from '@react-native-firebase/messaging';
import NoticeUtils from './NoticeUtils';
import UserService from '../services/UserService';
import SessionUtils from './SessionUtils';

function createFirebaseUtil() {
  let _iid = '';
  let _token = '';
  const init = async () => {
    _iid = await iid().get();
    console.log('FirebaseUtil', 'Current Instance ID: ', _iid);
  };
  const saveTokenToDatabase = async token => {
    _token = token;
    const userId = SessionUtils.session().userId;
    userId &&
      UserService.updateFireBase(userId, token).subscribe(res => {
        if (res.response.status === 200) {
          console.log(
            'FirebaseUtil',
            'SaveToken',
            token,
            'update token success',
          );
        } else {
          console.log('FirebaseUtil', 'SaveToken', token, 'update token fail');
        }
      });
  };
  const handleToken = () => {
    if (SessionUtils.session().isLogin) {
      // Get the device token
      messaging()
        .getToken()
        .then(token => {
          return saveTokenToDatabase(token);
        });
      // Listen to whether the token changes
      return () => {
        messaging().onTokenRefresh(token => {
          saveTokenToDatabase(token);
        });
      };
    }
  };
  const onMessage = () => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
      // navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
      });
    return messaging().onMessage(async remoteMessage => {
      console.log(
        'FirebaseUtil',
        `Message:  "${JSON.stringify(remoteMessage)}"`,
      );
      NoticeUtils.addNotice(remoteMessage);
    });
  };
  return {
    init,
    handleToken,
    onMessage,
    id: _iid,
    token: _token,
  };
}

const FirebaseUtil = createFirebaseUtil();

export default FirebaseUtil;

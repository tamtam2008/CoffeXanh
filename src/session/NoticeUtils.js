import AppConfig from '../config/App.config';
import AsyncStorage from '@react-native-community/async-storage';

const storeKey = 'NoticeUtils';
function createNoticeUtil() {
  let notices = [];
  let callback = [];

  const init = async () => {
    const data = await AsyncStorage.getItem(storeKey);
    if (data) {
      try {
        notices = JSON.parse(data);
      } catch (e) {
        console.log('NoticeUtils', 'init error', e);
      }
      console.log('NoticeUtils', 'init', data, '=>', notices);
    }
  };
  const unreadNumber = () => notices.filter(notice => !notice.isRead).length;
  const addNotice = msg => {
    console.log('NoticeUtils', 'add notice', msg);
    if (notices.length > AppConfig.NOTI_MAX_LENGTH) {
      notices.shift();
    }
    notices.push({ ...msg, isRead: false });
    AsyncStorage.setItem(storeKey, JSON.stringify(notices));
    callback.forEach(cb => cb());
  };
  const readAll = () => {
    console.log('NoticeUtils', 'read all');
    notices = notices.map(notice => ({ ...notice, isRead: true }));
    AsyncStorage.setItem(storeKey, JSON.stringify(notices));
    callback.forEach(cb => cb());
  };
  const readMsg = sendTime => {
    console.log('NoticeUtils', 'read', sendTime);
    notices = notices.map(notice =>
      notice.sendTime === sendTime ? { ...notice, isRead: true } : notice,
    );
    AsyncStorage.setItem(storeKey, JSON.stringify(notices));
    callback.forEach(cb => cb());
  };
  const deleteMsg = messageId => {
    console.log('NoticeUtils', 'delete', messageId);
    notices = notices.filter(notice => notice.messageId !== messageId);
    AsyncStorage.setItem(storeKey, JSON.stringify(notices));
    callback.forEach(cb => cb());
  };
  const deleteMsgs = messageIds => {
    console.log('NoticeUtils', 'delete', messageIds);
    const _messageIds = messageIds ?? [];
    notices = notices.filter(notice => !_messageIds.include(notice.messageId));
    AsyncStorage.setItem(storeKey, JSON.stringify(notices));
    callback.forEach(cb => cb());
  };
  const deleteAll = () => {
    console.log('NoticeUtils', 'delete all');
    notices = [];
    AsyncStorage.setItem(storeKey, JSON.stringify(notices));
    callback.forEach(cb => cb());
  };
  const addCallBack = cb => {
    if (callback.filter(c => c === cb).length === 0) {
      callback.push(cb);
    }
  };
  const removeCallBack = cb => {
    callback = callback.filter(c => c !== cb);
  };
  return {
    notices: () => notices,
    storeKey,
    unreadNumber,
    init,
    addNotice,
    readMsg,
    readAll,
    deleteMsg,
    deleteMsgs,
    deleteAll,
    addCallBack,
    removeCallBack,
  };
}

const NoticeUtils = createNoticeUtil();

export default NoticeUtils;

import moment from 'moment';

export default {
  toHours: _time => moment(_time).format('HH:mm'),
  toDate: _time => {
    return `${formatTime(_time.getDate())}/${formatTime(
      _time.getMonth() + 1,
    )}/${_time.getFullYear()}`;
  },
  getTime: _time => {
    return `${formatTime(_time.getHours())}:${formatTime(
      _time.getMinutes(),
    )} ${formatTime(_time.getDate())}/${formatTime(
      _time.getMonth() + 1,
    )}/${_time.getFullYear()}`;
  },
};
const formatTime = time => (time > 9 ? `${time}` : `0${time}`);

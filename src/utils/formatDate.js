export default {
  toHours: _time => {
    return `${formatTime(_time.getHours())}:${formatTime(_time.getMinutes())}`;
  },
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

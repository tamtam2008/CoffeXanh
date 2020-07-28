import phonePrefix from '../config/VietNamePhonePrefix';

export const isEmail = (text) => {
  let regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(text);
};

// VN only todo add +84 prefix
export const isPhoneNumber = (text) => {
  const toRegex = phonePrefix.join().replace(/,/g, '|');
  const regex = new RegExp('^(' + toRegex + ')\\d{7}$', 'g');
  console.log(regex);
  return !!text.match(regex);
};

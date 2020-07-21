import Base64 from '../utils/Base64';

function createSessionUtils() {
  let tokenEncrypt = null;
  const buildAuthHeader = () => {
    const headers = {};
    if (tokenEncrypt) {
      headers.Authorization = Base64.atob(tokenEncrypt);
    }
    return headers;
  };
  const setToken = token => {
    tokenEncrypt = token;
  };
  return {
    tokenEncrypt,
    setToken,
    buildAuthHeader,
  };
}

const SessionUtils = createSessionUtils();

export default SessionUtils;

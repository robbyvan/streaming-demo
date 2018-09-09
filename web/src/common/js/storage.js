import storage from 'good-storage';
import moment from 'moment';

const TOKEN_KEY = '__token__';
export function loadToken() {
  const tokenObj = storage.get(TOKEN_KEY, null);
  if (tokenObj === null) {
    return null;
  }
  const created = moment.unix(tokenObj.timestamp);
  const diff = moment().diff(created, 'hours');
  if (diff > 0.9) {
    clearToken();
    return null;
  }
  return tokenObj.token
}

export function saveToken(token) {
  storage.set(TOKEN_KEY, {
    token,
    timestamp: moment().unix()
  });
  return token;
}

export function clearToken(token) {
  storage.remove(TOKEN_KEY);
  return null;
}

const USER_KEY = '__user__';
export function loadUserfromStorage() {
  return storage.get(USER_KEY, null);
}

export function saveUserToStorage(user) {
  storage.set(USER_KEY, user);
  return user;
}

export function clearStorageUser(user) {
  storage.remove(USER_KEY);
  return null;
}

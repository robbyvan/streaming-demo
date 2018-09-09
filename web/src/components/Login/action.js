import * as at from '../../constants/actionTypes';
import { saveToken, saveUserToStorage } from '../../common/js/storage';

export function saveUserToken(token) {
  const t = saveToken(token);
  return {
    type: at.SAVE_USER_TOKEN,
    payload: t
  };
}

export function setUser(user) {
  return {
    type: at.SET_USER,
    payload: user
  };
}
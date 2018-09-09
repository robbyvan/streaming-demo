import * as at from '../../constants/actionTypes';
import { loadToken, clearToken } from '../../common/js/storage';

export function signout() {
  clearToken();
  return {
    type: at.SIGN_OUT,
  };
}

export function setUser(user) {
  return {
    type: at.SET_USER,
    payload: user
  };
}

import * as at from '../../constants/actionTypes';
import { loadToken, clearToken } from '../../common/js/storage';
import { loadUserInfo } from '../../api/user';

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

export function asyncUserStatus(token) {
  return async dispatch =>
    loadUserInfo(token)
      .then(res => {
        if (res.data.success) {
          dispatch({ type: at.SET_USER, payload: res.data.user });
          dispatch({ type: at.SET_AUTHENTICATED, payload: true });
        } else {
          dispatch({ type: at.SIGN_OUT });
        }
      })
      .catch(err => {
        dispatch({ type: at.SIGN_OUT });
      });
}

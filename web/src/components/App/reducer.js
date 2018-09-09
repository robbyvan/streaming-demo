import * as at from '../../constants/actionTypes';
import { loadToken } from '../../common/js/storage';

const initialState = {
  user: null,
  token: loadToken()
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case at.SAVE_USER_TOKEN:
      return { ...state, token: action.payload };
    case at.SET_USER:
      return { ...state, user: action.payload };
    case at.SIGN_OUT:
      return { ...state, user: null, token: null };
    default:
      return state;
  }
};

export default appReducer;
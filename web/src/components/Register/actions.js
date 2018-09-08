import * as at from '../../constants/actionTypes';
import { signup } from '../../api/user';

// export function register(user) {
//   return async dispatch => {
//     signup(user)
//       .then(response => dispatch({ type: at.SIGNUP_SUCCESS , payload:  response.data }))
//       .catch(err => dispatch({ type: at.SIGNUP_FAIL }));
//   }
// }
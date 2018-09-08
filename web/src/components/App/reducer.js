// import * as at from '../../constants/actionTypes';

const initialState = {
  user: {
    name: '',
    email: '',
    password: '',
  }
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
};

export default appReducer;
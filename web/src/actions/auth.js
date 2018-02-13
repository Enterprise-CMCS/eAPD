export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const requestLogin = () => ({ type: LOGIN_REQUEST });
export const completeLogin = user => ({ type: LOGIN_SUCCESS, user });
export const failLogin = error => ({ type: LOGIN_FAILURE, error });

export const attemptLogin = (user, pw) => dispatch => {
  dispatch(requestLogin());
  console.log(`user: ${user} pw: ${pw}`);

  setTimeout(() => {
    dispatch(completeLogin({ id: 1 }));
  }, 1000);
};

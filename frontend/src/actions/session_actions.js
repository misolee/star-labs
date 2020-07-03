import * as APIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";
export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveUserSignIn = () => ({
  type: RECEIVE_USER_SIGN_IN
});
  
export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});

export const changeUserLanguage = (language) => ({
  type: CHANGE_LANGUAGE,
  language
})

export const register = user => dispatch => (
  APIUtil.register(user)
    .then(() => dispatch(receiveUserSignIn()))
    .catch(err => dispatch(receiveErrors(err.response.data)))
);

export const login = user => dispatch => (
  APIUtil.login(user)
    .then(res => {
      const { token } = res.data;
      const decoded = jwt_decode(token);
      localStorage.setItem('jwtToken', token);
      APIUtil.setAuthToken(token);
      dispatch(receiveCurrentUser(decoded));
    })
    .catch(err => dispatch(receiveErrors(err.response.data)))
);

export const logout = () => dispatch => {
  APIUtil.logout();
  dispatch(logoutUser());
}

export const changeLanguage = (language) => dispatch => {
  dispatch(changeUserLanguage(language));
}
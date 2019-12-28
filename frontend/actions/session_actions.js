import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO';
export const RECEIVE_USER_PORTFOLIO = 'RECEIVE_USER_PORTFOLIO';

const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
});

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});

const receiveUserInfo = info => ({
  type: RECEIVE_USER_INFO,
  info
});

const receiveUserPortfolio = data => ({
  type: RECEIVE_USER_PORTFOLIO,
  data
})

export const signup = (user) => dispatch => (
  SessionApiUtil.signup(user)
    .then(newUser => dispatch(receiveCurrentUser(newUser)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const login = (user) => dispatch => (
  SessionApiUtil.login(user)
    .then(newUser => dispatch(receiveCurrentUser(newUser)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const logout = () => dispatch => (
  SessionApiUtil.logout()
    .then(() => {
      dispatch(logoutCurrentUser())
      // Always in light mode, unless logged in
      document.documentElement.removeAttribute('data-theme');
      localStorage.removeItem('theme');
    })
);

export const fetchUserInfo = user => dispatch => (
  SessionApiUtil.fetchUserInfo(user)
    .then(info => dispatch(receiveUserInfo(info)))
);

export const fetchUserPortfolio = user => dispatch => (
  SessionApiUtil.fetchUserPortfolio(user)
    .then(data => dispatch(receiveUserPortfolio(data)))
)

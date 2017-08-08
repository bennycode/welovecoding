import axios from 'axios';
import CONFIG from 'src/config';

const MANUAL_LOGIN_USER = 'auth/MANUAL_LOGIN_USER';
const LOGIN_SUCCESS_USER = 'auth/LOGIN_SUCCESS_USER';
const LOGIN_ERROR_USER = 'auth/LOGIN_ERROR_USER';
const SIGNUP_USER = 'auth/SIGNUP_USER';
const SIGNUP_SUCCESS_USER = 'auth/SIGNUP_SUCCESS_USER';
const SIGNUP_ERROR_USER = 'auth/SIGNUP_ERROR_USER';
const LOGOUT_USER = 'auth/LOGOUT_USER';
const LOGOUT_SUCCESS_USER = 'auth/LOGOUT_SUCCESS_USER';
const LOGOUT_ERROR_USER = 'auth/LOGOUT_ERROR_USER';
const REGISTER_USER = 'auth/REGISTER_USER';
const REGISTER_SUCCESS_USER = 'auth/REGISTER_SUCCESS_USER';
const REGISTER_ERROR_USER = 'auth/REGISTER_ERROR_USER';

function beginLogin() {
  return {type: MANUAL_LOGIN_USER};
}

function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS_USER,
    data,
  };
}

function loginError() {
  return {type: LOGIN_ERROR_USER};
}

function beginLogout() {
  return {type: LOGOUT_USER};
}

function logoutSuccess() {
  return {type: LOGOUT_SUCCESS_USER};
}

function logoutError() {
  return {type: LOGOUT_ERROR_USER};
}

function beginRegister() {
  return {type: REGISTER_USER};
}

function registerSuccess() {
  return {type: REGISTER_SUCCESS_USER};
}

function registerError() {
  return {type: REGISTER_ERROR_USER};
}

function makeUserRequest(method, data, api = '/login') {
  return axios({
    method,
    url: api,
    data,
  });
}

function handleLoginSuccess(dispatch, response) {
  console.log(response);
  if (response.data.success) {
    dispatch(
      loginSuccess({
        username: response.data.data.username,
        email: response.data.data.email,
        token: response.data.data.token,
      }),
    );
  } else {
    dispatch(loginError());
  }
  return response;
}

function handleLoginException(_, response) {
  if (response instanceof Error) {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', response.message);
    return response.message;
  }
}

export function loginViaToken(token) {
  return dispatch => {
    return axios({
      method: 'get',
      url: CONFIG.API.AUTH_TOKEN_LOGIN,
      headers: {
        token,
      },
    })
      .then(res => handleLoginSuccess(dispatch, res))
      .catch(response => handleLoginException(dispatch, response));
  };
}

export function manualLogin(username, password) {
  const data = {
    username,
    password,
  };
  return dispatch => {
    dispatch(beginLogin());

    return makeUserRequest('post', data, CONFIG.API.AUTH_LOCAL_LOGIN)
      .then(response => handleLoginSuccess(dispatch, response))
      .catch(response => handleLoginException(dispatch, response));
  };
}

export function manualLogout() {
  return dispatch => {
    dispatch(beginLogout());

    return axios
      .get('/logout')
      .then(response => {
        if (response.data.success) {
          dispatch(logoutSuccess());
        } else {
          dispatch(logoutError());
        }
      })
      .catch(response => {
        if (response instanceof Error) {
          // Something happened during logout that triggered an Error
          console.log('Error', response.message);
        }
      });
  };
}

export function manualRegister(data) {
  return dispatch => {
    dispatch(beginRegister());

    return makeUserRequest('post', data, '/register')
      .then(response => {
        if (response.data.success) {
          dispatch(registerSuccess());
          // dispatch(manualLogin(data));
        } else {
          dispatch(registerError());
          const registerMessage = response.data.message;
          return registerMessage;
        }
      })
      .catch(response => {
        if (response instanceof Error) {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', response.message);
        }
      });
  };
}

export interface AuthState {
  isWaiting: boolean;
  authenticated: boolean;
  token: string;
  email: string;
}

const initialState: AuthState = {
  isWaiting: false,
  authenticated: false,
  token: '',
  email: '',
};

function authReducer(state: AuthState = initialState, action) {
  switch (action.type) {
    case MANUAL_LOGIN_USER:
      return {
        ...state,
        isWaiting: true,
      };
    case LOGIN_SUCCESS_USER:
      return {
        ...state,
        isWaiting: false,
        authenticated: true,
        email: action.data.email,
        token: action.data.token,
      };
    case LOGIN_ERROR_USER:
      return {
        ...state,
        isWaiting: false,
        authenticated: false,
      };
    case SIGNUP_USER:
      return {
        ...state,
        isWaiting: true,
      };
    case SIGNUP_SUCCESS_USER:
      return {
        ...state,
        isWaiting: false,
        authenticated: true,
      };
    case SIGNUP_ERROR_USER:
      return {
        ...state,
        isWaiting: false,
        authenticated: false,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isWaiting: true,
      };
    case LOGOUT_SUCCESS_USER:
      return {
        ...state,
        isWaiting: false,
        authenticated: false,
        email: '',
        token: '',
      };
    case LOGOUT_ERROR_USER:
      return {
        ...state,
        isWaiting: false,
        authenticated: true,
      };
    case REGISTER_USER:
      return {
        ...state,
        isWaiting: true,
      };
    case REGISTER_SUCCESS_USER:
      return {
        ...state,
        isWaiting: false,
      };
    case REGISTER_ERROR_USER:
      return {
        ...state,
        isWaiting: false,
      };
    default:
      return state;
  }
}

export default authReducer;

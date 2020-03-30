import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
} from './types';
import setAuthToken from '../utils/setAuthToken';

import getStorageProvider from '../utils/getStorageProvider';

const storage = getStorageProvider();

// Load / authenticate user
export const loadUser = () => async dispatch => {
  if (storage.token) {
    setAuthToken(storage.token);
  }

  try {
    const res = await axios.get('/api/auth');
    dispatch({ type: USER_LOADED, payload: res.data });
    console.log('success');
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// register user
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);
    storage.setItem('token', res.data.token);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 3000)));
    }
    storage.removeItem('token');
    dispatch({ type: REGISTER_FAIL });
  }
};

// login user
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);
    storage.setItem('token', res.data.token);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 3000)));
    }
    storage.removeItem('token');
    dispatch({ type: LOGIN_FAIL });
  }
};

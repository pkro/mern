import axios from 'axios';
import getStorageProvider from './getStorageProvider';

const storage = getStorageProvider();

const setAuthToken = (token) => {
  if (storage.getItem('token')) {
    axios.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token', token);
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
  }
};

export default setAuthToken;

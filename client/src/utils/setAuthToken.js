import axios from 'axios';
import getStorageProvider from './getStorageProvider';

const storage = getStorageProvider();

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
    storage.setItem('token', token);
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
    storage.removeItem('token');
  }
};

export default setAuthToken;

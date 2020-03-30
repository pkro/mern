import axios from 'axios';
import getStorageProvider from './getStorageProvider';

const storage = getStorageProvider();

const setAuthToken = token => {
  if (storage.getItem('token')) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;

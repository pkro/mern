import axios from 'axios';
import { setAlert } from './alert';

import { GET_PROFILE, PROFILE_ERROR, CREATE_PROFILE } from '../actions/types';

// get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// create / update current users profile
export const createProfile = ({
  company,
  website,
  location,
  status,
  skills,
  githubusername,
  bio,
  twitter,
  facebook,
  xing,
  linkedin,
  youtube,
  instagram,
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const body = {
      company,
      website,
      location,
      status,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      xing,
      linkedin,
      youtube,
      instagram,
    };

    const res = await axios.post('api/profile', body, config);
    dispatch({ type: CREATE_PROFILE, payload: body });
    console.log(res);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 3000)));
    }
  }
};

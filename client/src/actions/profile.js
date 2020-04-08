import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  CLEAR_PROFILE,
} from '../actions/types';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
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

// get profile by id
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/${userId}`);
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

// get all profiles
export const getProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile');
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// get users github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch({
      type: GET_REPOS,
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
export const editProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const res = await axios.post('/api/profile', formData, config);
    dispatch({ type: GET_PROFILE, payload: res.data }); // as it returns the profile
    dispatch(setAlert(edit ? 'Profile updated' : 'Profile created', 'success'));
    // we can't use Redirect from react router in an action
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger', 3000)));
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// add education or experience
export const addProfileData = (type, formData, history) => async (dispatch) => {
  if (!['education', 'experience'].includes(type)) {
    throw new Error(
      'type parameter must be either "education" or "experience"'
    );
  }
  try {
    const res = await axios.put(`/api/profile/${type}`, formData, config);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(
      setAlert(type[0].toUpperCase() + type.slice(1) + ' added', 'success')
    );
    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// delete profile data (experience / education)
export const deleteProfileData = (type, id) => async (dispatch) => {
  if (!['education', 'experience'].includes(type)) {
    throw new Error(
      'type parameter must be either "education" or "experience"'
    );
  }
  try {
    const res = await axios.delete(`/api/profile/${type}/${id}`, config);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Item deleted', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

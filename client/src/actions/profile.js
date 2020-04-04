import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR } from '../actions/types';
import Alert from '../components/layout/Alert';

// get current users profile
export const getCurrentProfile = () => async (dispatch) => {
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
export const editProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/profile', formData, config);
    dispatch({ type: GET_PROFILE, payload: res.data }); // as it returns the profile
    dispatch(setAlert(edit ? 'Profile updated' : 'Profile created', 'success'));
    if (!edit) {
      // we can't use Redirect from react router in an action
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(err);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger', 3000)));
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

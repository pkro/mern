import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

// TODO: either scroll to top so user can see alert if scrolled down or position alert float on top of screen in css
export const setAlert = (msg, alertType, msToTimeout = 3000) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: {
      id,
      msg,
      alertType,
      msToTimeout,
    },
  });
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), msToTimeout);
};

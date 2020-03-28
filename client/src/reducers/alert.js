import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = []; // array will contain objects in the form of {id: 1, msg: "Please log in", alertType: 'success'}

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload]; // action.payload i.e. {id: 1, msg: "Please log in", alertType: 'success'}
    case REMOVE_ALERT:
      return state.filter(e => e.id !== payload); // payload just the id
    default:
      return state;
  }
}

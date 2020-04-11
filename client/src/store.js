// All this is pretty much boilerplate and will not have to be changed again
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // if you get an "object is not a function" you probably misspelled composeWithDevTools
import thunk from 'redux-thunk'; // middleware, https://alligator.io/redux/redux-thunk/ - basically allows async actions in action creators (or something...)
import rootReducer from './reducers'; //automatically uses reducers/index.js
import setAuthToken from './utils/setAuthToken';

const initialState = {};

const middleware = [thunk]; // so more middleware can be added later, applyMiddleware(thunk) would also work

// composeWithDevTools should probably be removed in production ?
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// set up a store subscription listener
// to store the users token in localStorage

// prevent auth error on first run of subscription
let currentState = {
  auth: { token: null, isAuthenticated: null, loading: true, user: null },
};

store.subscribe(() => {
  // keep track of the previous and current state to compare changes
  let previousState = currentState;
  currentState = store.getState();
  // if the token changes set the value in localStorage and axios headers
  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    setAuthToken(token);
  }
});

export default store;

// All this is pretty much boilerplate and will not have to be changed again
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // if you get an "object is not a function" you probably misspelled composeWithDevTools
import thunk from 'redux-thunk'; // middleware, https://alligator.io/redux/redux-thunk/ - basically allows async actions in action creators (or something...)
import rootReducer from './reducers'; //automatically uses reducers/index.js

const initialState = {};

const middleware = [thunk]; // so more middleware can be added later, applyMiddleware(thunk) would also work

// composeWithDevTools should probably be removed in production ?
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

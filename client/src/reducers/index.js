// this file is the root reducer
import { combineReducers } from 'redux';
import alert from './alert';
import register from './auth';
export default combineReducers({ alert, register });

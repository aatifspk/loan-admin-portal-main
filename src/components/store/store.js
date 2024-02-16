import { combineReducers } from 'redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'; // Import your rootReducer
import { configureStore } from '@reduxjs/toolkit';
import Auth from '../actions/Auth';
import { composeWithDevTools } from '@reduxjs/toolkit/dist/devtoolsExtension';


const rootReducer=combineReducers({auth:Auth})
const composedEnhancer =composeWithDevTools(applyMiddleware(thunk))
const store = configureStore({rootReducer,composedEnhancer});

export default store;

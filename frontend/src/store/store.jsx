import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from '../reducers/authReducer';
import exReducer from '../reducers/exReducer'

const rootReducer = combineReducers({
	auth: authReducer,
	ex: exReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

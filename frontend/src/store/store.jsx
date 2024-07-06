import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from '../reducers/authReducer';
import exReducer from '../reducers/exReducer';
import layoutReducer from '../reducers/layoutReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	ex: exReducer,
	layout: layoutReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, 
	composeEnhancers(
    applyMiddleware(thunk)
  	)
);

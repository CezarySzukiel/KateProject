import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from '../reducers/authReducer';
import exReducer from '../reducers/exReducer';
import layoutReducer from '../reducers/layoutReducer';
import blogReducer from '../reducers/blogReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	ex: exReducer,
	layout: layoutReducer,
	blog: blogReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, 
	composeEnhancers(
    applyMiddleware(thunk)
  	)
);

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from '../reducers/authReducer';
import exReducer from '../reducers/exReducer'

const rootReducer = combineReducers({
	auth: authReducer,
	ex: exReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, 
	composeEnhancers(
    applyMiddleware(thunk)
  	)
);

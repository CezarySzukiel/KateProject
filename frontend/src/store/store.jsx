import { createStore, combineReducers } from 'redux';

import authReducer from '../reducers/authReducer.jsx';
import counterReducer from '../reducers/counterReducer.jsx';


const rootReducer = combineReducers({
	counter: counterReducer,
	auth: authReducer,
});

export const store = createStore(rootReducer)

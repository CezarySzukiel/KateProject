import { createStore, combineReducers } from 'redux';

import authReducer from '../reducers/authReducer.jsx';

const rootReducer = combineReducers({
	auth: authReducer,
});

export const store = createStore(rootReducer)

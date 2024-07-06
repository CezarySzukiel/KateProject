import { SET_NAVBAR_DISPLAY } from '../actions/layoutActions'

const initialState = {
	isNavbar: false
}

const lauoutReducer = (state = initialState, action) => {
	switch(action.type) {
	case SET_NAVBAR_DISPLAY: 
		return {
			...state,
			isNavbar: action.payload
		}
	default:
      return state;
	}

}

export default lauoutReducer
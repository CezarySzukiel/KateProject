import { SET_SIDEBAR_DISPLAY } from '../actions/layoutActions'

const initialState = {
	isNavbar: false
}

const lauoutReducer = (state = initialState, action) => {
	switch(action.type) {
	case SET_SIDEBAR_DISPLAY:
		return {
			...state,
			isNavbar: action.payload
		}
	default:
      return state;
	}

}

export default lauoutReducer
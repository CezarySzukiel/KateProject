export const SET_NAVBAR_DISPLAY = 'SET_NAVBAR_DISPLAY'

export const setNavbarDisplay = (payload) => {
	return {
		type: SET_NAVBAR_DISPLAY,
		payload: payload,
	}
}
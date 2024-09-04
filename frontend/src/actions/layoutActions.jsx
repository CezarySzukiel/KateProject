export const SET_SIDEBAR_DISPLAY = 'SET_NAVBAR_DISPLAY'

export const setSidebarDisplay = (payload) => {
	return {
		type: SET_SIDEBAR_DISPLAY,
		payload: payload,
	}
}
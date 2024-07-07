export const SET_ACTUAL_POST = 'SET_ACTUAL_POST';

export const setActualPost = (payload) => {
	return {
		type: SET_ACTUAL_POST,
		payload: payload,
	}
}

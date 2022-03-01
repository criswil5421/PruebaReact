export const LOGIN="LOGIN";
export const LOGIN_LOADING="LOGIN_LOADING";
export const LOGIN_SUCCESS="LOGIN_SUCCESS";
export const LOGIN_ERROR="LOGIN_ERROR";
export const LOGIN_CHECK="LOGIN_CHECK";
export const LOGIN_EMPTY="LOGIN_EMPTY";
export const LOGOUT="LOGOUT";
export const LOGOUT_LOADING="LOGOUT_LOADING";
export const LOGOUT_SUCCESS="LOGOUT_SUCCESS";

export const login=(data) => ({
	type: LOGIN,
	payload: data
});

export const checkLogin=() => ({
	type: LOGIN_CHECK
});

export const logout=() => ({
	type: LOGOUT
});

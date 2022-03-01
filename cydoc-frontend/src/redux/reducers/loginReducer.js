import jwt from "jwt-decode";
import {
	LOGIN_LOADING,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	LOGIN_EMPTY,
	LOGOUT_LOADING,
	LOGOUT_SUCCESS
} from "../actions";

const initialState={
	cargando: false,
	autenticado: true,
	token: undefined,
	usuario: undefined,
	perfiles: [],
	error: undefined
};

const login=(previousState=initialState,action) => {
	switch (action.type) {
		case LOGIN_LOADING:
		case LOGOUT_LOADING:
			return {
				...previousState,
				cargando: true
			};
		case LOGIN_SUCCESS:
			const token=jwt(action.payload.accessToken);
			return {
				cargando: false,
				autenticado: true,
				token: action.payload,
				usuario: token.name,
				perfiles: token.authorities,
				error: undefined
			};
		case LOGIN_ERROR:
			return {
				cargando: false,
				autenticado: false,
				token: undefined,
				perfiles: [],
				error: action.payload
			};
		case LOGIN_EMPTY:
		case LOGOUT_SUCCESS:
			return {
				cargando: false,
				autenticado: false,
				token: undefined,
				perfiles: [],
				error: undefined
			};
		default:
			return previousState;
	}
};

export default login;

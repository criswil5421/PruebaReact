import {takeLatest,all,put,call} from "redux-saga/effects";
import {
	LOGIN,
	LOGIN_LOADING,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	LOGIN_CHECK,
	LOGIN_EMPTY,
	LOGOUT,
	LOGOUT_LOADING,
	LOGOUT_SUCCESS
} from "../actions";
import login from "../../api/loginApi";

function* handleLogin({payload}){
	yield put({type: LOGIN_LOADING});
	try{
		const response=yield call(login,payload);
		localStorage.setItem("token",response.accessToken);
		localStorage.setItem("refresh",response.refreshToken);
		localStorage.setItem("expiry",response.vencimiento);
		yield all([
			put({
				type: LOGIN_SUCCESS,
				payload: response
			})
		]);
	}
	catch(error){
		yield put({
			type: LOGIN_ERROR,
			payload: {
				mensaje: error.message ? error.message : "Error iniciando sesión",
				hora: new Date().getTime()
			}
		});
	}
}

function* handleCheck(){
	yield put({type: LOGIN_LOADING});
	const expiry=localStorage.getItem("expiry");
	if(!expiry){
		yield put({type: LOGIN_EMPTY});
	}
	else{
		let expiracion=parseInt(expiry)
		if(new Date().getTime() < expiracion){
			let accessToken=localStorage.getItem("token");
			yield all([
				put({
					type: LOGIN_SUCCESS,
					payload: {
						accessToken: accessToken,
						refreshToken: localStorage.getItem("refresh"),
						vencimiento: expiracion
					}
				})
			]);
		}
		else{
			// TODO: verificar refresh token
			localStorage.clear();
			yield put({type: LOGIN_EMPTY});
		}
	}
}

function* handleLogout(){
	yield put({type: LOGOUT_LOADING});
	localStorage.clear();
	yield all([
		put({type: LOGOUT_SUCCESS})
	]);
}

export const loginSaga=function*(){
	yield takeLatest(LOGIN,handleLogin);
};

export const checkLoginSaga=function*(){
	yield takeLatest(LOGIN_CHECK,handleCheck);
};

export const logoutSaga=function*(){
	yield takeLatest(LOGOUT,handleLogout);
};

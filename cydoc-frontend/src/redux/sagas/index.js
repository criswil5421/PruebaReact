import {all} from "redux-saga/effects";
import {loginSaga,checkLoginSaga,logoutSaga} from "./loginSaga";

const sagas=() => function*(){
	yield all([
		loginSaga(),
		checkLoginSaga(),
		logoutSaga()
	]);
};

export default sagas;

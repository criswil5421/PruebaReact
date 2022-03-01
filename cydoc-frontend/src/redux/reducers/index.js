import {combineReducers} from "redux";
import ui from "./uiReducer";
import autenticar from "./loginReducer";
import notificar from "./notificacionReducer";

export default combineReducers({
	ui: ui,
	autenticacion: autenticar,
	notificaciones: notificar
});

import {MOSTRAR_NOTIFICACION,OCULTAR_NOTIFICACION} from "../actions";

const notificacion=(previousState=[],action) => {
	switch (action.type) {
		case MOSTRAR_NOTIFICACION:
			return previousState.concat(action.payload);
		case OCULTAR_NOTIFICACION:
			return previousState.slice(1);
		default:
			return previousState;
	}
};

export default notificacion;

export const MOSTRAR_NOTIFICACION="MOSTRAR_NOTIFICACION";
export const OCULTAR_NOTIFICACION="OCULTAR_NOTIFICACION";

export const notificar=(mensaje,tipo="default") => ({
	type: MOSTRAR_NOTIFICACION,
	payload: {
		mensaje: mensaje,
		tipo: tipo
	}
});

export const ocultarNotificacion=() => ({
	type: OCULTAR_NOTIFICACION
});

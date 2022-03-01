export const CAMBIAR_TEMA="CAMBIAR_TEMA";
export const CAMBIAR_IDIOMA="CAMBIAR_IDIOMA";

export const cambiarTema=(tema="dark") => ({
	type: CAMBIAR_TEMA,
	payload: tema
});

export const cambiarIdioma=(idioma="es") => ({
	type: CAMBIAR_IDIOMA,
	payload: idioma
});

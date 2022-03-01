import {CAMBIAR_TEMA} from "../actions";

const initialState={
	tema: "light",
	idioma: "es"
}

const ui=(previousState=initialState,action) => {
	switch (action.type) {
		case CAMBIAR_TEMA:
			return {
				...previousState,
				tema: action.payload
			}
		default:
			return previousState;
	}
};

export default ui;

import {useCallback} from "react";
import {useDispatch} from "react-redux";
import {notificar} from "../redux/actions";

const useNotificar=() => {
	const dispatch=useDispatch();
	return useCallback((mensaje,tipo="default") => {
		dispatch(notificar(mensaje,tipo));
	},[dispatch]);
};

export default useNotificar;

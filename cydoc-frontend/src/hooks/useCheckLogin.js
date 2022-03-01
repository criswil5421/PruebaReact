import {useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {checkLogin} from "../redux/actions";

const useCheckLogin=() => {
	const dispatch=useDispatch();
	const {autenticado}=useSelector(store => store.autenticacion);

	useEffect(() => {
		dispatch(checkLogin());
	},[dispatch]);

	// retornar autenticado
	return true;
};

export default useCheckLogin;

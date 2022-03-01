import React,{useEffect,useState} from "react";
import {useSelector,useDispatch} from "react-redux";
import {Snackbar,Alert} from "@mui/material";
import {useTranslate} from "react-polyglot";
import {ocultarNotificacion} from "../redux";

const Notificacion=() => {
	const [open,setOpen]=useState(false);
	const dispatch=useDispatch();
	const translate=useTranslate();
	const notificacion=useSelector(store => store.notificaciones[0]);

	useEffect(() => {
		setOpen(!!notificacion);
	},[notificacion]);

	const handleClose=() => {
		setOpen(false);
		dispatch(ocultarNotificacion());
	};

	return (
		<Snackbar
			open={open}
			message={notificacion && notificacion.mensaje && notificacion.tipo === "default" && translate(notificacion.mensaje)}
			autoHideDuration={5000}
			onClose={handleClose}
		>
		{notificacion && notificacion.mensaje && notificacion.tipo !== "default" &&
			<Alert severity={notificacion.tipo}>{translate(notificacion.mensaje)}</Alert>
		}
		</Snackbar>
	);
};

export default Notificacion;

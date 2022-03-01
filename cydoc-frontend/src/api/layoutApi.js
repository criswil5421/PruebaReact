import {mockBackendUrl,backendUrl} from "../Constantes";
import axios from "axios";

export const menuApi=(token) => ({
	get: () => axios({
		url: `${mockBackendUrl[process.env.NODE_ENV]}/menu`,
		headers: {
			Authorization: `Bearer ${token}`
		}
	}).then(({data}) => data)
});

import React from "react";
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
	useLocation
} from "react-router-dom";
import {useCheckLogin} from "./hooks";
import {Login} from "./login";

const RequiereAuth=({redirectTo,children}) => {
	const location=useLocation();
	const autenticado=useCheckLogin();

	return autenticado ? children : <Navigate to={redirectTo} state={{from: location}} replace />;
};

const MainRouter=({children}) => (
	<BrowserRouter>
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route
				path="/*"
				element={
					<RequiereAuth redirectTo="/login">
						{children}
					</RequiereAuth>
				}
			/>
		</Routes>
	</BrowserRouter>
);

export default MainRouter;

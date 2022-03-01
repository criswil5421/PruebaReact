import React from "react";
import {
	Box,
	Container
} from "@mui/material";
import {useTheme} from '@mui/material/styles';
import {
	Routes,
	Route
} from "react-router-dom";
import Cabecera from "./Cabecera";
import Drawer from "./Drawer";
import Notificacion from "./Notificacion";
import {Home} from "../views/home";


const MainLayout=() => {

	const [open, setOpen] = React.useState(false);

	const theme = useTheme();
	const handleDrawerOpen = () => {
	  setOpen(true);
	};
  
	const handleDrawerClose = () => {
	  setOpen(false);
	};



	return (<Box sx={{
			display: "flex",
	        flexDirection: "column",
	        minHeight: "100vh",
	        justifyContent: "flex-start",
			backgroundColor: "background.default"
			
		}}>
			
			<Box sx={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				
			}}>
				
				<Drawer handleDrawerClose={handleDrawerClose} variant="permanent" open={open}/>
				<Cabecera handleDrawerOpen={handleDrawerOpen} open={open}/>

				<Container  maxWidth={false} sx={{py: 2, mt: 12, ml: 12,
				...(open && {
					ml: 35,
				  }),}}>		
					<Routes>
						<Route path="/" element={<Home />} />	
					</Routes>
				</Container>

				
			</Box>
			<Notificacion />
		</Box>)
};



export default MainLayout;

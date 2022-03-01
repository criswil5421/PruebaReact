import React,{useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {useTranslate} from "react-polyglot";
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import {styled} from "@mui/system";
import {
	Box,
	
	Toolbar,
	Link,
	Typography,
	IconButton,
	Menu,
	MenuItem,
	ListItemIcon
} from "@mui/material";
import {AccountCircle,Logout as LogoutIcon} from "@mui/icons-material";
import {Link as RouterLink} from "react-router-dom";
import {getUsuario,logout} from "../redux";

const Logo=styled("img")({
	maxHeight: 50,
	width: "auto"
});


const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
	  easing: theme.transitions.easing.sharp,
	  duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
	  marginLeft: 240,
	  width: `calc(100% - ${240}px)`,
	  transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	  }),
	}),
  }));


const Logout=({onClick}) => {
	const translate=useTranslate();
	const dispatch=useDispatch();

	const click=() => {
		dispatch(logout());
		if(onClick){
			onClick();
		}
	};

	return (
		<MenuItem onClick={click}>
			<ListItemIcon>
				<LogoutIcon />
			</ListItemIcon>
			{translate("ui.cabecera.logout")}
		</MenuItem>
	);
};

const Cabecera=(props) => {


	

	const translate=useTranslate();
	const usuario=useSelector(getUsuario);
	const [anchorEl,setAnchorEl]=useState(null);

	const cerrar=() => {
		setAnchorEl(null);
	};

	return (
		<AppBar position="fixed" enableColorOnDark open={props.open}>
			<Toolbar>

				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={props.handleDrawerOpen}
					edge="start"
					sx={{
						marginRight: '36px',
						...(props.open && { display: 'none' }),
					}}
					>
					<MenuIcon />
				</IconButton>



				<Link component={RouterLink} to="/" sx={{display: "flex"}}>
					<Logo src="/logo192.png" alt="CYDOC" />
				</Link>
				<Box sx={{ml: 3,flexGrow: 1}}>
					<Typography variant="h5">{translate("ui.titulo")}</Typography>
				</Box>
				<IconButton size="large" color="inherit" onClick={event => setAnchorEl(event.currentTarget)}>
					<AccountCircle />
				</IconButton>
				<Menu anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={cerrar}>
					<MenuItem>
						<Typography variant="caption">{usuario}</Typography>
					</MenuItem>
					<Logout onClick={cerrar} />
				</Menu>
			</Toolbar>
		</AppBar>
	);
};

export default Cabecera;

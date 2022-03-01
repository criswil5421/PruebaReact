import React,{useEffect,useMemo, useState} from "react";
import {Provider,useDispatch,useSelector} from "react-redux";
import {I18n} from "react-polyglot";
import {es} from "date-fns/locale"
import {CssBaseline,useMediaQuery} from "@mui/material";
import {ThemeProvider,createTheme} from "@mui/material/styles";
import {LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {QueryClient,QueryClientProvider} from "react-query";
import createStore,{cambiarTema} from "./redux";
import messages from "./i18n";
import MainRouter from "./MainRouter";
import {MainLayout} from "./layout";


const supportedLocales={es};
const queryClient=new QueryClient();


const Idioma=({children}) => {
	const idioma=useSelector(store => store.ui.idioma);

	return (
		<I18n locale={idioma} messages={messages[idioma]}>
			<LocalizationProvider dateAdapter={AdapterDateFns} locale={supportedLocales[idioma]}>
				{children}
			</LocalizationProvider>
		</I18n>
	);
};

const Tema=({children}) => {
	const dispatch=useDispatch();
	const tema=useSelector(store => store.ui.tema);
	const prefersDarkMode=useMediaQuery("(prefers-color-scheme: dark)");

	useEffect(() => {
		dispatch(cambiarTema(prefersDarkMode ? "dark" : "light"));
	},[dispatch,prefersDarkMode]);

	const theme=useMemo(() => createTheme({
		palette: {
			mode: tema,
			primary: {
				main: "#3f51b5",
			},
			secondary: {
				main: "#7e57c2",
			},
			background: {
				default: tema === "dark" ? "#04071e" : "#fafafa",
				paper: tema === "dark" ? "#110c29" : "#fff",
			}
		},
		shape: {
			borderRadius: 6
		}
	}),[tema]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};

const App=() => (
	<Provider store={createStore()}>
		<Idioma>
			<Tema>
				<QueryClientProvider client={queryClient}>
					<MainRouter>
						<MainLayout />
					</MainRouter>
				</QueryClientProvider>
			</Tema>
		</Idioma>
	</Provider>
);

export default App;

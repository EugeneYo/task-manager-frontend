import "@fontsource/nunito";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store } from "./Store/store";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { ColorModeScript, ChakraProvider, layout } from "@chakra-ui/react";
import theme from "./myTheme";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ChakraProvider theme={theme}>
				<Router>
					<App />
				</Router>
			</ChakraProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

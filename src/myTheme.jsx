import { extendTheme } from "@chakra-ui/react";

const config = {
	initialColorMode: "dark",
	useSystemColorMode: false,
};

const theme = extendTheme({
	// @ts-ignore
	config,
	fonts: {
		body: "Nunito",
	},
	shadows: {
		teal: "0 0 0 0px #38b2ac",
	},
});
export default theme;

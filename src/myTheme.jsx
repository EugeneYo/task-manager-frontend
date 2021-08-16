import { extendTheme, Icon, useStyleConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { BiEdit } from "react-icons/bi";
const config = {
	initialColorMode: "dark",
	useSystemColorMode: false,
};
const FormBox = {
	baseStyle: (props) => ({
		bg: mode("white", "#313b47")(props),
		w: { base: "350px", sm: "450px", md: "550px" },
		p: 3,
		boxShadow: "sm",
		rounded: "lg",
		mx: "auto",
		mt: ["28"],
		borderColor: mode("teal.400", "")(props),
		borderWidth: mode("2px", "")(props),
	}),
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
	components: {
		FormBox,
		Button: {
			borderStyle: {},
			variants: {
				// @ts-ignore
				"simple-teal": (props) => ({
					bg: mode("teal.500", "teal.300")(props),
					color: mode("gray.100", "black")(props),
					_hover: {
						bg: mode("teal.600", "teal.400")(props),
					},
					borderRadius: "full",
				}),
				create: (props) => ({
					w: "50%",
					bg: "green.400",
					borderRadius: "none",
					borderBottomLeftRadius: "lg",
					fontWeight: "400",
					color: "white",
					visibility: "hidden",
					_groupHover: {
						visibility: "visible",
					},
					_hover: {
						bg: "green.500",
					},
				}),
				delete: (props) => ({
					w: "50%",
					bg: "red.500",
					borderRadius: "none",
					borderBottomRightRadius: "lg",
					fontWeight: "400",
					color: "white",
					visibility: "hidden",
					_groupHover: {
						visibility: "visible",
					},
					_hover: {
						bg: "read.600",
					},
				}),
			},
		},
	},
});

export default theme;

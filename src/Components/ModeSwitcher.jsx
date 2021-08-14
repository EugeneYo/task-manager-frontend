import * as React from "react";
import { useColorMode, useColorModeValue, IconButton } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

// type ModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

const ModeSwitcher = (props) => {
	const { toggleColorMode } = useColorMode();
	const text = useColorModeValue("dark", "light");
	const SwitchIcon = useColorModeValue(FaMoon, FaSun);

	return (
		<IconButton
			size="md"
			fontSize="lg"
			variant="ghost"
			color="current"
			marginLeft="2"
			onClick={toggleColorMode}
			icon={<SwitchIcon />}
			aria-label={`Switch to ${text} mode`}
			{...props}
		/>
	);
};

export default ModeSwitcher;

import React, { useState } from "react";
import { Switch, Route, Link as RouteLink, Redirect } from "react-router-dom";

import {
	ChakraProvider,
	Box,
	Text,
	Link,
	Center,
	VStack,
	Code,
	Grid,
	Container,
	useColorModeValue,
	useDisclosure,
	Button,
	useToast,
} from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";

import Header from "./Components/Header";
import ModeSwitcher from "./Components/ModeSwitcher";
import Tilt from "react-parallax-tilt";

import Home from "./Pages/Home";
import TaskBoard from "./Pages/TaskBoard";
import Form from "./Pages/Form";
import { useSelector } from "react-redux";
import NotFound from "./Pages/NotFound";
import MenuBox from "./Components/MenuBox";

function App() {
	const auth = useSelector((state) => state.user.token);

	return (
		<Container pos="relative" bg={useColorModeValue("#e2e8f0", "dark")} w="100%" maxW="100vw" minH="100vh" p="0" overflow="hidden">
			<Header />

			<MenuBox />
			<Switch>
				<Route exact path="/" component={Home} />

				{auth.length < 1 ? <Route exact path="/form" component={Form} /> : ""}
				{auth.length < 1 ? "" : <Route exact path="/taskBoard" component={TaskBoard} />}

				<Route path="*" component={NotFound} />
			</Switch>
		</Container>
	);
}

export default App;

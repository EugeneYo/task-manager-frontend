import React from "react";
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
	VStack,
	Center,
	InputGroup,
	InputLeftElement,
	Icon,
	Button,
	useDisclosure,
	InputRightAddon,
	Avatar,
	Tabs,
	TabList,
	Tab,
	TabPanel,
	TabPanels,
	Box,
	Text,
	useColorModeValue,
	Divider,
	createStandaloneToast,
} from "@chakra-ui/react";
import { InfoIcon, ViewIcon, EmailIcon, ViewOffIcon } from "@chakra-ui/icons";
import { HiOutlineMail } from "react-icons/hi";
import { useState, useEffect } from "react";
import { useCreateUserMutation, useLoginUserMutation } from "../Store/services/user.service";
import { Redirect, useHistory } from "react-router-dom";
import theme from "../myTheme";

const Form = () => {
	return (
		<Box
			bg={useColorModeValue("white", "#313b47")}
			w={{ base: "350px", sm: "450px", md: "550px" }}
			p={3}
			boxShadow="sm"
			rounded="lg"
			mx="auto"
			mt={["28"]}
			borderColor={useColorModeValue("teal.400", "")}
			borderWidth={useColorModeValue("2px", "")}
		>
			<Avatar bg="teal.400" mx="auto" w={12} alignSelf="center" display="block" my={8} />

			<Tabs isFitted>
				<TabList>
					<Tab _selected={{ bg: "teal.500", borderTopRadius: "lg", color: "white" }} fontSize={{ base: "lg", sm: "xl" }}>
						Sign In
					</Tab>
					<Tab _selected={{ bg: "teal.500", borderTopRadius: "lg", color: "white" }} fontSize={{ base: "lg", sm: "xl" }}>
						Sign Up
					</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<SignIn />
					</TabPanel>
					<TabPanel>
						<SignUp />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Box>
	);
};

const SignUp = () => {
	const { isOpen: isPassword, onOpen: viewPassword, onClose: closePassword } = useDisclosure();
	const [createUser, { error, isSuccess, isError, isLoading }] = useCreateUserMutation();
	const [number, setNumber] = useState(0);
	const customToast = createStandaloneToast({ theme });

	const [signUp, setSignUp] = useState({
		name: "",
		email: "",
		password: "",
	});

	const onSubmit = () => {
		createUser(signUp).finally(() => {});
		setNumber(number + 1);
	};

	useEffect(() => {
		if (isError) {
			if (error) {
				var erorrMessage = error.data.error;
			} else {
				erorrMessage = "Unable to Sign Up due to errors";
			}
			customToast({
				title: "Error",
				description: `${erorrMessage}`,
				status: "error",
				duration: 3000,
				isClosable: true,
				position: "top",
			});
		}

		if (isSuccess) {
			customToast({
				title: "Sign Up Successfully",
				description: "Welcome to Simple Task Manager",
				status: "success",
				duration: 3000,
				isClosable: true,
				position: "top",
			});
		}
	}, [isLoading]);
	return (
		<form action="submit">
			<VStack spacing={8}>
				<FormControl id="username" isRequired>
					<FormLabel fontSize={{ base: "lg", sm: "xl" }}>User Name</FormLabel>
					<InputGroup>
						<InputLeftElement children={<InfoIcon w={5} h={5} />} />
						<Input
							type="text"
							placeholder="Your username"
							onChange={(e) => {
								setSignUp({ ...signUp, name: e.target.value });
							}}
						/>
					</InputGroup>
				</FormControl>
				<FormControl id="email" isRequired>
					<FormLabel fontSize={{ base: "lg", sm: "xl" }}>Email address</FormLabel>
					<InputGroup>
						<InputLeftElement children={<EmailIcon w={5} h={5} />} />
						<Input
							type="email"
							placeholder="Your email"
							onChange={(e) => {
								setSignUp({ ...signUp, email: e.target.value });
							}}
						/>
					</InputGroup>
				</FormControl>
				<FormControl id="password" isRequired>
					<FormLabel fontSize={{ base: "lg", sm: "xl" }}>Password</FormLabel>
					<InputGroup>
						<Input
							type={isPassword ? "text" : "password"}
							placeholder="Your password"
							onChange={(e) => {
								setSignUp({ ...signUp, password: e.target.value });
							}}
						/>
						<InputRightAddon
							children={isPassword ? <ViewIcon w={4} h={4} /> : <ViewOffIcon w={4} h={4} />}
							onClick={() => {
								isPassword ? closePassword() : viewPassword();
							}}
						/>
					</InputGroup>
				</FormControl>

				<Button onClick={onSubmit} isLoading={isLoading} fontSize={"sm"} fontWeight={400} variant="solid" colorScheme="teal" borderRadius="lg">
					Sign Up
				</Button>

				{isSuccess && <Redirect to="/taskBoard" />}
			</VStack>
		</form>
	);
};

const SignIn = () => {
	const { isOpen: isPassword, onOpen: viewPassword, onClose: closePassword } = useDisclosure();
	const [loginUser, { error, isSuccess, isError, isLoading }] = useLoginUserMutation();
	const [number, setNumber] = useState(0);
	const customToast = createStandaloneToast({ theme });

	const [signIn, setSignIn] = useState({
		email: "",
		password: "",
	});

	const onSubmit = () => {
		loginUser(signIn).finally(() => {});
		setNumber(number + 1);
	};

	useEffect(() => {
		if (isError) {
			if (error) {
				var erorrMessage = error.data.error;
			} else {
				erorrMessage = "Unable to Sign In due to errors";
			}
			customToast({
				title: "Error",
				description: `${erorrMessage}`,
				status: "error",
				duration: 3000,
				isClosable: true,
				position: "top",
			});
		}

		if (isSuccess) {
			customToast({
				title: "Login successfully",
				description: "Welcome Back",
				status: "success",
				duration: 3000,
				isClosable: true,
				position: "top",
			});
		}
	}, [isLoading]);
	// if (isSuccess) {
	// 	return <Redirect to="/users" />;
	// }
	return (
		<form action="submit">
			<VStack spacing={8}>
				<FormControl id="email" isRequired>
					<FormLabel fontSize={{ base: "lg", sm: "xl" }}>Email address</FormLabel>
					<InputGroup>
						<InputLeftElement children={<EmailIcon w={5} h={5} />} />
						<Input
							type="email"
							placeholder="Your email"
							onChange={(e) => {
								setSignIn({ ...signIn, email: e.target.value });
							}}
						/>
					</InputGroup>
				</FormControl>
				<FormControl id="password" isRequired>
					<FormLabel fontSize={{ base: "lg", sm: "xl" }}>Password</FormLabel>
					<InputGroup>
						<Input
							type={isPassword ? "text" : "password"}
							placeholder="Your password"
							onChange={(e) => {
								setSignIn({ ...signIn, password: e.target.value });
							}}
						/>
						<InputRightAddon
							children={isPassword ? <ViewIcon w={4} h={4} /> : <ViewOffIcon w={4} h={4} />}
							onClick={() => {
								isPassword ? closePassword() : viewPassword();
							}}
						/>
					</InputGroup>
				</FormControl>

				<Button isLoading={isLoading} onClick={onSubmit} fontSize={"sm"} fontWeight={400} variant="solid" colorScheme="teal" borderRadius="lg">
					{" "}
					Sign In
				</Button>
				{isSuccess && <Redirect to="/taskBoard" />}
			</VStack>
		</form>
	);
};

export default Form;

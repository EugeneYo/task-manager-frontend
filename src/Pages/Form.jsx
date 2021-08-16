import React from "react";
import {
	FormControl,
	FormLabel,
	Input,
	VStack,
	InputGroup,
	InputLeftElement,
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
	useStyleConfig,
} from "@chakra-ui/react";
import useToast from "../Hooks/useToast";
import { InfoIcon, ViewIcon, EmailIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useCreateUserMutation, useLoginUserMutation } from "../Store/services/user.service";
import { Redirect } from "react-router-dom";

// Basic Form styling
const FormBox = (props) => {
	const { children, ...rest } = props;
	const styles = useStyleConfig("FormBox");
	return (
		<Box __css={styles} {...rest}>
			{children}
		</Box>
	);
};

// Main
const Form = () => {
	return (
		<FormBox>
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
		</FormBox>
	);
};

const SignUp = () => {
	const [createUser, { error, isSuccess, isError, isLoading }] = useCreateUserMutation();

	const onFormSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const fieldValues = Object.fromEntries(formData.entries());
		createUser(fieldValues);
	};
	useToast({
		isError,
		isSuccess,
		error,
		errorDescription: "Unable to Sign Up",
		successTitle: "Sign Up Successfully",
		successDescription: "Welcome to Simple Task Manager",
	});
	return (
		<>
			<form action="submit" onSubmit={onFormSubmit}>
				<VStack spacing={8}>
					<TextInput name={"name"} label={"Username"} icon={<InfoIcon w={5} h={5} />} />
					<TextInput name={"email"} label={"Email"} icon={<EmailIcon w={5} h={5} />} />
					<PasswordInput />
					<Button isLoading={isLoading} type="submit" variant="simple-teal">
						Sign Up
					</Button>
				</VStack>
			</form>
			{isSuccess && <Redirect to="/taskBoard" />}
		</>
	);
};

const SignIn = () => {
	const [loginUser, { error, isSuccess, isError, isLoading }] = useLoginUserMutation();
	const onFormSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const fieldValues = Object.fromEntries(formData.entries());
		loginUser(fieldValues);
	};

	useToast({
		isError,
		isSuccess,
		error,
		errorDescription: "Unable to login",
		successTitle: "Log in successfully",
		successDescription: "Welcome back",
	});

	return (
		<>
			<form action="submit" onSubmit={onFormSubmit}>
				<VStack spacing={8}>
					<TextInput name={"email"} label={"Email"} icon={<EmailIcon w={5} h={5} />} />
					<PasswordInput />
					<Button isLoading={isLoading} type="submit" variant="simple-teal">
						Sign In
					</Button>
				</VStack>
			</form>
			{isSuccess && <Redirect to="/taskBoard" />}
		</>
	);
};

const TextInput = ({ name, label, icon }) => {
	const [value, setValue] = useState("");
	return (
		<FormControl id={name} isRequired>
			<FormLabel fontSize={{ base: "lg", sm: "xl" }}>{label}</FormLabel>
			<InputGroup>
				<InputLeftElement children={icon} />
				<Input
					type="text"
					name={name}
					placeholder={`Your ${name}`}
					onChange={(e) => {
						setValue(e.target.value);
					}}
				/>
			</InputGroup>
		</FormControl>
	);
};

const PasswordInput = () => {
	const { isOpen: isPassword, onOpen: viewPassword, onClose: closePassword } = useDisclosure();
	const [value, setValue] = useState("");

	return (
		<FormControl id="password" isRequired>
			<FormLabel fontSize={{ base: "lg", sm: "xl" }}>Password</FormLabel>
			<InputGroup>
				<Input
					type={isPassword ? "text" : "password"}
					placeholder="Your password"
					name="password"
					onChange={(e) => {
						setValue(value);
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
	);
};

export default Form;

import React, { useState, useEffect } from "react";
import {
	Button,
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Avatar,
	Text,
	Input,
	Center,
	InputGroup,
	InputLeftAddon,
	Flex,
	InputRightAddon,
	VStack,
	createStandaloneToast,
	Link,
	usePrefersReducedMotion,
	keyframes,
	HStack,
} from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowLeftIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "../Store/services/user.service";
import { Link as RouterLink } from "react-router-dom";
import theme from "../myTheme";
import Settings from "./Settings";
import { FaGithub } from "react-icons/fa";

const MenuBox = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { isOpen: isPassword, onOpen: viewPassword, onClose: closePassword } = useDisclosure();
	const [updateUser, { data, error, isError, isLoading, isSuccess }] = useUpdateUserMutation();
	const { user, token } = useSelector((state) => state.user);

	const [isEdit, setIsEdit] = useState(false);
	const [updateDetails, setUpdateDetails] = useState({
		name: user.name,
		email: user.email,
		password: "",
	});
	const customToast = createStandaloneToast({
		theme,
	});
	const prefersReducedMotion = usePrefersReducedMotion();
	const smoothAnimation = keyframes`from {transform: translateX(0);} 50%{transform : translateX(10px);} to{transform: translateX(0)}`;
	const animation = prefersReducedMotion ? undefined : `${smoothAnimation} infinite 2s linear`;
	const onUpdate = () => {
		updateUser({ updateDetails, token }).finally(() => {});
		setIsEdit(!isEdit);
	};
	const onCancel = () => {
		setUpdateDetails({
			name: user.name,
			email: user.email,
			password: "",
		});
		setIsEdit(!isEdit);
	};
	useEffect(() => {
		if (isSuccess) {
			customToast({
				title: "Updated successfully",
				description: "Your profile is updated",
				status: "success",
				duration: 3000,
				isClosable: true,
				position: "top-right",
			});
		}

		if (isError) {
			customToast({
				title: "Error",
				description: `${error.data.error}`,
				status: "error",
				duration: 3000,
				isClosable: true,
				position: "top-right",
			});
		}
		setUpdateDetails({
			name: user.name,
			email: user.email,
			password: "",
		});
		return () => {};
	}, [user, isError]);
	return (
		<>
			<Button
				leftIcon={<ArrowLeftIcon />}
				pos="absolute"
				colorScheme="teal"
				onClick={onOpen}
				top="20"
				right={{ base: -14 }}
				transform="auto"
				translateX="0"
				fontSize={{ base: "sm", sm: "md" }}
				fontWeight={300}
				variant="solid"
				borderLeftRadius="lg"
				alignSelf="self-end"
				transition="all ease-in-out 0.5s"
				_hover={{
					translateX: "-3.3em",
				}}
				m={0}
				style={{ zIndex: 10 }}
			>
				Menu
			</Button>

			{/* Drawer */}
			<Drawer isOpen={isOpen} placement="right" onClose={onClose}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader></DrawerHeader>

					<DrawerBody>
						<Text
							fontSize={{ base: "2xl" }}
							bgGradient="linear(to-r, purple.600, blue.400, teal.500)"
							bgClip="text"
							textAlign="center"
							fontWeight={500}
							align="center"
						>
							Simple Task Manager
						</Text>
						<Avatar bg="teal.400" mx="auto" w={28} h={28} alignSelf="center" display="block" my={8} />
						<Text textAlign="center" fontSize={"xl"}>
							Profile
						</Text>

						{token.length < 1 && (
							<Text align="center">
								Please
								<Link as={RouterLink} to="/form" onClick={onClose} color="teal.500">
									{" "}
									Sign In{" "}
								</Link>
								to access
							</Text>
						)}
						{token.length > 1 && (
							<VStack>
								<InputGroup>
									<InputLeftAddon children="Name :" />
									<Input
										type="text"
										variant="filled"
										isDisabled={!isEdit}
										// placeholder="Your username"
										value={updateDetails.name}
										onChange={(e) => {
											setUpdateDetails({ ...updateDetails, name: e.target.value });
										}}
									/>
								</InputGroup>
								<InputGroup>
									<InputLeftAddon children="Email :" />

									<Input
										type="email"
										variant="filled"
										isDisabled={!isEdit}
										// placeholder="Your email"
										value={updateDetails.email}
										onChange={(e) => {
											setUpdateDetails({ ...updateDetails, email: e.target.value });
										}}
									/>
								</InputGroup>
								<InputGroup>
									<Input
										type={isPassword ? "text" : "password"}
										placeholder="Your password"
										variant="filled"
										isDisabled={!isEdit}
										value={updateDetails.password}
										onChange={(e) => {
											setUpdateDetails({ ...updateDetails, password: e.target.value });
										}}
									/>
									<InputRightAddon
										children={isPassword ? <ViewIcon w={4} h={4} /> : <ViewOffIcon w={4} h={4} />}
										onClick={() => {
											isPassword ? closePassword() : viewPassword();
										}}
									/>
								</InputGroup>
								<Flex justifyContent="flex-end" alignSelf="end">
									{!isEdit && (
										<Button
											onClick={() => {
												setIsEdit(!isEdit);
											}}
											fontSize={"sm"}
											fontWeight={400}
											variant="solid"
											colorScheme="teal"
											borderRadius="xl"
											mt={2}
										>
											Edit
										</Button>
									)}
									{isEdit && (
										<>
											<Button onClick={onUpdate} fontSize={"sm"} fontWeight={400} variant="solid" colorScheme="teal" borderRadius="xl" m={1}>
												Update
											</Button>
											<Button onClick={onCancel} fontSize={"sm"} fontWeight={400} variant="solid" colorScheme="gray" borderRadius="xl" m={1}>
												Cancel
											</Button>
										</>
									)}
								</Flex>
							</VStack>
						)}
						{/* Show other page */}
						<Center role="group" mt={5} flexDirection="column">
							{token.length > 1 && (
								<>
									<Settings />
									<Button
										w="100%"
										my={1}
										fontWeight="400"
										bg="transparent"
										_hover={{
											bg: "teal.400",
											color: "white",
										}}
										rightIcon={<ArrowForwardIcon animation={animation} />}
										as={RouterLink}
										to="/taskBoard"
										onClick={onClose}
										transition="all ease-in-out 0.5s"
									>
										Task Board
									</Button>
								</>
							)}

							<Button
								w="100%"
								my={1}
								fontWeight="400"
								bg="transparent"
								_hover={{
									bg: "teal.400",
									color: "white",
								}}
								rightIcon={<ArrowForwardIcon animation={animation} />}
								as={RouterLink}
								to="/"
								onClick={onClose}
								transition="all ease-in-out 0.5s"
							>
								Home
							</Button>
						</Center>
					</DrawerBody>

					<DrawerFooter>
						<HStack>
							<Button
								colorScheme="teal"
								leftIcon={<FaGithub />}
								fontWeight="500"
								onClick={() => {
									window.location.href = "https://github.com/EugeneYo";
								}}
							>
								My Github
							</Button>
						</HStack>
						{/* <Image src={} /> */}
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default MenuBox;

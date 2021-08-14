import { ArrowLeftIcon, DeleteIcon } from "@chakra-ui/icons";
import {
	Container,
	useDisclosure,
	Input,
	Flex,
	VStack,
	Center,
	Box,
	Slide,
	keyframes,
	SimpleGrid,
	Grid,
	Icon,
	useColorModeValue,
	Text,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Textarea,
	useToast,
	createStandaloneToast,
	Badge,
	Spacer,
	usePrefersReducedMotion,
	Spinner,
	InputGroup,
	InputLeftAddon,
	Switch,
	Stack,
	HStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiDocumentAdd, HiOutlineDocumentAdd } from "react-icons/hi";
import Tilt from "react-parallax-tilt";
import { useCreateTaskMutation, useDeleteTaskMutation, useGetTasksQuery, useUpdateTaskMutation } from "../Store/services/task.service";
import moment from "moment";
import { BiEdit } from "react-icons/bi";
import theme from "../myTheme";

// import { authToken } from "../Store/userSlice";
export default function TaskBoard() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { token, options } = useSelector((state) => state.user);

	const { data, isFetching, isError, isLoading, isSuccess } = useGetTasksQuery({ token, options });

	// useEffect(() => {}, []);
	return (
		<Box pos="relative" minW="100vw" minH="80vh" p={32} m={0} mt={15} p={0} pt={10} mx={0} overflow="hidden">
			<SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 3, xl: 5 }} alignItems="center" placeItems="center" spacing={4}>
				<CreateBox />

				{/* {isSuccess && data?.map((each) => <Box key={each._id}> {each.description} </Box>)} */}
				{isSuccess && <TaskLists data={data} />}

				{/* {!isSuccess && <div>There is no task yet</div>} */}
			</SimpleGrid>
		</Box>
	);
}

const CreateBox = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const token = useSelector((state) => state.user.token);
	const [description, setDescription] = useState("");
	const [createNewTask, { data, error, isError, isSuccess, isLoading }] = useCreateTaskMutation();
	const prefersReducedMotion = usePrefersReducedMotion();
	const smoothAnimation = keyframes`from {transform: rotate(0deg);} 2%{transform : rotate(5deg);} 6%{transform : rotate(-5deg);} 8%{transform: rotate(0);} to{transform:rotate(0);}`;
	const animation = prefersReducedMotion ? undefined : `${smoothAnimation} infinite 5s linear`;

	const customToast = createStandaloneToast({ theme });
	const createTask = () => {
		createNewTask({ description, token });
		setDescription("");
		onClose();
	};

	useEffect(() => {
		if (isSuccess) {
			customToast({
				title: "Task created",
				description: "New task is stored in the database",
				status: "success",
				duration: 3000,
				isClosable: true,
				position: "top",
			});
		}
		console.log("ONE");
		if (isError) {
			if (error) {
				var erorrMessage = error.data.error;
			} else {
				erorrMessage = "Unable to create new task due to errors";
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
		if (isLoading) {
			customToast({
				title: "Creating",
				description: "",
				status: "info",
				duration: 1000,
				isClosable: true,
				position: "top",
			});
		}
		// console.log(description);
		// console.log(data);
		// console.log(error);
	}, [isLoading]);
	return (
		<>
			<Tilt tiltReverse={true} scale={1} tiltAngleXInitial={0} tiltAngleYInitial={0}>
				<Center
					bg={useColorModeValue("white", "#313b47")}
					w={250}
					h={250}
					p={0}
					m={0}
					shadow="lg"
					alignSelf="center"
					borderRadius="lg"
					flexDirection="column"
					_hover={{ borderColor: "teal.400", borderWidth: "2px" }}
					role="group"
					onClick={onOpen}
					animation={animation}
				>
					<Icon
						as={HiOutlineDocumentAdd}
						w={20}
						h={20}
						color={useColorModeValue("teal.400", "white")}
						_groupHover={{
							color: "teal.400",
						}}
					/>
					<Text>Create New Task</Text>
				</Center>
			</Tilt>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader fontWeight={500} fontSize={"xl"} color={useColorModeValue("teal.500", "teal.400")}>
						Create New Task
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text>Description</Text>
						<Textarea
							placeholder="Begin here..."
							size="md"
							_focus={{
								borderColor: "teal.500",
								borderWidth: "2px",
							}}
							h={{ base: "30vh", md: "50vh" }}
							value={description}
							onChange={(e) => {
								setDescription(e.target.value);
							}}
						/>
					</ModalBody>

					<ModalFooter>
						<Button onClick={createTask} fontSize={"sm"} fontWeight={400} variant="solid" colorScheme="teal" borderRadius="lg">
							Create
						</Button>
						{/* <Button variant="ghost">Secondary Action</Button> */}
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

const TaskLists = ({ data }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { user, token } = useSelector((state) => state.user);
	const [task, setTask] = useState({
		_id: "",
		completed: false,
		createdAt: "",
		updatedAt: "",
		description: "",
		author: user._id,
		__v: 0,
	});
	const [isSelectedDelete, setIsSelectedDelete] = useState("");
	const [updateTask, { error: updateError, isError: isUpdateError, isSuccess: isUpdateSuccess, isLoading: isUpdateLoading }] =
		useUpdateTaskMutation();
	const [deleteTask, { error: deleteError, isError: isDeleteError, isSuccess: isDeleteSuccess, isLoading: isDeleteLoading }] =
		useDeleteTaskMutation();
	const customToast = createStandaloneToast({ theme });
	const [loadingState, setLoadingState] = useState("");
	const onEdit = (selectedTask) => {
		setTask(selectedTask);
		onOpen();
	};

	const onUpdate = () => {
		updateTask({ _id: task?._id, description: task?.description, completed: task.completed, token });
		onClose();
		setLoadingState("Update");
	};
	const onDelete = (selectedTask) => {
		setIsSelectedDelete(selectedTask._id);
		deleteTask({ _id: selectedTask._id, token });
		onClose();
		setLoadingState("Delete");
	};

	useEffect(() => {
		if (loadingState === "Delete" && isDeleteSuccess) {
			customToast({
				title: "Delete Successfully",
				description: "Selected task has been deleted",
				status: "success",
				duration: 3000,
				isClosable: true,
				position: "top",
			});
		}

		if (loadingState === "Delete" && isDeleteError) {
			if (deleteError) {
				var erorrMessage = deleteError.data.error;
			} else {
				erorrMessage = "Unable to delete the selected task";
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
		if (loadingState === "Update" && isUpdateError) {
			if (updateError) {
				var erorrMessage = updateError.data.error;
			} else {
				erorrMessage = "Unable to update the selected task";
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
		if (loadingState === "Update" && isUpdateSuccess) {
			customToast({
				title: "Update Succesfully",
				description: "Selected task has been updated",
				status: "success",
				duration: 3000,
				isClosable: true,
				position: "top",
			});
		}

		if (loadingState === "Update" && isUpdateLoading) {
			customToast({
				title: "Updating",
				description: "",
				status: "info",
				duration: 1000,
				isClosable: true,
				position: "top",
			});
		}
	}, [isDeleteLoading, isUpdateLoading]);

	return (
		<>
			{data.map((each) => (
				<Tilt tiltReverse={true} scale={1} tiltAngleXInitial={0} tiltAngleYInitial={0} tiltMaxAngleX={10} tiltMaxAngleY={10} key={each._id}>
					<Box
						bg={useColorModeValue("white", "#313b47")}
						w={250}
						h={250}
						p={0}
						m={0}
						shadow="lg"
						alignSelf="center"
						borderRadius="lg"
						flexDirection="column"
						_hover={{ borderColor: "teal.400", borderWidth: "2px" }}
						role="group"
						pos="relative"
						justifyContent="space-between"
						// onClick={onOpen}
					>
						<Badge
							bg={each.completed ? "green.400" : "#ff9671"}
							color={useColorModeValue("white", "#313b47")}
							// borderRightRadius="lg"
							// borderTopRadius="lg"
							// borderBottomRadius="none"
							borderTopLeftRadius="lg"
							px={1}
							m={0}
							fontWeight="400"
							fontSize="xs"
							pos="absolute"
						>
							{each.completed ? "Completed" : "In progress"}
						</Badge>

						<Box h={5} />
						<Text h="75%" px={1}>
							{each.description}
						</Text>

						<Box pos="absolute" bottom={0} w="100%" borderBottomRadius="lg">
							<Flex>
								<Button
									w="50%"
									bg="green.400"
									borderRadius="none"
									borderBottomRadius="lg"
									borderRightRadius="none"
									leftIcon={<Icon as={BiEdit} w={5} h={5} />}
									fontWeight="400"
									color="white"
									visibility="hidden"
									_groupHover={{
										visibility: "visible",
									}}
									_hover={{
										bg: "read.500",
									}}
									onClick={() => {
										onEdit(each);
									}}
								>
									Edit
								</Button>
								<Button
									w="50%"
									bg="red.500"
									borderRadius="none"
									borderBottomRadius="lg"
									borderLeftRadius="none"
									leftIcon={isSelectedDelete === each._id ? <Spinner size="sm" /> : <DeleteIcon w={4} h={4} />}
									fontWeight="400"
									color="white"
									visibility="hidden"
									_groupHover={{
										visibility: "visible",
									}}
									_hover={{
										bg: "read.500",
									}}
									value={each._id}
									onClick={(e) => {
										onDelete(each);
									}}
								>
									Delete
								</Button>
							</Flex>
						</Box>
					</Box>
				</Tilt>
			))}

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader fontWeight={500} fontSize={"xl"} color={useColorModeValue("teal.500", "teal.400")}>
						Update Current Task
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Box>
							<Flex justifyContent="space-between">
								<Text>Created at : </Text>
								<Text> {moment(task?.createdAt).format("HH:mm DD-MM-YYYY")} </Text>
							</Flex>
							<Flex justifyContent="space-between">
								<Text>Updated at : </Text>
								<Text> {moment(task?.updatedAt).format("HH:mm DD-MM-YYYY")} </Text>
							</Flex>
						</Box>

						<Flex justifyContent="space-between">
							<Text>Description</Text>
							<HStack justify="center">
								<Text>{task.completed ? <> Completed</> : <>In progress</>}</Text>
								<Switch
									size="md"
									colorScheme="teal"
									isChecked={task.completed}
									onChange={(e) => {
										setTask({ ...task, completed: !task.completed });
									}}
								/>
							</HStack>
						</Flex>
						<Textarea
							placeholder="Begin here..."
							size="md"
							_focus={{
								borderColor: "teal.500",
								borderWidth: "2px",
							}}
							h={{ base: "30vh", md: "50vh" }}
							value={task?.description}
							onChange={(e) => {
								setTask({ ...task, description: e.target.value });
							}}
						/>
					</ModalBody>

					<ModalFooter>
						<Button onClick={onUpdate} fontSize={"sm"} fontWeight={400} variant="solid" colorScheme="teal" borderRadius="lg">
							Update
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

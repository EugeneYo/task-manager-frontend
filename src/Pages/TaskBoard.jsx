import { ArrowLeftIcon, DeleteIcon } from "@chakra-ui/icons";
import {
	useDisclosure,
	Flex,
	Center,
	Box,
	keyframes,
	SimpleGrid,
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
	Badge,
	usePrefersReducedMotion,
	Spinner,
	Switch,
	HStack,
	SkeletonText,
} from "@chakra-ui/react";
import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import Tilt from "react-parallax-tilt";
import { useCreateTaskMutation, useDeleteTaskMutation, useGetTasksQuery, useUpdateTaskMutation } from "../Store/services/task.service";
import { BiEdit } from "react-icons/bi";
import useToast from "../Hooks/useToast";
import convertDate from "../Utils/ConvertDate";

export default function TaskBoard() {
	return (
		<Box pos="relative" minW="100vw" minH="80vh" p={32} m={0} mt={15} p={0} pt={10} mx={0} overflow="hidden">
			<SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 3, xl: 5 }} alignItems="center" placeItems="center" spacing={4}>
				<CreateBox />
				<TaskLists />
			</SimpleGrid>
		</Box>
	);
}

const CreateBox = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const token = useSelector((state) => state.user.token);
	const [createNewTask, { data, error, isError, isSuccess, isLoading }] = useCreateTaskMutation();
	const prefersReducedMotion = usePrefersReducedMotion();
	const smoothAnimation = keyframes`from {transform: rotate(0deg);} 2%{transform : rotate(5deg);} 6%{transform : rotate(-5deg);} 8%{transform: rotate(0);} to{transform:rotate(0);}`;
	const animation = prefersReducedMotion ? undefined : `${smoothAnimation} infinite 5s linear`;
	const formRef = useRef();

	const createTask = () => {
		const formData = new FormData(formRef.current);
		const fieldValues = Object.fromEntries(formData.entries());
		createNewTask({ description: fieldValues.description, token });
		onClose();
	};
	useToast({
		isError,
		isSuccess,
		error,
		errorDescription: "Unable to create new task due to errors",
		successTitle: "Task created",
		successDescription: "New task is stored in the database",
	});
	console.log("%cCreateBox Re-render", "color: #ff9671;");
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
						<form action="submit" ref={formRef}>
							<Textarea
								placeholder="Begin here..."
								size="md"
								_focus={{
									borderColor: "teal.500",
									borderWidth: "2px",
								}}
								h={{ base: "30vh", md: "50vh" }}
								name="description"
							/>
						</form>
					</ModalBody>

					<ModalFooter>
						<Button onClick={createTask} variant="simple-teal">
							Create
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

const TaskLists = () => {
	console.log("%cTaskLists Re-render", "color: #ff9671;");
	const { user, token, options } = useSelector((state) => state.user);
	const { data, isFetching, isError, isLoading, isSuccess } = useGetTasksQuery({ token, options });
	const [deleteTask, { error: deleteError, isError: isDeleteError, isSuccess: isDeleteSuccess, isLoading: isDeleteLoading }] =
		useDeleteTaskMutation();
	const { isOpen, onOpen, onClose } = useDisclosure();
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

	const onEdit = (selectedTask) => {
		setTask(selectedTask);
		onOpen();
	};

	const onDelete = (selectedTask) => {
		setIsSelectedDelete(selectedTask._id);
		deleteTask({ _id: selectedTask._id, token });
		onClose();
	};

	useToast({
		isError: isDeleteError,
		isSuccess: isDeleteSuccess,
		error: deleteError,
		errorDescription: "Unable to delete the selected task",
		successTitle: "Delete Successfully",
		successDescription: "Selected task has been deleted",
	});

	if (isFetching || isLoading) {
		return [...Array(10)].map((e, i) => (
			<Box
				bg={useColorModeValue("white", "#313b47")}
				w={250}
				h={250}
				p={5}
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
				<SkeletonText mt="4" noOfLines={3} spacing="4" />
				<SkeletonText mt="4" noOfLines={5} spacing="4" />
			</Box>
		));
	}
	return (
		<>
			{isSuccess ? (
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
											variant="create"
											leftIcon={<Icon as={BiEdit} w={5} h={5} />}
											onClick={() => {
												onEdit(each);
											}}
										>
											Edit
										</Button>
										<Button
											variant="delete"
											leftIcon={isSelectedDelete === each._id ? <Spinner size="sm" /> : <DeleteIcon w={4} h={4} />}
											value={each._id}
											onClick={() => {
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
					<EditModal task={task} setTask={setTask} token={token} isOpen={isOpen} onClose={onClose} />
				</>
			) : (
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
						bg="red.400"
						color={useColorModeValue("white", "#313b47")}
						borderTopLeftRadius="lg"
						px={1}
						m={0}
						fontWeight="400"
						fontSize="xs"
						pos="absolute"
					>
						Error
					</Badge>

					<Box h={5} />
					<Text h="75%" px={1}>
						Something went wrong
					</Text>

					<Box pos="absolute" bottom={0} w="100%" borderBottomRadius="lg">
						<Flex>
							<Button variant="create" leftIcon={<Spinner size="sm" />}>
								Edit
							</Button>
							<Button variant="delete" leftIcon={<Spinner size="sm" />}>
								Delete
							</Button>
						</Flex>
					</Box>
				</Box>
			)}
		</>
	);
};

const EditModal = ({ task, setTask, token, isOpen, onClose }) => {
	const [updateTask, { error, isError, isSuccess }] = useUpdateTaskMutation();
	const formRef = useRef();

	const onUpdate = (e) => {
		const formData = new FormData(formRef.current);
		const fieldValues = Object.fromEntries(formData.entries());
		const isCompleted = fieldValues.hasOwnProperty("completed") ? "true" : "false";
		updateTask({ _id: task?._id, description: fieldValues.description, completed: isCompleted, token });
		onClose();
	};
	useToast({
		isError,
		isSuccess,
		error,
		errorDescription: "Unable to update the selected task",
		successTitle: "Update Successfully",
		successDescription: "Selected task has been updated",
	});
	console.log("%cEditModal Re-render", "color: #ff9671;");

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader fontWeight={500} fontSize={"xl"} color={useColorModeValue("teal.500", "teal.400")}>
					Update Current Task
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<form action="submit" ref={formRef}>
						<Box>
							<Flex justifyContent="space-between">
								<Text>Created at : </Text>
								<Text> {convertDate(task?.createdAt)} </Text>
							</Flex>
							<Flex justifyContent="space-between">
								<Text>Updated at : </Text>
								<Text> {convertDate(task?.updatedAt)} </Text>
							</Flex>
						</Box>

						<Flex justifyContent="space-between">
							<Text>Description</Text>
							<HStack justify="center">
								<Text>{task.completed ? <> Completed</> : <>In progress</>}</Text>
								<SimpleSwitchInput taskCompleted={task.completed} />
							</HStack>
						</Flex>
						<TextAreaInput taskDescription={task.description} />
					</form>
				</ModalBody>

				<ModalFooter>
					<Button onClick={onUpdate} fontSize={"sm"} fontWeight={400} variant="solid" colorScheme="teal" borderRadius="lg">
						Update
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

const TextAreaInput = ({ taskDescription }) => {
	const [description, setDescription] = useState(taskDescription);
	return (
		<Textarea
			name="description"
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
	);
};

const SimpleSwitchInput = ({ taskCompleted }) => {
	const [completed, setCompleted] = useState(taskCompleted);

	return (
		<Switch
			name="completed"
			size="md"
			colorScheme="teal"
			isChecked={completed}
			onChange={(e) => {
				setCompleted(!completed);
			}}
		/>
	);
};

import {
	Box,
	InputGroup,
	useColorModeValue,
	InputLeftAddon,
	Input,
	Text,
	Button,
	Checkbox,
	CheckboxGroup,
	RadioGroup,
	Radio,
} from "@chakra-ui/react";
import React, { useState } from "react";
// import { useAppDispatch, useAppSelector } from "../Store/hook";
import { useSelector, useDispatch } from "react-redux";
import { taskAPI } from "../Store/services/task.service";
import { updateOptions } from "../Store/userSlice";

export default function Settings() {
	const defaultOptions = useSelector((state) => state.user.options);
	const dispatch = useDispatch();
	const [options, setOptions] = useState(defaultOptions);
	// const [completed, setCompleted] = useState(true);
	// const [inProgress, setInProgress] = useState(true);

	const { token } = useSelector((state) => state.user);
	return (
		<Box py={5}>
			<Text fontSize={"lg"}> Settings</Text>
			<InputGroup w="250px" bg={useColorModeValue("white", "")} borderRadius="lg">
				<InputLeftAddon children="Tasks per page" />
				<Input
					type="number"
					placeholder="10"
					value={options?.limit}
					onChange={(e) => {
						setOptions({ ...options, limit: e.target.value });
					}}
				/>
			</InputGroup>
			<Box borderRadius="lg" display="flex" justifyContent="space-between" p={3} width="250px" bg={useColorModeValue("white", "")}>
				<CheckboxGroup
					defaultValue={["completed", "inProgress"]}
					onChange={(e) => {
						if ((e.includes("completed") && e.includes("inProgress")) || e.length === 0) {
							console.log("ALL");
							setOptions({ ...options, completed: "" });
						} else if (e.includes("completed")) {
							console.log("FIND COMPLETED TASK ONLY");
							setOptions({ ...options, completed: "true" });
						} else {
							console.log("FIND IN PROGRESS TASK ONLY");
							setOptions({ ...options, completed: "false" });
						}
					}}
				>
					<Checkbox defaultIsChecked size="md" value="completed">
						Completed
					</Checkbox>
					<Checkbox defaultIsChecked size="md" value="inProgress">
						In progress
					</Checkbox>
				</CheckboxGroup>
			</Box>
			<Box bg={useColorModeValue("white", "")}>
				<RadioGroup
					display="flex"
					justifyContent="space-around"
					p={0}
					mb={1}
					width="250px"
					onChange={(e) => {
						console.log(e);
						setOptions({ ...options, sortBy: e });
					}}
					value={options.sortBy}
				>
					<Radio value="createdAt:asc">Oldest</Radio>
					<Radio value="createdAt:desc">Latest</Radio>
				</RadioGroup>
			</Box>

			<Box d="flex" justifyContent="end">
				<Button
					onClick={() => {
						dispatch(updateOptions(options));
						dispatch(taskAPI.endpoints.getTasks.initiate({ token, options }));
					}}
					fontSize={"sm"}
					fontWeight={400}
					variant="solid"
					colorScheme="teal"
					borderRadius="xl"
					mt={2}
				>
					Update
				</Button>
			</Box>
		</Box>
	);
}

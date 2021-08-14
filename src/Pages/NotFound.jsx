import { Box, Text, VStack, Center, Spinner, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const NotFound = () => {
	const history = useHistory();
	useEffect(() => {
		setTimeout(() => {
			history.push("/");
		}, 3000);
		return () => {};
	}, []);
	return (
		<Center border="1px" borderColor="teal.400" maxW="70%" mx="auto" borderRadius="lg" my={20} p={12} bg={useColorModeValue("white", "#313b47")}>
			<VStack>
				<Text fontSize="3xl" color="red.500" fontWeight="600">
					Not Found
				</Text>

				<Box d="flex">
					<Text fontSize="xl" mx={4}>
						Redirecting to Home Page
					</Text>
					<Spinner size="md" />
				</Box>
			</VStack>
		</Center>
	);
};

export default NotFound;

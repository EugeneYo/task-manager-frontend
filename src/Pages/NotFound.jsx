import { Box, Text, VStack, Center, Spinner, useColorModeValue, Link } from "@chakra-ui/react";
import React from "react";
import { Link as RouteLink } from "react-router-dom";

const NotFound = () => {
	return (
		<Center border="1px" borderColor="teal.400" maxW="70%" mx="auto" borderRadius="lg" my={20} p={12} bg={useColorModeValue("white", "#313b47")}>
			<VStack>
				<Text fontSize="3xl" color="red.500" fontWeight="600">
					Not Found
				</Text>

				<Box d="flex">
					<Text fontSize="xl" mx={4}>
						Redirect to{" "}
						<Link as={RouteLink} to="/" color="teal.500">
							{" "}
							Home Page{" "}
						</Link>
					</Text>
					{/* <Spinner size="md" /> */}
				</Box>
			</VStack>
		</Center>
	);
};

export default NotFound;

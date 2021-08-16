import { VStack, Box, Flex, Text, Divider, Container, Button, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import Typewriter from "typewriter-effect";
import Tilt from "react-parallax-tilt";

export default function Home() {
	return (
		<Flex direction={{ base: "column", md: "row" }} spacing={0} justifyContent="center" height="80vh" alignItems="center">
			<Box>
				<Text
					fontSize={{ base: "4xl", md: "6xl" }}
					bgGradient="linear(to-r, purple.600, blue.400, teal.500)"
					bgClip="text"
					textAlign="center"
					fontWeight={600}
				>
					Simple Task Manager
				</Text>
				<Text fontSize="4xl" color={useColorModeValue("black", "white")} textAlign="center">
					just for you
				</Text>
			</Box>
			<Container justifyContent="center" m={{ md: 0 }}>
				<Tilt tiltReverse={true} scale={1} tiltAngleXInitial={0} tiltAngleYInitial={0} tiltMaxAngleX={10} tiltMaxAngleY={10}>
					<Box
						bg={useColorModeValue("white", "#313b47")}
						minW={["85%", "sm", "sm", "lg", "xl"]}
						p={2}
						m={2}
						borderRadius="lg"
						minH={80}
						boxShadow="teal"
						borderColor={useColorModeValue("teal.400", "")}
						borderWidth={useColorModeValue("2px", "")}
						shadow={"dark-lg"}
						// border={useColorModeValue("")}
					>
						<Text fontSize="2xl" color="teal.400">
							New Task
						</Text>
						<Divider orientation="horizontal" />
						<VStack alignItems="space-between">
							<Box py={3} height="40vh">
								<Typewriter
									options={{
										// strings: ["Groceries List -  <br> Grains stuff -> pasta, rice, bread <br> Dairy & eggs -> milk, cheese, eggs ", "World"],
										autoStart: true,
										loop: true,
										// delay: 90,
										// deleteSpeed: 70,
									}}
									onInit={(typewriter) => {
										typewriter
											.typeString("Groceries List -  <br>")
											.typeString("Grains stuff -> pasta, rice, bread <br>")
											.typeString("Dairy & eggs -> milk, cheese, eggs ")
											.changeDelay(1)
											.start();
									}}
								/>
							</Box>

							<Button fontSize={"sm"} fontWeight={400} variant="solid" colorScheme="teal" borderLeftRadius="lg" alignSelf="self-end">
								Create
							</Button>
						</VStack>
					</Box>
				</Tilt>
			</Container>
		</Flex>
	);
}

import { Box, Flex, Text, ListItem, UnorderedList, Link } from '@chakra-ui/react';
import React from 'react';

export default function About() {
	return (
		<Box mx="auto" maxW="90%" p={10}>
			<Flex maxW="100%" mx="auto" direction="column">
				<Text fontSize="5xl" fontWeight="500">
					About Page
				</Text>
				<Text fontSize="2xl">Simple Task Manager was built using: </Text>
				<UnorderedList fontSize="xl">
					<ListItem>
						<Link href="https://reactjs.org/" color="teal.400" isExternal>
							ReactJS
						</Link>
					</ListItem>
					<ListItem>
						<Link href="https://vitejs.dev/" color="teal.400" isExternal>
							ViteJS
						</Link>
					</ListItem>
					<ListItem>
						<Link href="https://chakra-ui.com/" color="teal.400" isExternal>
							Chakra UI
						</Link>
					</ListItem>
					<ListItem>
						<Link href="https://redux-toolkit.js.org/" color="teal.400" isExternal>
							Redux Toolkit
						</Link>
					</ListItem>
				</UnorderedList>
				<Text fontSize="2xl" mt={5}>
					The APIs used within this project are from the task manager backend created before, here is the{' '}
					<Link href="https://my-simple-task-manager.herokuapp.com/" color="teal.400" isExternal>
						link
					</Link>{' '}
				</Text>
				<Text fontSize="2xl" mt={5}>
					This project was built for fun and learning purposes
				</Text>
			</Flex>
		</Box>
	);
}

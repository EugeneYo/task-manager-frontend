import { Box, Flex, Text, Button, Stack, useColorModeValue, useDisclosure, createStandaloneToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import ModeSwitcher from "./ModeSwitcher";
import { Link } from "react-router-dom";
import { useLogoutUserMutation } from "../Store/services/user.service";
import { useSelector } from "react-redux";
import theme from "../myTheme";

export default function Header() {
	// to toggle the navbar in mobile
	const [logoutUser, { isSuccess }] = useLogoutUserMutation();
	const authToken = useSelector((state) => state.user.token);
	const customToast = createStandaloneToast({
		theme,
	});
	console.log("Hello");
	// const [isLoggedIn, setLoggedIn] = useState(false);

	// useEffect(() => {
	// 	if (authToken.length > 1) {
	// 		setLoggedIn(true);
	// 	} else {
	// 		setLoggedIn(false);
	// 	}
	// }, [authToken]);
	// const [logoutUser] = useLogoutUserMutation();
	useEffect(() => {
		if (isSuccess) {
			customToast({
				title: "Logout successfully",
				description: "We will always welcome you",
				status: "success",
				duration: 3000,
				isClosable: true,
				position: "top",
			});
		}
	}, [isSuccess]);
	return (
		<Box>
			<Flex
				bg={useColorModeValue("white", "gray.800")}
				color={useColorModeValue("gray.600", "white")}
				minH={"60px"}
				py={[2]}
				px={[2, 0, 20]}
				borderBottom={1}
				borderStyle={"solid"}
				borderColor={useColorModeValue("gray.200", "gray.900")}
				align={"center"}
			>
				<Flex flex={{ base: 1 }} justify={{ base: "left", md: "start" }} px={2}>
					<Text as={Link} to="/" textAlign={["center", "left"]} fontFamily={"heading"} color={useColorModeValue("gray.800", "white")}>
						Simple Task Manager
					</Text>
				</Flex>

				<Stack flex={{ base: 1, md: 0 }} justify={{ base: "flex-end", md: "center" }} direction={"row"} spacing={2} borderRadius="lg" pr={2}>
					<ModeSwitcher justifySelf="flex-end" />
					{authToken.length < 1 && (
						<Button as={Link} to="/form" fontSize={"sm"} fontWeight={400} variant="solid" colorScheme="teal" borderLeftRadius="lg">
							Sign in
						</Button>
					)}
					{authToken.length > 10 && (
						<Button
							as={Link}
							to="/"
							fontSize={"sm"}
							fontWeight={400}
							variant="solid"
							colorScheme="teal"
							borderLeftRadius="lg"
							onClick={() => {
								logoutUser(authToken);
							}}
						>
							Log out
						</Button>
					)}

					{/* {authToken && (
						<Button
							as={Link}
							to="/"
							fontSize={"sm"}
							fontWeight={400}
							variant="solid"
							colorScheme="teal"
							borderLeftRadius="lg"
							onClick={() => {
								logoutUser(authToken);
							}}
						>
							Log out
						</Button>
					)} */}
				</Stack>
			</Flex>
		</Box>
	);
}

// const DesktopNav = () => {
// 	const linkColor = useColorModeValue("gray.600", "gray.200");
// 	const linkHoverColor = useColorModeValue("gray.800", "white");
// 	const popoverContentBgColor = useColorModeValue("white", "gray.800");

// 	return (
// 		<Stack direction={"row"} spacing={4}>
// 			{NAV_ITEMS.map((navItem) => (
// 				<Box key={navItem.label}>
// 					<Popover trigger={"hover"} placement={"bottom-start"}>
// 						<PopoverTrigger>
// 							<Link
// 								p={2}
// 								href={navItem.href ?? "#"}
// 								fontSize={"sm"}
// 								fontWeight={500}
// 								color={linkColor}
// 								_hover={{
// 									textDecoration: "none",
// 									color: linkHoverColor,
// 								}}
// 							>
// 								{navItem.label}
// 							</Link>
// 						</PopoverTrigger>

// 						{navItem.children && (
// 							<PopoverContent border={0} boxShadow={"xl"} bg={popoverContentBgColor} p={4} rounded={"xl"} minW={"sm"}>
// 								<Stack>
// 									{navItem.children.map((child) => (
// 										<DesktopSubNav key={child.label} {...child} />
// 									))}
// 								</Stack>
// 							</PopoverContent>
// 						)}
// 					</Popover>
// 				</Box>
// 			))}
// 		</Stack>
// 	);
// };

// const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
// 	return (
// 		<Link href={href} role={"group"} display={"block"} p={2} rounded={"md"} _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}>
// 			<Stack direction={"row"} align={"center"}>
// 				<Box>
// 					<Text transition={"all .3s ease"} _groupHover={{ color: "pink.400" }} fontWeight={500}>
// 						{label}
// 					</Text>
// 					<Text fontSize={"sm"}>{subLabel}</Text>
// 				</Box>
// 				<Flex
// 					transition={"all .3s ease"}
// 					transform={"translateX(-10px)"}
// 					opacity={0}
// 					_groupHover={{ opacity: "100%", transform: "translateX(0)" }}
// 					justify={"flex-end"}
// 					align={"center"}
// 					flex={1}
// 				>
// 					<Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
// 				</Flex>
// 			</Stack>
// 		</Link>
// 	);
// };

// const MobileNav = () => {
// 	return (
// 		<Stack bg={useColorModeValue("white", "gray.800")} p={4} display={{ md: "none" }}>
// 			{NAV_ITEMS.map((navItem) => (
// 				<MobileNavItem key={navItem.label} {...navItem} />
// 			))}
// 		</Stack>
// 	);
// };

// const MobileNavItem = ({ label, children, href }: NavItem) => {
// 	const { isOpen, onToggle } = useDisclosure();

// 	return (
// 		<Stack spacing={4} onClick={children && onToggle}>
// 			<Flex
// 				py={2}
// 				as={Link}
// 				href={href ?? "#"}
// 				justify={"space-between"}
// 				align={"center"}
// 				_hover={{
// 					textDecoration: "none",
// 				}}
// 			>
// 				<Text fontWeight={600} color={useColorModeValue("gray.600", "gray.200")}>
// 					{label}
// 				</Text>
// 				{children && <Icon as={ChevronDownIcon} transition={"all .25s ease-in-out"} transform={isOpen ? "rotate(180deg)" : ""} w={6} h={6} />}
// 			</Flex>

// 			<Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
// 				<Stack mt={2} pl={4} borderLeft={1} borderStyle={"solid"} borderColor={useColorModeValue("gray.200", "gray.700")} align={"start"}>
// 					{children &&
// 						children.map((child) => (
// 							<Link key={child.label} py={2} href={child.href}>
// 								{child.label}
// 							</Link>
// 						))}
// 				</Stack>
// 			</Collapse>
// 		</Stack>
// 	);
// };

// interface NavItem {
// 	label: string;
// 	subLabel?: string;
// 	children?: Array<NavItem>;
// 	href?: string;
// }

// const NAV_ITEMS: Array<NavItem> = [
// 	{
// 		label: "Inspiration",
// 		children: [
// 			{
// 				label: "Explore Design Work",
// 				subLabel: "Trending Design to inspire you",
// 				href: "#",
// 			},
// 			{
// 				label: "New & Noteworthy",
// 				subLabel: "Up-and-coming Designers",
// 				href: "#",
// 			},
// 		],
// 	},
// 	{
// 		label: "Find Work",
// 		children: [
// 			{
// 				label: "Job Board",
// 				subLabel: "Find your dream design job",
// 				href: "#",
// 			},
// 			{
// 				label: "Freelance Projects",
// 				subLabel: "An exclusive list for contract work",
// 				href: "#",
// 			},
// 		],
// 	},
// 	{
// 		label: "Learn Design",
// 		href: "#",
// 	},
// 	{
// 		label: "Hire Designers",
// 		href: "#",
// 	},
// ];

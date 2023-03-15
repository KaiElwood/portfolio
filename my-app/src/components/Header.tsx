import Link from "next/link";
import { Flex, Box, LinkBox } from "@chakra-ui/react";

// type HeaderProps = {}

const Header = () => {
  return (
	// hamburger on mobile? how to do... maybe there is a hamburger icon or component with chakraui
		<Flex align="left" justify="center">
			<LinkBox>
			{/* home */}
			</LinkBox>
			<LinkBox>
			{/* about */}
			</LinkBox>
			<LinkBox>
			{/* portfolio */}
			</LinkBox>
			<LinkBox>
			{/* blog */}
			</LinkBox>
		</Flex>
  );
};

export default Header;

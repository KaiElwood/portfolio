import Link from "next/link";

const Footer = () => {
  return (
	<div className="min-h-10 border-t border-solid border-[#696969]">
		<Link className="text-sm" href={"https://www.linkedin.com/in/kai-elwood-dieu/"}>
			Linkedin
		</Link>
	</div>
	// hamburger on mobile? how to do... maybe there is a hamburger icon or component with chakraui
		// <Flex align="left" justify="center">
		// 	<LinkBox>
		// 	{/* home */}
		// 	</LinkBox>
		// 	<LinkBox>
		// 	{/* about */}
		// 	</LinkBox>
		// 	<LinkBox>
		// 	{/* portfolio */}
		// 	</LinkBox>
		// 	<LinkBox>
		// 	{/* blog */}
		// 	</LinkBox>
		// </Flex>
  );
};

export default Footer;
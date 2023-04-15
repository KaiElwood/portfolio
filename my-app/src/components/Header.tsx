import Link from "next/link";

// type HeaderProps = {}

// TODO: figure out what to put for header

const Header = () => {
  return (
	<>
	<div>This is the header</div>
	{/* // hamburger on mobile? how to do... maybe there is a hamburger icon or component with chakraui */}
		<div>
			<Link href={"/"}>
			home
			</Link>
			<Link href={"/about"}>
			about
			</Link>
			<Link href={"/posts"}>
			portfolio
			</Link>
			<Link href={"/blog"}>
			blog
			</Link>
		</div>
	<div>This is the end of the header</div>
	</>
  );
};

export default Header;

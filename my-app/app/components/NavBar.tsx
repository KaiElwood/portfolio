import Link from "next/link";
import "./classes.css";

// type HeaderProps = {}

// TODO: figure out mobile navbar situation. different component?

const NavBar = () => {
  return (
	<>
	{/* // hamburger on mobile? how to do... maybe there is a hamburger icon or component with chakraui */}
		<div className="items-center flex justify-between h-20">
			<div>			
				<Link className="font-bold" href={'/'} >
					Kai Elwood-Dieu
				</Link>
			</div>
			<div className="px-8 flex justify-between">
				<Link className="px-6" href={"/"}>
					Home
				</Link>
				<Link className="px-6" href={"/about"}>
					About
				</Link>
				<Link className="px-6" href={"/posts"}>
					Portfolio
				</Link>
				<Link className="px-6" href={"/blog"}>
					Blog
				</Link>
			</div>
		</div>
	</>
  );
};

export default NavBar;

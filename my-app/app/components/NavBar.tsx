"use client";
import Link from "next/link";
import MenuToggleButton from "./MenuIcons/MenuOpenButton";
import { usePathname } from "next/navigation";
import { useState } from "react";
import "./classes.css";
import { Space_Mono } from 'next/font/google';
const space = Space_Mono({ subsets: ["latin"], weight: ["700", "400"] });
import MenuCloseButton from "./MenuIcons/MenuCloseButton";

const NavBar = () => {
	const pathName = usePathname();
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<>
			<div className="items-center flex-row flex justify-between h-20">
				<div className="z-50">			
					<Link className={`z-50 ${space} font-bold font-italic`} href={'/'} >
						Kai Elwood-Dieu
					</Link>
				</div>
				<MenuToggleButton menuOpen={menuOpen} onClick={toggleMenu} />
				<div
					className={`${ !menuOpen ? "hidden lg:flex" : null} 
					flex-col fixed lg:relative h-full lg:h-fit w-full lg:w-fit top-0 left-0 justify-around lg:space-between items-center bg-backblack lg:bg-transparent z-50 text-white lg:text-black font-4xl lg:font-xl font-bold lg:font-normal flex lg:flex-row`}
				>
					<Link className={`px-6 text-base hover:underline underline-offset-4 ${pathName === '/' ? 'underline' : ''}`} href={"/"}>
						Home
					</Link>
					<Link className={`px-6 text-base hover:underline underline-offset-4 ${pathName === '/about' ? 'underline' : ''}`} href={"/about"}>
						About
					</Link>
					<Link className={`px-6 text-base hover:underline underline-offset-4 ${pathName === '/portfolio' ? 'underline' : ''}`} href={"/portfolio"}>
						Portfolio
					</Link>
					<Link className={`px-6 text-base hover:underline underline-offset-4 ${pathName === '/blog' ? 'underline' : ''}`} href={"/blog"}>
						Blog
					</Link>
					<MenuCloseButton menuOpen={menuOpen} onClick={toggleMenu} />
				</div>
			</div>
		</>
	);
};

export default NavBar;

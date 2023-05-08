"use client";
import Link from "next/link";
import { useState } from "react";
import "./classes.css";

const NavBar = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<>
			<div className="items-center flex-row flex justify-between h-20">
				<div className="z-50">			
					<Link className="z-50 font-harbour" href={'/'} >
						Kai Elwood-Dieu
					</Link>
				</div>
				<button
					className={`${menuOpen ? "hidden" : null} lg:hidden block`}
					onClick={toggleMenu}
					aria-label="Toggle menu"
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M4 6h16M4 12h16M4 18h16"
						></path>
					</svg>
				</button>
				<div
					className={`${ !menuOpen ? "hidden lg:flex" : null} 
					flex-col fixed lg:relative h-full lg:h-fit w-full lg:w-fit top-0 left-0 justify-around lg:space-between items-center bg-backblack lg:bg-transparent z-50 text-white lg:text-black font-4xl lg:font-xl font-bold lg:font-normal flex lg:flex-row`}
				>
					<Link className="px-6 hover:underline underline-offset-4" href={"/"}>
						Home
					</Link>
					<Link className="px-6 hover:underline underline-offset-4" href={"/about"}>
						About
					</Link>
					<Link className="px-6 hover:underline underline-offset-4" href={"/posts"}>
						Portfolio
					</Link>
					<Link className="pl-6 hover:underline underline-offset-4" href={"/blog"}>
						Blog
					</Link>
					<button
						className={`${!menuOpen ? "hidden" : null} text-white absolute m-6 top-0 right-0 lg:hidden block`}
						onClick={toggleMenu}
						aria-label="Toggle menu"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18L18 6M6 6l12 12"
							></path>
						</svg>
					</button>
				</div>
			</div>
		</>
	);
};

export default NavBar;

import React from 'react';
import { MenuButtonProps } from 'app/types/MenuButtonProps';

const MenuOpenButton: React.FC<MenuButtonProps> = ({ menuOpen, onClick }) => {
	return (
		<button
			className={`${menuOpen ? "hidden" : ""} lg:hidden block`}
			onClick={onClick}
			type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
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
	);
};

export default MenuOpenButton;
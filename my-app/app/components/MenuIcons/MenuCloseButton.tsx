import React from 'react';
import { MenuButtonProps } from 'app/types/MenuButtonProps';

const MenuOpenButton: React.FC<MenuButtonProps> = ({ menuOpen, onClick }) => {
	return (
		<button
						className={`${!menuOpen ? "hidden" : null} text-white absolute m-6 top-0 right-0 lg:hidden block`}
						onClick={onClick}
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
	);
};

export default MenuOpenButton;
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		screens: {
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
		},
		extend: {
			minHeight: {
				'10': '2.5rem',
			  },
			  gridTemplateRows: {
				// Simple 16 column grid
				'16': 'repeat(16, minmax(0, 1fr))',
		
				// Complex site-specific column configuration
				'footer': '5rem minmax(300px, 1fr) 100px',
			  },
			zIndex: {
				'neg': '-10'
			},
			colors: {
				'backblack': '#000000c4',
			  },
			fontFamily: {
				harbour: ["HARBOUR", 'sans-serif'],
			},
		},
	},
	plugins: [],
};

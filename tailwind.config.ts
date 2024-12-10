import { animate } from 'framer-motion';
import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/theme";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/components/(button|card|ripple|spinner).js"
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Red Hat Display"]
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					100: '#a0e0e1',  
					500: '#78d5d7',  
					700: '#4fa3a3',  
				  },
				secondary: {
					100: '#99e0ff',  
					500: '#63d2ff',  
					700: '#4cb9e6',  
				},
				'dark-blue': '#006494',
				'light-blue': '#B3E0FF',
				// card: {
				// 	DEFAULT: 'hsl(var(--card))',
				// 	foreground: 'hsl(var(--card-foreground))'
				// },
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				// primary: {
				// 	DEFAULT: 'hsl(var(--primary))',
				// 	foreground: 'hsl(var(--primary-foreground))'
				// },
				// secondary: {
				// 	DEFAULT: 'hsl(var(--secondary))',
				// 	foreground: 'hsl(var(--secondary-foreground))'
				// },
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				// border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			// borderRadius: {
			// 	lg: 'var(--radius)',
			// 	md: 'calc(var(--radius) - 2px)',
			// 	sm: 'calc(var(--radius) - 4px)'
			// },
			backgroundImage: {
				'sliderBanner': "url('/src/img/image1.jpg')",
				'sliderBanner2': "url('/src/img/image7.jpg')"
			}
		}
	},
	//   plugins: [require(tailwindcss-animate),nextui()],
};
export default config;

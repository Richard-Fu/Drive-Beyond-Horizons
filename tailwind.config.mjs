/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				racing: {
					50: '#fef2f2',
					100: '#fee2e2',
					200: '#fecaca',
					300: '#fca5a5',
					400: '#f87171',
					500: '#ef4444',
					600: '#dc2626',
					700: '#b91c1c',
					800: '#991b1b',
					900: '#7f1d1d',
				},
				accent: {
					400: '#fbbf24',
					500: '#f59e0b',
					600: '#d97706',
				}
			},
			boxShadow: {
				'racing': '0 0 20px rgba(220, 38, 38, 0.5)',
				'racing-lg': '0 0 40px rgba(220, 38, 38, 0.3)',
			}
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
} 
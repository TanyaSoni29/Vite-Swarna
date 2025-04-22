/** @format */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	define: {
		global: 'window',
	},
	optimizeDeps: {
		include: [
			'@fortawesome/fontawesome-free',
			'@fortawesome/free-solid-svg-icons',
			'@fortawesome/react-fontawesome',
		],
	},
});

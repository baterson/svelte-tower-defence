import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$store: 'src/lib/store',
			$components: 'src/lib/components',
			$utils: 'src/lib/utils'
		}
	}
});

import adapter from '@sveltejs/adapter-auto';
// import path from 'path';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// dev: true,
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			$store: 'src/lib/store',
			$components: 'src/lib/components',
			$utils: 'src/lib/utils'
			// $store: path.resolve('./src/lib/store'),
			// $components: path.resolve('./src/lib/components'),
			// $utils: path.resolve('./src/lib/utils')
		}
	},
	onwarn: (warning, handler) => {
		if (warning.code.startsWith('a11y-')) {
			return;
		}
		handler(warning);
	}
};

export default config;

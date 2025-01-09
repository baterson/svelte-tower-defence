import { sounds } from '$lib/sound';

export class ResourceManager {
	resources = $state({});
	preloaded = $state(false);

	async preload() {
		const loadSound = (name, url) => {
			return new Promise((resolve, reject) => {
				const audio = new Audio(url);
				audio.addEventListener('canplaythrough', () => {
					this.resources[name] = audio;
					resolve();
				});
				audio.addEventListener('error', (error) => reject(error));
				audio.load();
			});
		};

		try {
			await loadSound('bgSound', sounds.bgSound);
			const effectPromises = Object.entries(sounds.effects).map(([name, url]) =>
				loadSound(name, url)
			);
			await Promise.all(effectPromises);
			this.preloaded = true;
			console.log('Resources preloaded successfully.');
		} catch (error) {
			console.error('Error preloading resources:', error);
		}
	}

	getResource(name) {
		return this.resources[name];
	}
}

export const resourceManager = new ResourceManager();

const sounds = {
	bgSound: '/sound/bgSound.mp3',
	effects: {
		pickUp: '/sound/sfx/pickUp.m4a',
		towerUpgrade: '/sound/sfx/towerUpgrade.m4a',
		clickEnemy: '/sound/sfx/clickEnemy.m4a',
		towerShoot: '/sound/sfx/towerShoot.m4a',
		clickMenu: '/sound/sfx/clickMenu.m4a'
	}
};

export class ResourceManager {
	resources = $state.raw({});
	preloaded = $state(false);
	loadedCount = $state(0);
	totalResources = $derived(Object.keys(sounds.effects).length + 1);
	preloadPercent = $derived(
		Math.min(Math.floor((this.loadedCount / this.totalResources) * 100), 100)
	);

	async preload() {
		const loadSound = (name, url) => {
			return new Promise((resolve, reject) => {
				const audio = new Audio(url);
				audio.addEventListener('canplaythrough', () => {
					this.resources[name] = audio;
					this.loadedCount += 1;
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

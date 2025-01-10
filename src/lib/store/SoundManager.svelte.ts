const sounds = {
	bgSound: '/sound/bgSound.mp3',
	effects: {
		pickUp: '/sound/sfx/pickUp.wav',
		shoot: '/sound/sfx/shoot.wav',
		towerUpgrade: '/sound/sfx/towerUpgrade.wav',
		clickEnemy: '/sound/sfx/clickEnemy.wav',
		towerShoot: '/sound/sfx/towerShoot.wav',
		clickMenu: '/sound/sfx/clickMenu.wav'
	}
};

export class SoundManager {
	sounds = $state.raw({});
	musicVolume = $state(0.06);
	sfxVolume = $state(0.09);
	isMuted = $state(false);
	playingEffectsCount = $state(0);

	// Resource loading states
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
					this.sounds[name] = audio;
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
			console.log('Sounds preloaded successfully.');
		} catch (error) {
			console.error('Error preloading sounds:', error);
		}
	}

	setMusicVolume(volume) {
		this.musicVolume = volume;
		const bgSound = this.sounds['bgSound'];
		if (bgSound) bgSound.volume = volume;
	}

	setSfxVolume(volume) {
		this.sfxVolume = volume;
		// Update the volume of all effect sounds
		Object.entries(this.sounds).forEach(([name, audio]) => {
			if (name !== 'bgSound') {
				audio.volume = volume;
			}
		});
	}

	play(name, isImportant = false) {
		if (this.isMuted) return;
		const audio = this.sounds[name];
		if (!audio) return;
		if (name === 'bgSound') {
			audio.volume = this.musicVolume;
			audio.currentTime = 0;
			audio.play();
			return;
		}
		if (isImportant || this.playingEffectsCount < 10) {
			audio.volume = this.sfxVolume;
			audio.currentTime = 0;
			audio.play();
			const onEnded = () => {
				this.playingEffectsCount -= 1;
				audio.removeEventListener('ended', onEnded);
			};
			audio.addEventListener('ended', onEnded);
			this.playingEffectsCount += 1;
		}
	}

	pause(name) {
		const audio = this.sounds[name];
		if (audio) {
			audio.pause();
		}
	}

	toggleMute() {
		this.isMuted = !this.isMuted;
		if (this.isMuted) {
			this.pause('bgSound');
		} else {
			this.play('bgSound');
		}
	}
}

export const soundManager = new SoundManager();

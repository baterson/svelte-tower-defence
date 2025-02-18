const sounds = {
	bgSound: '/sound/bgSound.mp3',
	effects: {
		pickUp: '/sound/sfx/pickUp.m4a',
		towerUpgrade: '/sound/sfx/towerUpgrade.m4a',
		clickEnemy: '/sound/sfx/clickEnemy.m4a',
		towerShoot: '/sound/sfx/towerShoot.m4a',
		clickMenu: '/sound/sfx/clickMenu.m4a',
		lowResourse: '/sound/sfx/lowResourse.m4a'
	}
};

const MUSIC_VOLUME = 0.3;
const SFX_VOLUME = 0.2;

export class SoundManager {
	sounds = $state.raw({});
	isMuted = $state(false);
	playingEffectsCount = $state(0);

	// Resource loading states
	preloaded = $state(false);
	loadedCount = $state(0);
	totalResources = $derived(Object.keys(sounds.effects).length + 1);
	preloadPercent = $derived(
		Math.min(Math.floor((this.loadedCount / this.totalResources) * 100), 100)
	);

	preload = async () => {
		const loadSound = (name, url) => {
			return new Promise((resolve, reject) => {
				const audio = new Audio(url);

				const onLoad = () => {
					this.sounds[name] = audio;
					this.sounds[name].volume = name === 'bgSound' ? MUSIC_VOLUME : SFX_VOLUME;
					this.sounds[name].loop = name === 'bgSound';
					this.loadedCount += 1;
					audio.removeEventListener('canplaythrough', onLoad);
					resolve();
				};

				const onError = (error) => {
					audio.removeEventListener('error', onError);
					reject(error);
				};

				audio.addEventListener('canplaythrough', onLoad);
				audio.addEventListener('error', onError);
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
			throw error;
		}
	};

	reduceBgVolume = () => {
		this.sounds.bgSound.volume = MUSIC_VOLUME - 0.2;
	};

	restoreBgVolume = () => {
		this.sounds.bgSound.volume = MUSIC_VOLUME;
	};

	play = (name, isImportant = false) => {
		if (this.isMuted) return;

		const audio = this.sounds[name];
		if (!audio) return;

		if (name === 'bgSound') {
			audio.currentTime = 0;
			audio.play();
			return;
		}

		// Disable sfx on Safari due to performance issues
		if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) {
			return;
		}

		if (isImportant || this.playingEffectsCount < 10) {
			audio.currentTime = 0;
			audio.play();
			const onEnded = () => {
				this.playingEffectsCount -= 1;
				audio.removeEventListener('ended', onEnded);
			};
			audio.addEventListener('ended', onEnded);
			this.playingEffectsCount += 1;
		}
	};

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

	reset() {
		if (this.isMuted) return;
		const bgSound = this.sounds['bgSound'];

		if (bgSound) {
			bgSound.currentTime = 0;
			bgSound.volume = MUSIC_VOLUME;
			bgSound.play();
		}
	}
}

export const soundManager = new SoundManager();

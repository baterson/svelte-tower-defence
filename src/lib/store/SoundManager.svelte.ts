import { sounds } from '$lib/sound';
import { resourceManager } from './ResourceManager.svelte';

export class SoundManager {
	sounds = $state({});
	musicVolume = $state(0.06);
	sfxVolume = $state(0.09);
	isMuted = $state(false);
	isReady = $state(false);
	effectPool = $state([]);
	effectPoolSize = 3;

	/**
	 * Preloads all sounds into memory.
	 * Returns a promise that resolves when all sounds are loaded.
	 */
	async preload() {
		const loadSound = (name, url, type) => {
			return new Promise((resolve, reject) => {
				const audio = new Audio(url);
				audio.volume = type === 'music' ? this.musicVolume : this.sfxVolume;
				audio.loop = type === 'music';

				// Resolve the promise once the audio is loaded
				audio.addEventListener('canplaythrough', () => {
					this.sounds[name] = { audio, type };
					resolve();
				});

				// Reject the promise if there's an error loading the audio
				audio.addEventListener('error', (error) => reject(error));

				audio.load();
			});
		};

		try {
			// Preload the background music
			await loadSound('bgSound', sounds.bgSound, 'music');

			// Preload sound effects
			const effectPromises = Object.entries(sounds.effects).map(([name, url]) =>
				loadSound(name, url, 'effect')
			);

			await Promise.all(effectPromises);

			// Initialize effect pool
			this.initializeEffectPool();

			this.isReady = true;
			console.log('All sounds preloaded successfully.');
		} catch (error) {
			console.error('Error preloading sounds:', error);
		}
	}

	initializeEffectPool() {
		this.effectPool = Array.from({ length: this.effectPoolSize }, () => null);
	}

	setMusicVolume(volume) {
		this.musicVolume = volume;
		const bgSound = this.sounds['bgSound'];
		if (bgSound) bgSound.audio.volume = volume;
	}

	setSfxVolume(volume) {
		this.sfxVolume = volume;
		// Update the volume of all effect sounds
		Object.values(this.sounds).forEach((sound) => {
			if (sound.type === 'effect') {
				sound.audio.volume = volume;
			}
		});
	}

	play(name) {
		if (this.isMuted) return;
		const resource = resourceManager.getResource(name);
		if (resource) {
			if (name === 'bgSound') {
				resource.volume = this.musicVolume;
				resource.currentTime = 0;
				resource.play();
			} else {
				const availableSlot = this.effectPool.findIndex(
					(slot) => !slot || slot.paused || slot.ended
				);
				if (availableSlot !== -1) {
					// const effectAudio = resource.cloneNode();
					// effectAudio.volume = this.sfxVolume;
					// effectAudio.currentTime = 0;
					// effectAudio.play();
					// this.effectPool[availableSlot] = effectAudio;
				}
			}
		}
	}

	pause(name) {
		const resource = resourceManager.getResource(name);
		if (resource) {
			resource.pause();
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

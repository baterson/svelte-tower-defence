import { resourceManager } from './ResourceManager.svelte';

export class SoundManager {
	sounds = $state.raw({});
	musicVolume = $state(0.06);
	sfxVolume = $state(0.09);
	isMuted = $state(false);
	playingEffectsCount = $state(0);

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

	play(name, isImportant = false) {
		if (this.isMuted) return;
		const resource = resourceManager.getResource(name);

		if (name === 'bgSound') {
			resource.volume = this.musicVolume;
			resource.currentTime = 0;
			resource.play();
			return;
		}

		if (isImportant || this.playingEffectsCount < 10) {
			const effectAudio = resource;
			effectAudio.volume = this.sfxVolume;
			effectAudio.currentTime = 0;
			effectAudio.play();

			const onEnded = () => {
				this.playingEffectsCount -= 1;
				effectAudio.removeEventListener('ended', onEnded);
			};

			effectAudio.addEventListener('ended', onEnded);

			this.playingEffectsCount += 1;
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

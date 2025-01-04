import { sounds } from '$lib/sound';
export class SoundManager {
	sounds = $state({});
	musicVolume = $state(0.02);
	sfxVolume = $state(0.09);
	isMuted = $state(false);
	isReady = $state(false);

	init() {
		this.loadSounds();
		this.isReady = true;
	}

	loadSounds() {
		this.addSound('bgSound', sounds.bgSound, 'music');

		Object.entries(sounds.effects).forEach(([name, url]) => {
			this.addSound(name, url, 'effect');
		});
	}

	addSound(name: string, url: string, type: 'music' | 'effect') {
		const audio = new Audio(url);
		audio.volume = type === 'music' ? this.musicVolume : this.sfxVolume;
		audio.loop = type === 'music';
		this.sounds[name] = {
			audio,
			type
		};
	}
	play(name: string) {
		const sound = this.sounds[name];
		if (sound.type === 'effect') {
			const effectAudio = new Audio(sound.audio.src);
			effectAudio.volume = this.sfxVolume;
			effectAudio.play();
		} else {
			sound.audio.play();
		}
	}
	pause(name: string) {
		const sound = this.sounds[name];
		if (sound) {
			sound.audio.pause();
		}
	}
}

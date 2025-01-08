import { sounds } from '$lib/sound';
export class SoundManager {
	sounds = $state({});
	musicVolume = $state(0.06);
	sfxVolume = $state(0.09);
	isMuted = $state(false);
	isReady = $state(false);

	init() {
		this.loadSounds();
		this.isReady = true;
	}

	setMusicVolume(volume: number) {
		this.musicVolume = volume;
		const bgSound = this.sounds['bgSound'];
		bgSound.audio.volume = volume;
	}
	restartBgMusic() {
		const bgSound = this.sounds['bgSound'];
		if (bgSound && !this.isMuted) {
			bgSound.audio.currentTime = 0;
			bgSound.audio.play();
		}
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
		if (this.isMuted) return;
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
	toggleMute() {
		this.isMuted = !this.isMuted;

		if (this.isMuted) {
			this.pause('bgSound');
		} else {
			this.play('bgSound');
		}
	}
}

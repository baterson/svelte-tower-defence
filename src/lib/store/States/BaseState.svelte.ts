import { Sprite } from '$lib/store/Sprite.svelte';

export class BaseState {
	sprite = $state();

	constructor({ frames, frameRate, loop }) {
		this.sprite = new Sprite({ frames, frameRate, loop });
	}

	update(deltaTime, owner) {
		console.log('base State update hit..');

		this.sprite.update(deltaTime);
	}
}

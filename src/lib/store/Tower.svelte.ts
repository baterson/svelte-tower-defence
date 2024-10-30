import { towers } from '$lib/entitiesConfig';
import { Sprite } from './Sprite.svelte';

export class Tower {
	slot = $state();
	sprite = $state();

	constructor(name, slot) {
		const { sprite, collider, stats } = towers[name];
		this.sprite = new Sprite(sprite);
		this.slot = slot;
	}

	// todo: atack
	update = () => {};

	//todo: add atack
}

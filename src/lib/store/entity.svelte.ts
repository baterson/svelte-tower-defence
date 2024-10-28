import { entities } from '$lib/entitiesConfig';
import { Sprite } from './sprite.svelte';

export class Entity {
	static lastId = 0;
	id = $state(Entity.lastId++);
	position = $state();
	sprite = $state();
	width = $state();
	height = $state();

	constructor(name, position) {
		const { sprite, width, height } = entities[name];
		this.sprite = new Sprite(sprite.x, sprite.y);
		this.width = width;
		this.height = height;
		this.position = position;
	}

	update = () => {
		// console.log('this.position', this.style);
		this.position.y += 1;
	};
}

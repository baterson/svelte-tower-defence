import { entities } from '$lib/entitiesConfig';
import { Sprite } from '$lib/store/Sprite.svelte';
import { Collider } from '$lib/store/Collider.svelte';
import type { Vector2 } from '$lib/store/Vector2.svelte';

export class Entity {
	static lastId = 0;
	id = $state(Entity.lastId++);
	sprite = $state<Sprite>();
	collider = $state<Collider>();
	position = $state<Vector2>();
	state = $state();
	stats = $state();
	rotation = $state(0);

	constructor(name, position) {
		const { sprite, collider, stats } = entities[name];
		this.sprite = new Sprite(sprite);
		this.collider = new Collider({ ...collider, position });
	}

	update = (deltaTime) => {
		this.collider.position.y += 1;
		this.sprite.update(deltaTime);
	};
}

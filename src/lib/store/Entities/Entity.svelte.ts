import { getConfig } from '$lib/entitiesConfig';
import { Sprite } from '$store/Sprite.svelte';
import { Vector2 } from '$store/Vector2.svelte';
import { StateMachine } from '$store/StateMachine.svelte';
import { Collider } from '$store/Collider.svelte';

export class Entity {
	static lastId = 0;

	id = $state(Entity.lastId++);
	name = $state('');
	type = $state('');
	width = $state(0);
	height = $state(0);
	spriteSheet = $state('');
	sprite = $state<Sprite>();
	collider = $state<Collider>();
	position = $state<Vector2>();
	state = $state<StateMachine>();
	stats = $state({});
	rotation = $state(0);
	isDestroyed = $state(false);

	constructor(name: string, position: Vector2) {
		const { width, height, type, states, sprites, spriteSheet, defaultState, stats } =
			getConfig(name);

		this.name = name;
		this.type = type;
		this.width = width;
		this.height = height;
		this.position = position;
		this.stats = { ...stats };
		this.spriteSheet = spriteSheet;
		this.state = new StateMachine(this, states, defaultState, (name) =>
			this.setSprite(name, sprites)
		);
		this.collider = new Collider(this);
	}

	update(deltaTime: number, entityPool) {
		// console.log('entity update', entityPool);

		this.state.update(deltaTime, entityPool);
		this.sprite.update(deltaTime);
	}

	setSprite(name: string, sprites) {
		const sprite = sprites.find((sprite) => sprite.name === name);
		if (!sprite) throw new Error(`Sprite not found for: ${name}`);

		this.sprite = new Sprite(sprite, this.spriteSheet);
	}
}

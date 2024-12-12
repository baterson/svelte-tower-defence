import { getConfig } from '$lib/config/entitiyConfig';
import { Sprite } from '$store/Sprite.svelte';
import { Vector2 } from '$store/Vector2.svelte';
import { StateMachine } from '$store/StateMachine.svelte';
import { Collider } from './Collider.svelte';

export class Entity {
	static lastId = 0;

	id = $state(Entity.lastId++);
	name = $state('');
	type = $state('');
	width = $state(0);
	height = $state(0);
	spriteSheet = $state('');
	sprite = $state<Sprite>();
	position = $state<Vector2>();
	prevPosition = $state<Vector2>();
	state = $state<StateMachine>();
	stats = $state({});
	rotation = $state(0);
	opacity = $state(1);
	collider = $state<Collider>();
	isDestroyed = $state(false);
	isInteractable = $state(true);

	constructor(
		name,
		position,
		{ width, height, type, states, animations, spriteSheet, defaultState, onCollide, stats },
		stateContext
	) {
		this.name = name;
		this.type = type;
		this.width = width;
		this.height = height;
		this.position = position;
		this.prevPosition = position;
		this.stats = { ...stats };
		this.spriteSheet = spriteSheet;
		this.state = new StateMachine(
			this,
			states,
			defaultState,
			(stateName) => this.setSprite(stateName, animations),
			stateContext
		);
		this.collider = new Collider(this, onCollide);
	}

	beforeUpdate(deltaTime: number) {
		this.prevPosition = this.position.clone();
	}

	update(deltaTime: number, entityPool) {
		if (this.isDestroyed) return;
		this.state.update(deltaTime, entityPool);
		this.sprite.update(deltaTime);
	}

	setSprite(name: string, animations) {
		const sprite = animations.find((sprite) => sprite.name === name);
		// if (!sprite)
		// 	throw new Error(`Sprite ${name} not found for: ${this.name}: with type ${this.type}`);
		if (sprite) {
			this.sprite = new Sprite(sprite, this.spriteSheet);
		}
	}

	stopInteractions() {
		this.isInteractable = false;
	}

	destroy() {
		this.isDestroyed = true;
	}
}

export const initEntity = (name, position, stateContext = {}) => {
	const config = getConfig(name);

	return new Entity(name, position, config, stateContext);
};

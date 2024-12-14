import { getConfig } from '$lib/config/entitiyConfig';
import { Sprite } from '$store/Sprite.svelte';
import { Vector2 } from '$store/Vector2.svelte';
import { StateMachine } from '$store/StateMachine.svelte';

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
	scale = $state(1);
	opacity = $state(1);
	isInteractable = $state(true);
	toDestroy = $derived(this.isQueuedForDestroy());

	constructor(
		name,
		position,
		{ width, height, scale, type, states, animations, spriteSheet, initialState, onCollide, stats },
		context
	) {
		this.name = name;
		this.type = type;
		this.width = width;
		this.height = height;
		this.scale = scale;
		this.position = position;
		this.prevPosition = position;
		this.stats = { ...stats };
		this.spriteSheet = spriteSheet;
		this.state = new StateMachine({
			owner: this,
			states,
			initialState,
			onEnter: (stateName) => this.setSprite(stateName, animations),
			context
		});
		this.onCollide = (other) => onCollide(this, other);
	}

	isQueuedForDestroy() {
		if (this.isInteractable) {
			return;
		}

		if (!this.sprite) {
			return true;
		}

		if (this.sprite.isAnimationComplete) {
			return true;
		}

		return false;
	}

	getBoundingBox(): BoundingBox {
		return {
			x: this.position.x,
			y: this.position.y,
			width: this.width,
			height: this.height,
			rotation: this.rotation
		};
	}

	beforeUpdate(deltaTime: number) {
		this.prevPosition = this.position.clone();
	}

	update(deltaTime: number) {
		if (this.isDestroyed) return;

		this.state.update(deltaTime);

		if (this.sprite) {
			this.sprite.update(deltaTime);
		}
	}

	setSprite(name: string, animations) {
		if (!animations) return;
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
}

export const initEntity = (name, position, stateContext = {}) => {
	const config = getConfig(name);

	return new Entity(name, position.clone(), config, stateContext);
};

import { getConfig } from '$lib/config/entitiyConfig';
import { Sprite } from '$store/Sprite.svelte';
import { Vector2 } from '$store/Vector2.svelte';
import { StateMachine } from '$store/StateMachine.svelte';
import { upgradeTower } from '$lib/config/upgrades';

export class Entity {
	static lastId = 0;

	id = $state(Entity.lastId++);
	name = $state('');
	type = $state('');
	width = $state(0);
	height = $state(0);
	velocity = $state<Vector2>();
	spriteSheet = $state('');
	effects = $state([]);
	sprite = $state<Sprite>();
	position = $state<Vector2>();
	state = $state<StateMachine>();
	stats = $state({});
	rotation = $state(0);
	scale = $state(1);
	opacity = $state(1);
	isInteractable = $state(true);
	upgradeLevel = $state(0);

	constructor(
		name,
		position,
		{
			width,
			height,
			scale,
			rotation,
			type,
			states,
			animations,
			spriteSheet,
			initialState,
			onCollide,
			stats,
			upgradeLevel,
			effects
		},
		context
	) {
		// Entity stats
		this.name = name;
		this.type = type;
		this.width = width;
		this.height = height;
		this.scale = scale || 1;
		this.rotation = rotation || 0;
		this.position = position;
		this.velocity = new Vector2();
		this.stats = { ...stats };
		this.upgradeLevel = upgradeLevel || 0;

		// Entity has either effect or animations
		this.effects = effects;
		this.spriteSheet = spriteSheet;

		// Handle collisions
		this.onCollide = (other) => onCollide(this, other);

		// Handle state changes
		const onStateEnter = (stateName) => {
			if (spriteSheet && animations) {
				this.setSprite(stateName, animations);
			}
		};

		this.state = new StateMachine({
			owner: this,
			states,
			initialState,
			onEnter: onStateEnter,
			context
		});
	}

	get boundingBox() {
		return {
			x1: this.position.x,
			y1: this.position.y,
			x2: this.position.x + this.width,
			y2: this.position.y + this.height,
			center: this.position.clone().add(new Vector2(this.width / 2, this.height / 2))
		};
	}

	update(deltaTime: number) {
		if (this.isDestroyed) return;

		this.state.update(deltaTime);

		if (this.sprite) {
			this.sprite.update(deltaTime);
		}
	}

	setPosition = (position: Vector2) => {
		this.position = position;
	};

	setSprite(name: string, animations) {
		const sprite = animations.find((sprite) => sprite.name === name);

		if (sprite) {
			this.sprite = new Sprite(sprite, this.spriteSheet);
		}
	}

	stopInteractions() {
		this.isInteractable = false;
	}

	upgrade = () => {
		if (this.type === 'tower') {
			upgradeTower(this);
		}
	};
}

export const initEntity = (name, position, stateContext = {}) => {
	const config = getConfig(name);

	return new Entity(name, position.clone(), config, stateContext);
};

import { getConfig } from '$lib/config/entitiyConfig';
import { Sprite } from '$store/Sprite.svelte';
import { Vector2 } from '$store/Vector2.svelte';
import { StateMachine } from '$store/StateMachine.svelte';
import { Collider } from '$store/Collider.svelte';
// import { isInRadius } from '$utils/math';

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
	state = $state<StateMachine>();
	stats = $state({});
	rotation = $state(0);
	isDestroyed = $state(false);

	constructor(
		name,
		position,
		{ width, height, type, states, sprites, spriteSheet, defaultState, stats },
		stateContext,
		onCollide
	) {
		this.name = name;
		this.type = type;
		this.width = width;
		this.height = height;
		this.position = position;
		this.stats = { ...stats };
		this.spriteSheet = spriteSheet;
		this.state = new StateMachine(
			this,
			states,
			defaultState,
			(stateName) => this.setSprite(stateName, sprites),
			stateContext
		);
		this.resolveCollision = (other) => onCollide(this, other);
	}

	update(deltaTime: number, entityPool) {
		this.state.update(deltaTime, entityPool);
		this.sprite.update(deltaTime);
	}

	setSprite(name: string, sprites) {
		const sprite = sprites.find((sprite) => sprite.name === name);
		if (!sprite) throw new Error(`Sprite ${name} not found for: ${this.name}: ${this.type}`);

		this.sprite = new Sprite(sprite, this.spriteSheet);
	}
}

const enemyCollider = (entity, target) => {
	entity.stats.health -= 50;
	if (entity.stats.health <= 0) {
		entity.state.setState('Die');
	}

	return;
};

const towerCollider = (entity, target) => {
	entity.stats.health -= 50;
	if (entity.stats.health <= 0) {
		// entity.state.setState('Die');
	}

	return;
};

const projectileCollider = (entity, target) => {
	entity.stats.health -= 50;
	if (entity.stats.health <= 0) {
		entity.state.setState('Hit');
	}

	return;
};

const throneCollider = (entity, target) => {
	entity.stats.health -= 50;
	if (entity.stats.health <= 0) {
		entity.state.setState('Die');
	}

	return;
};

const getCollider = (name) => {
	const enemies = ['enemy1', 'enemy2', 'enemy3'];
	const towers = ['blueTower'];
	const projectiles = ['projectile'];
	const throne = ['throne'];

	if (enemies.includes(name)) return enemyCollider;
	if (towers.includes(name)) return towerCollider;
	if (projectiles.includes(name)) return projectileCollider;
	if (throne.includes(name)) return throneCollider;

	throw new Error(`No Collider found for ${name}`);
};

export const initEntity = (name, position, stateContext = {}) => {
	const config = getConfig(name);

	const onCollide = getCollider(name);

	return new Entity(name, position, config, stateContext, onCollide);
};

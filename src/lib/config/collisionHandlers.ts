import type { Entity } from '$lib/store/Entity.svelte';
import { managers } from '$lib/store/managers.svelte';
import { Vector2 } from '$lib/store/Vector2.svelte';
// import { onFire } from './effects';

const checkSameTarget = (projectile, other) => {
	const { type: spawnerType } = projectile.state.context.spawner;
	const { type: targetType } = other;
	return spawnerType === targetType;
};

const checkBounds = (entity, other) => {
	const entityManager = managers.get('entityManager');

	if (other === 'OUT_OF_BOUNDS') {
		entityManager.destroy(entity.id);
		return true;
	}

	return false;
};

export const enemyCollider = (entity: Entity, other: Entity) => {
	if ((other.type === 'projectile' && checkSameTarget(other, entity)) || other.type === 'enemy') {
		return;
	}

	entity.takeDamage(other.stats.damage);
};

export const towerCollider = (tower, other) => {
	if (other.type === 'projectile' && checkSameTarget(other, tower)) {
		return;
	}

	tower.stats.health -= other.stats.damage;
	if (tower.stats.health <= 0) {
		tower.state.setState('Die');
	}

	return;
};

export const fireballCollider = (fireball, other) => {
	if (checkBounds(fireball, other)) return;
	if (checkSameTarget(fireball, other)) return;

	fireball.state.setState('Explode');
	// other.addVFX('OnFire');
	// other.addEffect(onFire);
};

export const projectileCollider = (projectile, other) => {
	if (other === 'OUT_OF_BOUNDS') {
		projectile.stopInteractions();
	}

	if (checkSameTarget(projectile, other)) {
		return;
	}

	const { type: spawnerType } = projectile.state.context.spawner;

	if (spawnerType !== 'throne') {
		projectile.state.setState('Die');
	}

	return;
};

export const throneCollider = (entity, other) => {
	const { spawner } = other.state.context;

	if (other.type === 'loot') {
		entity.stats.health = Math.min(entity.stats.health + 5, 500);
		managers.get('entityManager').destroy(other.id);

		// add vfx
	} else if (other.type === 'enemy') {
		entity.takeDamage(other.stats.damage);
	}

	return;
};

export const lootCollider = (entity, other) => {
	// console.log('COLLIDE///', entity.id);
	entity.stopInteractions();
	managers.get('entityManager').destroy(entity.id);

	// if (other.type === 'throne') {
	// 	managers.get('entityManager').destroy(entity.id);
	// }
};

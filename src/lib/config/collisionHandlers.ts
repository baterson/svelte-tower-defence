import type { Entity } from '$lib/store/Entity.svelte';
import { managers } from '$lib/store/managers.svelte';
import { Vector2 } from '$lib/store/Vector2.svelte';

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
	entity.takeDamage(other.stats.damage);
};

export const fireballCollider = (fireball, other) => {
	fireball.state.setState('Explode');
};

export const projectileCollider = (projectile, other) => {
	if (other === 'OUT_OF_BOUNDS') {
		projectile.stopInteractions();
		managers.get('entityManager').destroy(entity.id);
	} else {
		projectile.state.setState('Explode');
	}

	return;
};

export const throneCollider = (entity, other) => {
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
	entity.stopInteractions();
	managers.get('entityManager').destroy(entity.id);
};

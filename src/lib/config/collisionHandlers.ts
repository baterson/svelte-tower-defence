import type { Entity } from '$store/Entity.svelte';

const checkSameTarget = (projectile, other) => {
	const { type: spawnerType } = projectile.state.context.spawner;
	const { type: targetType } = other;
	return spawnerType === targetType;
};

export const enemyCollider = (entity: Entity, other: Entity) => {
	if ((other.type === 'projectile' && checkSameTarget(other, entity)) || other.type === 'enemy') {
		return;
	}

	entity.stats.health -= other.stats.damage;

	if (entity.stats.health <= 0) {
		entity.state.setState('Die');
	}
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

export const projectileCollider = (projectile, other) => {
	if (other === 'OUT_OF_BOUNDS') {
		projectile.stopInteractions();
	}

	if (checkSameTarget(projectile, other)) {
		return;
	}

	projectile.state.setState('Hit');

	return;
};

export const throneCollider = (entity, other) => {
	if (other.type === 'loot') {
		entity.scale += 0.1;
	}
	return;
};

export const lootCollider = (entity, other) => {
	if (other.type === 'throne') {
		entity.state.setState('Die');
	}
	return;
};

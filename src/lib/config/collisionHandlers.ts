import type { Entity } from '$store/Entity.svelte';
import { gameLoop } from '$store/GameLoop.svelte';

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
		entity.addEffect('ParcticalEffect');
	}
};

export const towerCollider = (tower, other) => {
	if (other.type === 'projectile' && checkSameTarget(other, tower)) {
		return;
	}

	tower.stats.health -= other.stats.damage;
	tower.state.setState('TakeDamage');
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
	const { spawner } = other.state.context;

	if (other.type === 'loot' && spawner.type === 'enemy') {
		entity.scale += 0.1;
		entity.health += 20;
		entity.addEffect('TowerEffectMedium');
	}

	return;
};

export const lootCollider = (entity, other) => {
	const { spawner } = entity.state.context;

	if (spawner.type === 'throne' && other.type === 'tower') {
		entity.state.setState('Die');
		other.upgrade();
		return;
	}

	if (spawner.type === 'enemy' && other.type === 'throne') {
		entity.state.setState('Die');
		return;
	}

	if (spawner.type === 'throne' && other.type === 'tower') {
		entity.state.setState('Die');
		return;
	}
};

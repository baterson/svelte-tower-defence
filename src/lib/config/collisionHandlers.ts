import type { Entity } from '$store/Entity.svelte';
import { managers } from '$store/managers.svelte';
import { onFire } from './effects';

const checkSameTarget = (projectile, other) => {
	const { type: spawnerType } = projectile.state.context.spawner;
	const { type: targetType } = other;
	return spawnerType === targetType;
};

const checkBounds = (entity, other) => {
	const entityManager = managers.getManager('entityManager');

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
	tower.addEffect('TakeDamage');
	if (tower.stats.health <= 0) {
		tower.state.setState('Die');
	}

	return;
};

export const fireballCollider = (fireball, other) => {
	if (checkBounds(fireball, other)) return;
	if (checkSameTarget(fireball, other)) return;

	other.addVFX('OnFire');
	other.addEffect(onFire);
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
		projectile.state.setState('Hit');
	}

	return;
};

export const throneCollider = (entity, other) => {
	const { spawner } = other.state.context;

	if (other.type === 'loot' && spawner.type === 'enemy') {
		// entity.scale += 0.1;
		entity.health += 20;
		entity.addEffect('TowerEffectMedium');
	}

	return;
};

export const lootCollider = (entity, other) => {
	const { spawner } = entity.state.context;

	if (spawner.type === 'throne' && other.type === 'tower') {
		entity.state.setState('Die');
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

import type { Entity } from '$store/Entity.svelte';

export const enemyCollider = (entity: Entity, target: Entity) => {
	// Handle wall collisions

	// Handle other collisions
	if (target.type === 'projectile') {
		entity.stats.health -= target.stats.damage;
		if (entity.stats.health <= 0) {
			entity.state.setState('Die');
		}
	}

	if (target.type === 'throne') {
		entity.state.setState('Die');
	}

	if (target.type === 'wall') {
		// Return to previous position before collision
		entity.position = entity.prevPosition.clone();
		return;
	}
};

export const towerCollider = (entity, target) => {
	entity.stats.health -= 10;
	if (entity.stats.health <= 0) {
		entity.state.setState('Die');
	}

	return;
};

export const projectileCollider = (entity, target) => {
	entity.stats.health -= 50;
	if (entity.stats.health <= 0) {
		entity.state.setState('Hit');
	}

	return;
};

export const throneCollider = (entity, target) => {
	// entity.stats.health -= 50;
	// if (entity.stats.health <= 0) {
	// 	entity.state.setState('Die');
	// }
	return;
};

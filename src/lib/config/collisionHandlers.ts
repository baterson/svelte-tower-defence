import type { Entity } from '$store/Entity.svelte';

export const enemyCollider = (entity: Entity, target: Entity) => {
	// Handle wall collisions

	// Handle other collisions
	if (target.type === 'projectile' && target.state.currentState.context.target.type !== 'tower') {
		entity.stats.health -= target.stats.damage;
		if (entity.stats.health <= 0) {
			entity.state.setState('Die');
		}
	}

	if (target.type === 'throne') {
		entity.state.setState('Die');
	}
};

export const towerCollider = (tower, target) => {
	tower.stats.health -= 25;
	if (tower.stats.health <= 0) {
		tower.state.setState('Die');
	}

	return;
};

export const projectileCollider = (projectile, target) => {
	// debugger;
	console.log('projectileCollider', projectile.state.currentState.context.target.type, target.type);

	if (target.type !== projectile.state.currentState.context.target.type) {
		return;
	} else {
		projectile.state.setState('Hit');
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

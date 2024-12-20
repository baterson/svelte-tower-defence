/**
 * EnemyStates.ts
 * State classes for enemy behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import type { Enemy } from '$store/Entities/Enemy.svelte';
import type { EntityManager } from '$store/EntityManager.svelte';
import { Vector2 } from '$store/Vector2.svelte';

export class Shoot extends BaseState {
	update(deltaTime: number, enemy: Enemy, entityManager: EntityManager) {
		const towers = entityManager.builtTowers;

		const nearestTower = towers.length
			? towers.reduce((nearest, tower) => {
					const currentDist = enemy.position.distance(tower.position);
					const nearestDist = enemy.position.distance(nearest.position);
					return currentDist < nearestDist ? tower : nearest;
				}, towers[0])
			: null;

		// Attack the tower
		if (nearestTower) {
			entityManager.spawnProjectile('projectile1', enemy, nearestTower);
		}
		enemy.state.setState('Run');
	}
}

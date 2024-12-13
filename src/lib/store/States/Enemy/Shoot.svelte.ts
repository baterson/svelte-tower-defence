/**
 * EnemyStates.ts
 * State classes for enemy behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import type { Enemy } from '$store/Entities/Enemy.svelte';
import { distance } from '$utils/math';
// import { Vector2 } from '$store/Vector2.svelte';
import type { EntityManager } from '$store/EntityManager.svelte';

export class Shoot extends BaseState {
	update(deltaTime: number, enemy: Enemy, entityManager: EntityManager) {
		const towers = entityManager.builtTowers;

		const nearestTower = towers.length
			? towers.reduce((nearest, tower) => {
					const currentDist = distance(enemy.position, tower.position);
					const nearestDist = distance(enemy.position, nearest.position);
					return currentDist < nearestDist ? tower : nearest;
				}, towers[0])
			: null;

		// Attack the tower
		if (nearestTower) {
			entityManager.spawnProjectile(enemy, nearestTower);
		}
		enemy.state.setState('Run');
	}
}

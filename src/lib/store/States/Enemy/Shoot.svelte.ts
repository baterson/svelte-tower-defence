/**
 * EnemyStates.ts
 * State classes for enemy behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import type { EntityPool } from '$lib/store/EntityPool.svelte';
import type { Enemy } from '$store/Entities/Enemy.svelte';
import { distance } from '$utils/math';
import { Vector2 } from '$store/Vector2.svelte';

export class Shoot extends BaseState {
	update(deltaTime: number, enemy: Enemy, entityPool: EntityPool) {
		if (this.transitioning) {
			return;
		}
		// Check health first
		enemy.state.setState('Run');

		const towers = entityPool.towers;
		const nearestTower = towers.length
			? towers.reduce((nearest, tower) => {
					const currentDist = distance(enemy.position, tower.position);
					const nearestDist = distance(enemy.position, nearest.position);
					return currentDist < nearestDist ? tower : nearest;
				}, towers[0])
			: null;

		// console.log('nearestTower', nearestTower);

		// const dist = distance(enemy.position, nearestTower.position);

		// Attack the tower
		entityPool.spawnProjectile(new Vector2(enemy.position.x, enemy.position.y), nearestTower);
		enemy.state.setState('Run');
	}
}

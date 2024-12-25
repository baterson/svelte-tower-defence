/**
 * EnemyStates.ts
 * State classes for enemy behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import type { Enemy } from '$store/Entities/Enemy.svelte';
import { managers } from '$store/managers.svelte';

export class Shoot extends BaseState {
	update(deltaTime: number, enemy: Enemy) {
		const entityManager = managers.getManager('entityManager');
		const stageManager = managers.getManager('stageManager');

		const towers = entityManager.livingTowers;

		const nearestTower = towers.length
			? towers.reduce((nearest, tower) => {
					const currentDist = enemy.position.distance(tower.position);
					const nearestDist = enemy.position.distance(nearest.position);
					return currentDist < nearestDist ? tower : nearest;
				}, towers[0])
			: null;

		// Attack the tower
		if (nearestTower) {
			stageManager.spawnEntity('fireball', enemy.position.clone(), {
				spawner: enemy,
				target: nearestTower
			});
		}
		enemy.state.setState('Run');
	}
}

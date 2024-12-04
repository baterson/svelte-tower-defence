/**
 * EnemyStates.ts
 * State classes for enemy behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import type { EntityPool } from '$lib/store/EntityPool.svelte';
import type { Enemy } from '$store/Entities/Enemy.svelte';
import { distance } from '$utils/math';

export class Shoot extends BaseState {
	update(deltaTime: number, enemy: Enemy, entityPool: EntityPool) {
		// Check health first
		if (enemy.health <= 0) {
			enemy.state.setState('Death');
			return;
		}

		const currentTime = Date.now();
		const attackCooldown = 1000 / enemy.stats.attackSpeed;

		if (currentTime - enemy.lastAttack < attackCooldown) {
			return;
		}

		const towers = entityPool.towers;
		const nearestTower = towers.length
			? towers.reduce((nearest, tower) => {
					const currentDist = distance(enemy.position, tower.position);
					const nearestDist = distance(enemy.position, nearest.position);
					return currentDist < nearestDist ? tower : nearest;
				}, towers[0])
			: null;

		if (!nearestTower) {
			enemy.state.setState('Run');
			return;
		}

		const dist = distance(enemy.position, nearestTower.position);
		if (dist > enemy.stats.range) {
			enemy.state.setState('Run');
			return;
		}

		// Attack the tower
		enemy.lastAttack = currentTime;
		entityPool.spawnProjectile(enemy.position, nearestTower, enemy.stats.damage);
	}
}

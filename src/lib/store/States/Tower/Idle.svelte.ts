/**
 * Tower state machine states
 * @module TowerStates
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import { Vector2 } from '$lib/store/Vector2.svelte';
import { distance } from '$utils/math';

export class Idle extends BaseState {
	update(deltaTime: number, tower: any, entityPool: any) {
		// Check attack cooldown
		const currentTime = Date.now();
		const attackCooldown = 1000 / tower.stats.attackSpeed;

		if (currentTime - tower.lastAttack < attackCooldown) {
			return;
		}

		// Find target in range
		if (entityPool.enemies.length > 0) {
			const target = entityPool.getNearestEntityOfType(tower.position, 'enemy', tower.stats.range);

			if (target) {
				tower.state.setState('Shoot');
				tower.lastAttack = currentTime;

				// Create projectile at tower's center
				const projectilePosition = new Vector2(
					tower.position.x + tower.width / 2,
					tower.position.y + tower.height / 2
				);

				entityPool.spawnProjectile(projectilePosition, target, tower.stats.damage);
			}
		}
	}
}

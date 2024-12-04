/**
 * TowerStates.ts
 * State classes for tower behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import { findNearestEntity } from '$utils/math';

export class Idle extends BaseState {
	update(deltaTime, tower, entityPool) {
		const currentTime = Date.now();
		const attackCooldown = 1000 / tower.stats.attackSpeed;

		if (currentTime - tower.lastAttack < attackCooldown) {
			return;
		}

		if (entityPool.enemies.length > 0) {
			const target = findNearestEntity(tower.position, entityPool.enemies);
			if (target) {
				tower.state.setState('Shoot');
				tower.lastAttack = currentTime;

				const projectilePosition = {
					x: tower.position.x + tower.width / 2,
					y: tower.position.y + tower.height / 2
				};

				entityPool.spawnProjectile(projectilePosition, target, tower.stats.damage);
			}
		}
	}
}

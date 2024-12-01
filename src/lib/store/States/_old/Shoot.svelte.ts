import { BaseState } from '../BaseState.svelte';
import type { Enemy } from '$store/Entities/Enemy.svelte';
import { distance } from '$utils/math';

export class Shoot extends BaseState {
	update(deltaTime: number, enemy: Enemy) {
		const currentTime = Date.now();
		const attackCooldown = 1000 / enemy.stats.attackSpeed;

		if (currentTime - enemy.lastAttack < attackCooldown) {
			return;
		}

		const nearestTower = enemy.findNearestTower();
		if (!nearestTower) {
			enemy.state.setState('run');
			return;
		}

		const dist = distance(enemy.position, nearestTower.position);
		if (dist > enemy.stats.range) {
			enemy.state.setState('run');
			return;
		}

		// Attack the tower
		enemy.lastAttack = currentTime;
		enemy.pool.spawnProjectile(enemy.position, nearestTower, enemy.stats.damage);
	}
}

import { BaseState } from '../BaseState.svelte';
import type { Enemy } from '$store/Entities/Enemy.svelte';
import { distance } from '$utils/math';

export class Run extends BaseState {
	update(deltaTime: number, enemy: Enemy) {
		const speed = enemy.stats.speed * deltaTime;
		enemy.position.y += speed;

		// Check if should transition to shoot state
		const nearestTower = enemy.findNearestTower();
		if (nearestTower) {
			const dist = distance(enemy.position, nearestTower.position);
			if (dist <= enemy.stats.range) {
				enemy.state.setState('Shoot');
			}
		}
	}
}

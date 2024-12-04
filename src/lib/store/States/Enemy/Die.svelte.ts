/**
 * EnemyStates.ts
 * State classes for enemy behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import type { EntityPool } from '$lib/store/EntityPool.svelte';
import type { Enemy } from '$store/Entities/Enemy.svelte';
import { distance } from '$utils/math';

export class Die extends BaseState {
	private deathDelay = 600; // Duration of death animation
	private startTime: number | null = null;

	update(deltaTime: number, enemy: Enemy, entityPool: EntityPool) {
		if (this.startTime === null) {
			this.startTime = Date.now();
		}

		const elapsedTime = Date.now() - this.startTime;

		// Update opacity based on time
		enemy.opacity = Math.max(0, 1 - elapsedTime / this.deathDelay);

		if (elapsedTime >= this.deathDelay) {
			enemy.isDestroyed = true;
			entityPool.remove(enemy.id);
		}
	}
}

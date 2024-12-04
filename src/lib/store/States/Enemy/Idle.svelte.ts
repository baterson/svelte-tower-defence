/**
 * EnemyStates.ts
 * State classes for enemy behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import type { EntityPool } from '$lib/store/EntityPool.svelte';
import type { Enemy } from '$store/Entities/Enemy.svelte';

export class Idle extends BaseState {
	update(deltaTime: number, enemy: Enemy, entityPool: EntityPool) {
		// Check health
		if (enemy.health <= 0) {
			enemy.state.setState('Death');
			return;
		}

		// Transition to run after short delay
		setTimeout(() => {
			if (enemy.health > 0) {
				enemy.state.setState('Run');
			}
		}, 500);
	}
}

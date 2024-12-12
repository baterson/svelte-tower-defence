/**
 * Tower state machine states
 * @module TowerStates
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';

export class Idle extends BaseState {
	update(deltaTime: number, tower: any, entityPool: any) {
		const target = entityPool.getNearestEntityOfType(tower.position, 'enemy', tower.stats.range);

		if (target) {
			tower.state.setState('Shoot', { target });
		}
	}
}

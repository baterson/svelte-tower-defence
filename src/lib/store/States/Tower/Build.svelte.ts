/**
 * TowerStates.ts
 * State classes for tower behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';

export class Build extends BaseState {
	update(deltaTime, tower, entityPool) {
		if (tower.sprite.isAnimationComplete) {
			tower.state.setState('Idle');
		}
	}
}

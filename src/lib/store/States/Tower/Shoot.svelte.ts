/**
 * TowerStates.ts
 * State classes for tower behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';

export class Shoot extends BaseState {
	update(deltaTime, tower, entityPool) {
		// Return to idle state after shoot animation
		setTimeout(() => {
			tower.state.setState('Idle');
		}, 1000); // Duration of shoot animation
	}
}

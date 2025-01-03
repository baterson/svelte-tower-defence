/**
 * TowerStates.ts
 * State classes for tower behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';

export class Build extends BaseState {
	update(deltaTime) {
		if (this.entity.animation.isComplete) {
			this.entity.state.setState('Guard');
		}
	}
}

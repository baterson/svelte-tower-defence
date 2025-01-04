/**
 * TowerStates.ts
 * State classes for tower behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import { managers } from '$store/managers.svelte';

export class Build extends BaseState {
	update(deltaTime) {
		if (this.entity.animation.isComplete) {
			this.entity.state.setState('Guard');
		}
	}
}

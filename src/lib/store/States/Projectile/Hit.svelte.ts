/**
 * ProjectileStates.ts
 * State classes for projectile behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';

export class Hit extends BaseState {
	constructor(stateMachine) {
		super(stateMachine);

		stateMachine.owner.stopInteractions();
	}
}

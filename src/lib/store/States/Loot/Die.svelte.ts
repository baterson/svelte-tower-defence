/**
 * Projectile state machine states
 * @module ProjectileStates
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import { managers } from '$store/managers.svelte';
export class Die extends BaseState {
	constructor(stateMachine) {
		super(stateMachine);

		const entityManager = managers.getManager('entityManager');

		entityManager.destroy(this.entity.id);
	}
}

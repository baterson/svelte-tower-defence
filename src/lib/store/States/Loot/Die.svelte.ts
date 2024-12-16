/**
 * Projectile state machine states
 * @module ProjectileStates
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import { entityManager } from '$store/EntityManager.svelte';

export class Die extends BaseState {
	constructor(stateMachine) {
		super(stateMachine);

		entityManager.destroy(this.entity.id);
	}
}

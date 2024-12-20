/**
 * ProjectileStates.ts
 * State classes for projectile behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import { entityManager } from '$store/EntityManager.svelte';

export class Hit extends BaseState {
	constructor(stateMachine) {
		super(stateMachine);
		entityManager.destroy(this.entity.id);
	}
}

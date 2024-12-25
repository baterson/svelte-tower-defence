/**
 * ProjectileStates.ts
 * State classes for projectile behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import { managers } from '$store/managers.svelte';

export class Die extends BaseState {
	constructor(stateMachine) {
		super(stateMachine);
		const entityManager = managers.get('entityManager');
		entityManager.destroy(this.entity.id);
	}
}

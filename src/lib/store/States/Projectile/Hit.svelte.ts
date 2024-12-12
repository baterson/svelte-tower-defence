/**
 * ProjectileStates.ts
 * State classes for projectile behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import type { EntityPool } from '$store/EntityPool.svelte';

export class Hit extends BaseState {
	constructor(stateMachine, context = {}) {
		super(stateMachine, context);

		stateMachine.owner.stopInteractions();
	}

	update(deltaTime: number, projectile, entityPool: EntityPool) {
		projectile.destroy();
	}
}

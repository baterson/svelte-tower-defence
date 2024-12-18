/**
 * Tower state machine states
 * @module TowerStates
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import { entityManager } from '$store/EntityManager.svelte';

export class Shoot extends BaseState {
	constructor(stateMachine) {
		super(stateMachine);

		const { spawner, target } = this.stateMachine.context;
		// console.log(target);

		entityManager.spawnProjectile(spawner, target);
	}

	update(deltaTime: number) {
		if (this.entity.sprite.isAnimationComplete) {
			this.entity.state.setState('Guard');
		}
	}
}

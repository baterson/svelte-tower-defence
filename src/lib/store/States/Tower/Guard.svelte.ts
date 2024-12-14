/**
 * TowerStates.ts
 * State classes for tower behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import { entityManager } from '$store/EntityManager.svelte';
import { TimeManager } from '$store/TimeManager.svelte';

export class Guard extends BaseState {
	timeManager = $state();

	constructor(stateMachine) {
		super(stateMachine);

		this.timeManager = new TimeManager();

		this.timeManager.setTimer(this.trackEnemy, 400, true);
	}

	update(deltaTime) {
		this.timeManager.update(deltaTime);
	}

	// todo: add cd for enemy track to avoid infinite projectile spawn
	trackEnemy = (deltaTime) => {
		// this.timeManager.update(deltaTime);

		const target = entityManager.getNearestEntityOfType(this.entity.position, 'enemy');

		console.log('target', target);

		if (target) {
			this.stateMachine.setState('Shoot', { spawner: this.entity, target });
		}
	};
}

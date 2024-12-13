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

		// this.timeManager.setTimer(this.trackEnemy, 1000);
	}

	update(deltaTime, tower) {
		this.trackEnemy(deltaTime);
	}

	// todo: add cd for enemy track to avoid infinite projectile spawn
	trackEnemy(deltaTime) {
		const target = entityManager.getNearestEntityOfType(this.entity.position, 'enemy');
		if (target) {
			this.stateMachine.setState('Shoot', { spawner: this.entity, target });
		}
	}
}

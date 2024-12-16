/**
 * TowerStates.ts
 * State classes for tower behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import { entityManager } from '$store/EntityManager.svelte';
import { gameLoop } from '$store/GameLoop.svelte';

export class Guard extends BaseState {
	timeManager = $state();

	constructor(stateMachine) {
		super(stateMachine);

		this.cdId = gameLoop.setCD(400, true);
	}

	update(deltaTime, elapsedTime) {
		const target = entityManager.getNearestEntityOfType(this.entity.position, 'enemies');

		if (gameLoop.isCDReady(this.cdId) && target) {
			this.stateMachine.setState('Shoot', { spawner: this.entity, target });
		}
	}
}

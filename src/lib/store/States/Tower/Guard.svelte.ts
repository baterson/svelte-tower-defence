/**
 * TowerStates.ts
 * State classes for tower behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import { entityManager } from '$store/EntityManager.svelte';
import { gameLoop } from '$store/GameLoop.svelte';

export class Guard extends BaseState {
	constructor(stateMachine) {
		super(stateMachine);

		const atackSpeed = this.entity.stats.attackSpeed;

		this.cdId = gameLoop.setCD(atackSpeed, true);
	}

	update() {
		const target = entityManager.findNearestEntity(this.entity, entityManager.livingEnemies);

		if (gameLoop.isCDReady(this.cdId) && target) {
			this.stateMachine.setState('Shoot', { spawner: this.entity, target });
		}
	}
}

/**
 * TowerStates.ts
 * State classes for tower behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import { managers } from '$lib/store/managers.svelte';
export class Guard extends BaseState {
	constructor(stateMachine) {
		super(stateMachine);

		const gameLoop = managers.get('gameLoop');

		const atackSpeed = this.entity.stats.attackSpeed;

		this.cdId = gameLoop.setCD(atackSpeed, true);
	}

	update() {
		const { entityManager, gameLoop } = managers.get(['entityManager', 'gameLoop']);

		const target = entityManager.findNearestEntity(this.entity, entityManager.enemies);

		if (gameLoop.isCDReady(this.cdId) && target) {
			this.stateMachine.setState('Shoot', { spawner: this.entity, target });
		}
	}
}

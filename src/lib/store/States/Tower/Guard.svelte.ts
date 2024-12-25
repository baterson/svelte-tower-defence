/**
 * TowerStates.ts
 * State classes for tower behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import { managers } from '$store/managers.svelte';
export class Guard extends BaseState {
	constructor(stateMachine) {
		super(stateMachine);

		const gameLoop = managers.getManager('gameLoop');

		const atackSpeed = this.entity.stats.attackSpeed;

		this.cdId = gameLoop.setCD(atackSpeed, true);
	}

	update() {
		const entityManager = managers.getManager('entityManager');
		const gameLoop = managers.getManager('gameLoop');

		const target = entityManager.findNearestEntity(this.entity, entityManager.livingEnemies);

		if (gameLoop.isCDReady(this.cdId) && target) {
			this.stateMachine.setState('Shoot', { spawner: this.entity, target });
		}
	}
}

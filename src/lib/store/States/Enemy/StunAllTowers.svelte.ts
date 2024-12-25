/**
 * EnemyStates.ts
 * State classes for enemy behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import { managers } from '$store/managers.svelte';

export class StunAllTowers extends BaseState {
	cdId;

	constructor(stateMachine) {
		super(stateMachine);

		const gameLoop = managers.get('gameLoop');
		this.cdId = gameLoop.setCD(2000, true);
	}

	update(deltaTime: number) {
		const { entityManager, stageManager, gameLoop } = managers.get([
			'entityManager',
			'stageManager',
			'gameLoop'
		]);

		this.entity.scale += 0.003;

		if (gameLoop.isCDReady(this.cdId)) {
			entityManager.towers.forEach((tower) => {
				stageManager.spawnEntity('projectileStun', this.entity.position.clone(), {
					spawner: this.entity,
					target: tower
				});
			});
		}
	}
}

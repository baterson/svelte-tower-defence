/**
 * EnemyStates.ts
 * State classes for enemy behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import { entityManager } from '$store/EntityManager.svelte';
import { gameLoop } from '$store/GameLoop.svelte';
import { stageManager } from '$store/StageManager.svelte';

export class StunAllTowers extends BaseState {
	cdId;

	constructor(stateMachine) {
		super(stateMachine);

		this.cdId = gameLoop.setCD(2000, true);
	}

	update(deltaTime: number) {
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

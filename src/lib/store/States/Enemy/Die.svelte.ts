/**
 * EnemyStates.ts
 * State classes for enemy behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import { degToRad } from '$utils/math';
import { gameLoop } from '$store/GameLoop.svelte';
import { entityManager } from '$store/EntityManager.svelte';

export class Die extends BaseState {
	private readonly ROTATION_SPEED = 2;
	private readonly TARGET_ROTATION = 90;

	constructor(stateMachine) {
		super(stateMachine);

		stateMachine.owner.stopInteractions();
		if (Math.random() > 0.5) {
			entityManager.spawnLoot(stateMachine.owner);
		}
	}

	update(deltaTime: number) {
		this.entity.rotation =
			Math.min(
				this.entity.rotation + degToRad(this.ROTATION_SPEED),
				degToRad(this.TARGET_ROTATION)
			) * 30;
	}
}

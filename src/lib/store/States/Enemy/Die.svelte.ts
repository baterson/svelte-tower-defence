/**
 * EnemyStates.ts
 * State classes for enemy behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import { degToRad } from '$utils/math';
import { entityManager } from '$store/EntityManager.svelte';

export class Die extends BaseState {
	private readonly ROTATION_SPEED = 10;
	private readonly TARGET_ROTATION = 90;

	constructor(stateMachine) {
		super(stateMachine);

		stateMachine.owner.stopInteractions();
	}

	update(deltaTime: number) {
		this.entity.rotation += 10;

		if (this.entity.sprite.isAnimationComplete) {
			entityManager.destroy(this.entity.id);

			if (Math.random() > 0.5) {
				entityManager.spawnLoot(this.entity);
			}
		}
	}
}

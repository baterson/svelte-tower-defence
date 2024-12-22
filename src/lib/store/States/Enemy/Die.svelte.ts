/**
 * EnemyStates.ts
 * State classes for enemy behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import { entityManager } from '$store/EntityManager.svelte';
import { stageManager } from '$store/StageManager.svelte';

export class Die extends BaseState {
	constructor(stateMachine) {
		super(stateMachine);

		stateMachine.owner.stopInteractions();
	}

	update(deltaTime: number) {
		this.entity.rotation += 10;

		if (this.entity.sprite.isAnimationComplete) {
			entityManager.destroy(this.entity.id);

			if (1) {
				stageManager.spawnEntity('loot', this.entity.position.clone(), {
					target: entityManager.throne,
					spawner: this.entity
				});
			}
		}
	}
}

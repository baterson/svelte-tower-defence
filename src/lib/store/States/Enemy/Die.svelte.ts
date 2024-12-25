/**
 * EnemyStates.ts
 * State classes for enemy behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import { managers } from '$store/managers.svelte';
export class Die extends BaseState {
	constructor(stateMachine) {
		super(stateMachine);

		stateMachine.owner.stopInteractions();
	}

	update() {
		this.entity.rotation += 10;

		if (this.entity.sprite.isAnimationComplete) {
			const entityManager = managers.getManager('entityManager');
			const stageManager = managers.getManager('stageManager');

			entityManager.destroy(this.entity.id);

			if (1) {
				// stageManager.spawnEntity('loot', this.entity.position.clone(), {
				// 	target: entityManager.throne,
				// 	spawner: this.entity
				// });
			}
		}
	}
}

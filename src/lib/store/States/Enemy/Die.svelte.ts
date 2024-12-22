/**
 * EnemyStates.ts
 * State classes for enemy behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import { entityManager } from '$store/EntityManager.svelte';

export class Die extends BaseState {
	constructor(stateMachine) {
		super(stateMachine);

		stateMachine.owner.stopInteractions();
	}

	update(deltaTime: number, enemy: Entity) {
		this.entity.rotation += 10;

		if (this.entity.sprite.isAnimationComplete) {
			entityManager.destroy(this.entity.id);

			if (Math.random() > 0.5) entityManager.spawnLoot('loot', this.entity, entityManager.throne);

			if (Math.random() > 0.5) {
				entityManager.spawnLoot('loot', this.entity, entityManager.throne);
			}
		}
	}
}

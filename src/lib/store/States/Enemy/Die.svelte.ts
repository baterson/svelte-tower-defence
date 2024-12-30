import { managers } from '$store/managers.svelte';
import { BaseState } from '../BaseState.svelte';

export class Die extends BaseState {
	constructor(stateMachine) {
		super(stateMachine);

		stateMachine.owner.stopInteractions();
	}

	update() {
		if (this.entity.animation && this.entity.animation.isComplete) {
			const { entityManager, stageManager } = managers.get(['entityManager', 'stageManager']);

			// stageManager.spawnEntity('loot', this.entity.position.clone(), {
			// 	target: entityManager.throne,
			// 	spawner: this.entity
			// });
			entityManager.destroy(this.entity.id);
		}
	}
}

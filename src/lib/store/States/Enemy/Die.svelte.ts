import { BaseState } from '$lib/store/States/BaseState.svelte';
import { managers } from '$store/managers.svelte';

export class Die extends BaseState {
	constructor(stateMachine) {
		super(stateMachine);

		stateMachine.owner.stopInteractions();
	}

	update() {
		if (!this.entity.animation || (this.entity.animation && this.entity.animation.isComplete)) {
			const entityManager = managers.get('entityManager');
			entityManager.destroy(this.entity.id);
		}
	}
}

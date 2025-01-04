import { BaseState } from '$lib/store/States/BaseState.svelte';
import { managers } from '$lib/store/managers.svelte';

export class Explode extends BaseState {
	constructor(stateMachine) {
		super(stateMachine);

		this.entity.removeCollider();
		this.entity.width = 40;
		this.entity.height = 40;
		// todo scale with explossion
		this.entity.scale += 1;

		stateMachine.owner.stopInteractions();
	}

	update() {
		if (!this.entity.animation || (this.entity.animation && this.entity.animation.isComplete)) {
			const entityManager = managers.get('entityManager');
			entityManager.destroy(this.entity.id);
		}
	}
}

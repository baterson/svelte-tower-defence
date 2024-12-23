import { BaseState } from '$lib/store/States/BaseState.svelte';
import { entityManager } from '$store/EntityManager.svelte';

const chargeSpeed = 1;

export class Charge extends BaseState {
	constructor(stateMachine) {
		super(stateMachine);
	}

	update(deltaTime: number) {
		const target = entityManager.findNearestEntity(this.entity, entityManager.livingTowers);
		if (!target) return;

		const distance = this.entity.position.distance(target.position);

		if (distance <= 15) {
			this.stateMachine.setState('MeleAttack');
			return;
		}

		const direction = target.position.subtract(this.entity.position).normalize();
		this.entity.position.x += direction.x * chargeSpeed * deltaTime;
		this.entity.position.y += direction.y * chargeSpeed * deltaTime;

		this.entity.rotation = Math.atan2(direction.y, direction.x);
	}
}

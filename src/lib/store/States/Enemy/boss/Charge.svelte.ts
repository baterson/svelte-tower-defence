import { BaseState } from '$lib/store/States/BaseState.svelte';
import { entityManager } from '$store/EntityManager.svelte';
export class Charge extends BaseState {
	constructor(stateMachine, context) {
		super(stateMachine);
		this.chargeSpeed = 1;
	}
	update(deltaTime: number, enemy: Entity) {
		const target = entityManager.getNearestTowerLiving(this.entity.position, 'towers');
		if (!target) return;

		const distance = enemy.position.distance(target.position);

		if (distance <= 15) {
			this.stateMachine.setState('MeleAttack');
			return;
		}

		const direction = target.position.subtract(enemy.position).normalize();
		enemy.position.x += direction.x * this.chargeSpeed * deltaTime;
		enemy.position.y += direction.y * this.chargeSpeed * deltaTime;

		enemy.rotation = Math.atan2(direction.y, direction.x);
	}
}

import { BaseState } from '$store/States/BaseState.svelte';
import { Vector2 } from '$store/Vector2.svelte';

export class Walk extends BaseState {
	constructor(stateMachine) {
		super(stateMachine);
		this.currentDirection = new Vector2(0, 1);
	}
	update(deltaTime: number, enemy: Entity) {
		const speed = enemy.stats.speed * deltaTime;

		enemy.position.x += this.currentDirection.x * speed;
		enemy.position.y += this.currentDirection.y * speed;

		if (enemy.position.y > 100) {
			this.stateMachine.setState('RangeAttack');
		}
	}
}

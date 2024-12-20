import { BaseState } from '$lib/store/States/BaseState.svelte';
import { angleToTarget, getDirectionFromAngle } from '$utils/math';

export class Fly extends BaseState {
	direction;

	constructor(stateMachine) {
		super(stateMachine);

		const { target } = this.stateMachine.context;
		const angle = angleToTarget(this.entity.position, target.position);
		this.direction = getDirectionFromAngle(angle);
	}

	update(deltaTime: number) {
		const { target } = this.stateMachine.context;
		const speed = this.entity.stats.speed * deltaTime;

		this.entity.velocity = this.direction.multiply(speed);
		this.entity.position = this.entity.position.add(this.entity.velocity);
		this.entity.rotation = angleToTarget(this.entity.position, target.position);
	}
}

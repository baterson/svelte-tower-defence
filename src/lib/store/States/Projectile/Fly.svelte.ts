import { BaseState } from '$lib/store/States/BaseState.svelte';
import { angleToTarget, getDirectionFromAngle } from '$utils/math';

export class Fly extends BaseState {
	direction;

	constructor(stateMachine) {
		super(stateMachine);
		const { target, targetPoint } = this.stateMachine.context;
		const targetPosition = targetPoint || target?.position;

		const angle = angleToTarget(this.entity.position, targetPosition);
		this.direction = getDirectionFromAngle(angle);
	}

	update(deltaTime: number) {
		this.fly(deltaTime);
	}

	fly(deltaTime: number) {
		const { target, targetPoint } = this.stateMachine.context;
		const targetPosition = targetPoint || target?.position;
		const speed = this.entity.stats.speed * deltaTime;

		this.entity.velocity = this.direction.multiply(speed);
		this.entity.position = this.entity.position.add(this.entity.velocity);
		this.entity.rotation = angleToTarget(this.entity.position, targetPosition);
	}
}

import { BaseState } from '../BaseState.svelte';
import { Vector2 } from '$store/Vector2.svelte';
import { angleToTarget, getDirectionFromAngle } from '$utils/math';

export class RunToPoint extends BaseState {
	private direction: Vector2;

	constructor(stateMachine, stateContext = {}) {
		super(stateMachine, stateContext);

		const { targetPoint } = this.stateMachine.context;

		const angle = angleToTarget(this.entity.position, targetPoint);
		this.direction = getDirectionFromAngle(angle);
	}

	update(deltaTime: number) {
		const { targetPoint } = this.stateMachine.context;

		const speed = this.entity.stats.speed * deltaTime;

		this.entity.velocity = this.direction.multiply(speed);
		this.entity.position = this.entity.position.add(this.entity.velocity);
		this.entity.rotation = angleToTarget(this.entity.position, targetPoint);

		if (targetPoint.y <= this.entity.position.y) {
			this.stateMachine.setState('Idle');
		}
	}
}

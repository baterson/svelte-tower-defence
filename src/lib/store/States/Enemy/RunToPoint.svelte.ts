import { BaseState } from '../BaseState.svelte';
import { Vector2 } from '$store/Vector2.svelte';
import { angleToTarget, checkPointInRect, getDirectionFromAngle } from '$utils/math';

export class RunToPoint extends BaseState {
	private direction: Vector2;

	constructor(stateMachine, stateContext = {}) {
		super(stateMachine, stateContext);

		const { targetPosition } = this.stateMachine.context;

		const angle = angleToTarget(this.entity.position, targetPosition);
		this.direction = getDirectionFromAngle(angle);
	}

	update(deltaTime: number) {
		const { targetPosition } = this.stateMachine.context;

		const speed = this.entity.stats.speed * deltaTime;

		this.entity.velocity = this.direction.multiply(speed);
		this.entity.position = this.entity.position.add(this.entity.velocity);
		this.entity.rotation = angleToTarget(this.entity.position, targetPosition);

		if (checkPointInRect(targetPosition, this.entity.boundingBox)) {
			this.stateMachine.setState('StunAllTowers');
		}
	}
}

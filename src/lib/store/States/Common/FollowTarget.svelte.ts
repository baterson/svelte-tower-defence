import { BaseState } from '$lib/store/States/BaseState.svelte';
import { angleToTarget, getDirectionFromAngle } from '$utils/math';

export class FollowTarget extends BaseState {
	lastAngle = 0;

	update(deltaTime: number) {
		this.follow(deltaTime);
	}

	follow(deltaTime: number) {
		const { target } = this.stateMachine.context;
		const targetCenter = target.boundingBox.center;

		this.lastAngle = angleToTarget(this.entity.position, targetCenter);
		const direction = getDirectionFromAngle(this.lastAngle);

		const speed = this.entity.stats.speed * deltaTime;

		this.entity.velocity = direction.multiply(speed);
		this.entity.position = this.entity.position.add(this.entity.velocity);
		this.entity.rotation = this.lastAngle;
	}
}

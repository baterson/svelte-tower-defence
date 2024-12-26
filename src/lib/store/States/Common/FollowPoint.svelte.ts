import { BaseState } from '$lib/store/States/BaseState.svelte';
import { angleToTarget, getDirectionFromAngle } from '$utils/math';

export class FollowPoint extends BaseState {
	update(deltaTime: number) {
		this.follow(deltaTime);
	}

	follow(deltaTime: number) {
		const { targetPoint } = this.stateMachine.context;

		const angle = angleToTarget(this.entity.position, targetPoint);
		const direction = getDirectionFromAngle(angle);
		const speed = this.entity.stats.speed * deltaTime;

		this.entity.velocity = direction.multiply(speed);
		this.entity.position = this.entity.position.add(this.entity.velocity);
		this.entity.rotation = angle;
	}
}

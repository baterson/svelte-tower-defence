import { BaseState } from '$lib/store/States/BaseState.svelte';
import { angleToTarget, getDirectionFromAngle } from '$utils/math';

export class FollowThroughTarget extends BaseState {
	lastAngle = 0;

	update(deltaTime: number) {
		this.follow(deltaTime);
	}

	follow(deltaTime: number) {
		const { target } = this.stateMachine.context;
		const direction = getDirectionFromAngle(this.lastAngle);
		const speed = this.entity.stats.speed * deltaTime;
		const distance = this.entity.position.distance(target.position);

		if (distance < 10) {
			const targetPoint = target.position.add(getDirectionFromAngle(this.lastAngle).multiply(1000));

			this.stateMachine.setState('FollowPoint', {
				targetPoint
			});
		}

		this.lastAngle = angleToTarget(this.entity.position, target.position);

		this.entity.velocity = direction.multiply(speed);
		this.entity.position = this.entity.position.add(this.entity.velocity);
		this.entity.rotation = this.lastAngle;
	}
}

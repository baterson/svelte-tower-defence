import { BaseState } from '$lib/store/States/BaseState.svelte';
import { angleToTarget, getDirectionFromAngle } from '$lib/utils/math';

export class FollowThrone extends BaseState {
	lastAngle = 0;

	update(deltaTime: number) {
		this.follow(deltaTime);
	}

	follow(deltaTime: number) {
		const { throne } = this.stateMachine.context;

		const targetCenter = throne.boundingBox.center;

		this.entity.rotation = angleToTarget(this.entity.position, targetCenter);

		const direction = getDirectionFromAngle(this.entity.rotation);

		const velocity = direction.multiply(this.entity.stats.speed * deltaTime);

		this.entity.position = this.entity.position.add(velocity);
	}
}

import { BaseState } from '$lib/store/States/BaseState.svelte';
import { getDirectionFromAngle } from '$utils/math';

export class FollowAngle extends BaseState {
	update(deltaTime: number) {
		this.follow(deltaTime);
	}

	follow(deltaTime: number) {
		const { angle } = this.stateMachine.context;
		const direction = getDirectionFromAngle(angle);

		const velocity = direction.multiply(this.entity.stats.speed * deltaTime);
		this.entity.position = this.entity.position.add(velocity);
		this.entity.rotation = (angle * 180) / Math.PI + 90;
	}
}

import { BaseState } from '$lib/store/States/BaseState.svelte';
import { angleToTarget, getDirectionFromAngle } from '$utils/math';

export class FollowTarget extends BaseState {
	lastAngle = 0;

	update(deltaTime: number) {
		const { target } = this.stateMachine.context;

		if (target.isInteractable) {
			this.followTarget(deltaTime, target);
		} else {
			this.stateMachine.setState('FollowAngle', {
				angle: this.lastAngle
			});
		}
	}

	followTarget(deltaTime: number, target) {
		const targetCenter = target.boundingBox.center;
		const direction = getDirectionFromAngle(this.entity.rotation);
		const velocity = direction.multiply(this.entity.stats.speed * deltaTime);
		this.entity.position = this.entity.position.add(velocity);

		this.lastAngle = angleToTarget(this.entity.boundingBox.center, targetCenter);
		this.entity.rotation = (this.lastAngle * 180) / Math.PI + 90;
	}
}

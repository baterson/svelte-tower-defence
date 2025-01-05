import { BaseState } from '$lib/store/States/BaseState.svelte';
import { angleToTarget, getDirectionFromAngle } from '$lib/utils/math';
import { Vector2 } from '$lib/store/Vector2.svelte';

export class FollowTarget extends BaseState {
	private lastAngle = 0;
	private rotationOffset = 90; // Offset for sprite orientation

	update(deltaTime: number) {
		const { target } = this.stateMachine.context;

		if (target?.isInteractable) {
			this.followTarget(deltaTime, target);
		} else {
			this.stateMachine.setState('FollowAngle', {
				angle: this.lastAngle
			});
		}
	}

	getTopMiddlePoint(boundingBox: any): Vector2 {
		// Calculate the middle point of the top edge (between x1,y1 and x2,y1)
		const x = boundingBox.x1 + (boundingBox.x2 - boundingBox.x1) / 2;
		const y = boundingBox.y1;
		return new Vector2(x, y);
	}

	followTarget(deltaTime: number, target: any) {
		const entityCenter = this.entity.boundingBox.center;
		const targetTopMiddle = this.getTopMiddlePoint(target.boundingBox);

		// Calculate angle from entity center to target's top middle point
		this.lastAngle = angleToTarget(entityCenter, targetTopMiddle);

		// Update entity rotation with offset
		this.entity.rotation = (this.lastAngle * 180) / Math.PI + this.rotationOffset;

		// Get movement direction from the angle
		const direction = getDirectionFromAngle(this.lastAngle);

		// Calculate velocity
		const velocity = direction.multiply(this.entity.stats.speed * deltaTime);

		// Update the entity position
		this.entity.position = this.entity.position.add(velocity);
	}
}

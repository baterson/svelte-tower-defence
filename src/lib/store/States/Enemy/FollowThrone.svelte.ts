import { BaseState } from '$lib/store/States/BaseState.svelte';
import { Vector2 } from '$lib/store/Vector2.svelte';
import { angleToTarget, getDirectionFromAngle } from '$lib/utils/math';

export class FollowThrone extends BaseState {
	lastAngle = 0;

	update(deltaTime: number) {
		this.follow(deltaTime);
	}

	follow(deltaTime: number) {
		const { throne } = this.stateMachine.context;
		if (!throne.width) {
			return;
		}

		// const targetCenter = throne.boundingBox.center.clone();
		const targetCenter = throne.position;
		// // const targetCenter = throne.position.clone();
		// const targetCenterX = new Vector2(throne.position.x + throne.width / 2, throne.position.y);

		// const p = this.entity.position;
		// const t = new Vector2(
		// 	throne.position.x + throne.width / 2,
		// 	throne.position.y + throne.height / 2
		// );

		// console.log('this.entity.position, targetCenter', this.entity.position.x, targetCenter.x);

		this.entity.rotation = angleToTarget(this.entity.position, targetCenter);
		// console.log('this.entity.rotation', this.entity.rotation);

		const direction = getDirectionFromAngle(this.entity.rotation);

		const velocity = direction.multiply(this.entity.stats.speed * deltaTime);

		this.entity.position = this.entity.position.add(velocity);
	}
}

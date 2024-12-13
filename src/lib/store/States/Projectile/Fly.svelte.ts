/**
 * Projectile state machine states
 * @module ProjectileStates
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import type { Projectile } from '$store/Entities/Projectile.svelte';
import { angleToTarget, getDirectionFromAngle } from '$utils/math';

// todo: Add new State AutoAimFly
export class Fly extends BaseState {
	// todo: should always have a consistent angle
	update(deltaTime: number, projectile: Projectile) {
		const speed = projectile.stats.speed * deltaTime;
		const { target } = this.stateMachine.context;

		if (!target.isInteractable) {
			// todo: should fly untill reach next enemy or tower, should not change the initial angle
			projectile.state.setState('Hit');
			return;
		}

		if (target) {
			// todo: should fly untill reach next enemy or tower, should not change the initial angle
			const angle = angleToTarget(projectile.position, target.position);
			const direction = getDirectionFromAngle(angle);

			projectile.rotation = angle;

			projectile.position.x += direction.x * speed;
			projectile.position.y += direction.y * speed;
		} else {
			projectile.state.setState('Hit');
		}
	}
}

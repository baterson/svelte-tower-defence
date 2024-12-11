/**
 * Projectile state machine states
 * @module ProjectileStates
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import type { EntityPool } from '$store/EntityPool.svelte';
import type { Projectile } from '$store/Entities/Projectile.svelte';
import { distance, angleToTarget, getDirectionFromAngle } from '$utils/math';

export class Fly extends BaseState {
	update(deltaTime: number, projectile: Projectile, entityPool: EntityPool) {
		const speed = projectile.stats.speed * deltaTime;
		const { target } = this.context;

		if (target && !target.isDestroyed) {
			// Get angle and direction to target
			const angle = angleToTarget(projectile.position, target.position);
			const direction = getDirectionFromAngle(angle);

			// Update projectile rotation
			projectile.rotation = angle;

			// Update position
			projectile.position.x += direction.x * speed;
			projectile.position.y += direction.y * speed;
		} else {
			// Target lost or destroyed
			projectile.state.setState('Hit');
		}
	}
}

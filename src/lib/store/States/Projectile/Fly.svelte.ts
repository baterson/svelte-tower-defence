/**
 * ProjectileStates.ts
 * State classes for projectile behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import type { EntityPool } from '$store/EntityPool.svelte';
import type { Projectile } from '$store/Entities/Projectile.svelte';
import { distance, angleBetweenPoints, getDirectionFromAngle } from '$utils/math';

export class Fly extends BaseState {
	update(deltaTime: number, projectile: Projectile, entityPool: EntityPool) {
		// Update movement
		const speed = projectile.stats.speed * deltaTime;
		const { target } = projectile.context;

		if (target && !target.isDestroyed) {
			const angle = angleBetweenPoints(projectile.position, target.position);
			const direction = getDirectionFromAngle(angle);
			projectile.rotation = angle;

			projectile.position.x += direction.x * speed;
			projectile.position.y += direction.y * speed;

			if (distance(projectile.position, target.position) < 10) {
				projectile.context.target.resolveCollision(projectile);
				projectile.resolveCollision(target);
			}
		} else {
			projectile.state.setState('Hit');
		}
	}
}

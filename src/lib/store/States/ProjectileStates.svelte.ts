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

		// const angle = angleBetweenPoints(projectile.position, projectile.target.position);
		// const direction = getDirectionFromAngle(angle);
		// projectile.rotation = angle;

		// projectile.position.x += direction.x * speed;
		// projectile.position.y += direction.y * speed;
		// debugger;

		// // Update direction to target if it exists and not destroyed
		if (projectile.target && !projectile.target.isDestroyed) {
			const angle = angleBetweenPoints(projectile.position, projectile.target.position);
			const direction = getDirectionFromAngle(angle);
			projectile.rotation = angle;

			projectile.position.x += direction.x * speed;
			projectile.position.y += direction.y * speed;

			// Check collision with target
			if (distance(projectile.position, projectile.target.position) < 10) {
				projectile.target.takeDamage(projectile.damage);
				projectile.state.setState('Impact');
			}
		} else {
			// Target lost or destroyed, self-destruct
			projectile.state.setState('Impact');
		}
	}
}

export class Impact extends BaseState {
	update(deltaTime: number, projectile: Projectile, entityPool: EntityPool) {
		// Play impact animation and destroy
		if (projectile.sprite.isAnimationComplete) {
			projectile.isDestroyed = true;
			entityPool.remove(projectile.id);
		}
	}
}

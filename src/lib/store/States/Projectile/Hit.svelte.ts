/**
 * ProjectileStates.ts
 * State classes for projectile behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import type { EntityPool } from '$store/EntityPool.svelte';

export class Hit extends BaseState {
	update(deltaTime: number, projectile, entityPool: EntityPool) {
		// Play impact animation and destroy
		if (projectile.sprite.isAnimationComplete) {
			projectile.isDestroyed = true;
			entityPool.remove(projectile.id);
		}
	}
}

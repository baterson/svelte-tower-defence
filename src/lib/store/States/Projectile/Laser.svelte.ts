/**
 * Projectile Laser State
 * Handles laser beam behavior and damage
 */
import { BaseState } from '../BaseState.svelte';
import type { Entity } from '$store/Entity.svelte';
import type { EntityPool } from '$store/EntityPool.svelte';
import { distance, angleBetweenPoints, calculateLaserEndPoint } from '$utils/math';

export class Laser extends BaseState {
	private maxLength: number = 300; // Maximum laser length
	private damageTickRate: number = 0.1; // Damage every 100ms
	private damageTimer: number = 0;
	private baseWidth: number = 20; // Base width of laser sprite

	update(deltaTime: number, entity: Entity, entityPool: EntityPool) {
		if (!entity.target || entity.target.isDestroyed) {
			entity.isDestroyed = true;
			entityPool.remove(entity.id);
			return;
		}

		// Update rotation to follow target
		const angle = angleBetweenPoints(entity.position, entity.target.position);
		entity.rotation = angle;

		// Calculate laser end point and set scale
		const endPoint = calculateLaserEndPoint(
			entity.position,
			entity.target.position,
			this.maxLength
		);
		const laserLength = distance(entity.position, endPoint);
		entity.sprite.setScale(laserLength / this.baseWidth, 1);

		console.log('laserLength', laserLength);
		// debugger;

		// Apply damage on interval
		this.damageTimer += deltaTime;
		if (this.damageTimer >= this.damageTickRate) {
			this.damageTimer = 0;
			console.log('-----DAMAGE----');

			entity.target.state.setState('Die');
			entity.state.setState('Impact');
			// entity.target.takeDamage(entity.stats.damage * deltaTime);
		}
	}
}

/**
 * Projectile Laser State
 * Handles laser beam behavior and damage
 */
import { BaseState } from '../BaseState.svelte';
import type { Entity } from '$store/Entity.svelte';
import type { EntityPool } from '$store/EntityPool.svelte';

export class Laser extends BaseState {
	private maxLength: number = 300; // Maximum laser length
	private damageTickRate: number = 0.1; // Damage every 100ms
	private damageTimer: number = 0;
	private baseWidth: number = 20; // Base width of laser sprite

	update(deltaTime: number, entity: Entity, entityPool: EntityPool) {}
}

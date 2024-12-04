/**
 * Take damage state for entities
 * @module TakeDamage
 */

import { BaseState } from './BaseState.svelte';
import type { Entity } from '$lib/store/Entity.svelte';
import type { EntityPool } from '$lib/store/EntityPool.svelte';

export class TakeDamage extends BaseState {
	private damageAmount: number;
	private damageAnimationDuration = 200; // ms
	private startTime: number | null = null;

	constructor(damageAmount: number) {
		super();
		this.damageAmount = damageAmount;
	}

	update(deltaTime: number, entity: Entity, entityPool: EntityPool) {
		if (this.startTime === null) {
			this.startTime = Date.now();
			entity.hp -= this.damageAmount;

			// Flash effect
			entity.opacity = 0.5;

			if (entity.hp <= 0) {
				entity.state.setState('Die');
				return;
			}
		}
	}
}

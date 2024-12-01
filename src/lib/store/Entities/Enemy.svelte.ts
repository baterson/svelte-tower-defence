/**
 * Enemy.ts
 * Enemy entity that moves and attacks towers
 */

import { Entity } from './Entity.svelte';
import { Vector2 } from '$store/Vector2.svelte';
import { findNearestEntity } from '$utils/math';
import type { Tower } from './Tower.svelte';

export class Enemy extends Entity {
	health = $state(100);
	lastAttack = $state(0);

	constructor(name: string, position: Vector2) {
		super(name, position);
		this.health = this.stats.health;
	}

	// update(deltaTime: number, entityPool) {
	// 	super.update(deltaTime);

	// 	if (this.health <= 0 && this.state.currentState.name !== 'death') {
	// 		this.die();
	// 	}
	// }

	takeDamage(amount: number) {
		this.state?.setState('Die');
		// this.health -= amount;
	}

	findNearestTower(): Tower | null {
		const towers = this.pool.entities.filter((entity): entity is Tower => entity instanceof Tower);
		return findNearestEntity(this.position, towers);
	}
}

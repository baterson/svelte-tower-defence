/**
 * Projectile.ts
 * Projectile entity with state machine
 */

import { Entity } from './Entity.svelte';
import { Vector2 } from '$store/Vector2.svelte';
import type { Enemy } from './Enemy.svelte';
import type { EntityPool } from '$store/EntityPool.svelte';

export class Projectile extends Entity {
	target: Enemy;
	damage: number;
	direction = $state(new Vector2(0, 0));
	type = 'projectile';

	constructor(name: string, position: Vector2, target: Enemy, damage: number) {
		super(name, position);
		this.target = target;
		this.damage = damage;
		// this.state.setState('Fly');
	}

	update(deltaTime: number, entityPool: EntityPool) {
		this.sprite?.update(deltaTime);
		// debugger;
		this.state.update(deltaTime, entityPool);
	}
}

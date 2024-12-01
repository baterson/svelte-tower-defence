/**
 * Tower.ts
 * Tower entity that attacks enemies
 */

import { Entity } from './Entity.svelte';
import { Vector2 } from '$store/Vector2.svelte';
import type { EntityPool } from '$store/EntityPool.svelte';

export class Tower extends Entity {
	lastAttack = $state(0);

	constructor(name: string, position: Vector2) {
		super(name, position);
	}

	update(deltaTime: number, entityPool: EntityPool) {
		// super.update(deltaTime);
		this.sprite?.update(deltaTime);
		this.state.update(deltaTime, entityPool);
		// debugger;
		// if (this.state?.currentState === 'Build') {
		// 	return;
		// }

		// this.tryAttack(entityPool);
	}
}

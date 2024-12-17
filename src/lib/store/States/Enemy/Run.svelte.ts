/**
 * Run state for enemies
 * @module Run
 */

import { BaseState } from '../BaseState.svelte';
import type { Entity } from '$store/Entity.svelte';
import { Vector2 } from '$store/Vector2.svelte';

export class Run extends BaseState {
	private currentDirection: Vector2;
	timeManager = $state();

	constructor(stateMachine, stateContext = {}) {
		super(stateMachine, stateContext);
		this.currentDirection = new Vector2(0, 1);
	}

	update(deltaTime: number, enemy: Entity) {
		const speed = enemy.stats.speed * deltaTime;

		// Use Vector2 add method
		enemy.position.x += this.currentDirection.x * speed;
		enemy.position.y += this.currentDirection.y * speed;

		enemy.rotation = Math.atan2(this.currentDirection.y, this.currentDirection.x);
	}
}

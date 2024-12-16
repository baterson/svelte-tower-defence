/**
 * Projectile state machine states
 * @module ProjectileStates
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import { angleToTarget, getDirectionFromAngle } from '$utils/math';

// todo: Add new State AutoAimFly
export class Fly extends BaseState {
	angle = $state();
	direction = $state();

	constructor(stateMachine) {
		super(stateMachine);

		const { target } = this.stateMachine.context;
		const angle = angleToTarget(this.entity.position, target.position);
		this.direction = getDirectionFromAngle(angle);

		this.entity.rotation = angle;
	}

	update(deltaTime: number) {
		const speed = this.entity.stats.speed * deltaTime;

		this.entity.position.x += this.direction.x * speed;
		this.entity.position.y += this.direction.y * speed;
	}
}

/**
 * EnemyStates.ts
 * State classes for enemy behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import type { EntityPool } from '$lib/store/EntityPool.svelte';
import type { Enemy } from '$store/Entities/Enemy.svelte';
import { degToRad } from '$utils/math';

export class Die extends BaseState {
	private readonly ROTATION_SPEED = 2; // градусов в кадр
	private readonly TARGET_ROTATION = 90; // целевой угол в градусах

	constructor(stateMachine, context = {}) {
		super(stateMachine, context);

		stateMachine.owner.stopInteractions();
	}

	update(deltaTime: number, enemy: Enemy, entityPool: EntityPool) {
		if (enemy.sprite.isAnimationComplete) {
			enemy.destroy();
			return;
		}

		enemy.rotation =
			Math.min(enemy.rotation + degToRad(this.ROTATION_SPEED), degToRad(this.TARGET_ROTATION)) * 30;
	}
}

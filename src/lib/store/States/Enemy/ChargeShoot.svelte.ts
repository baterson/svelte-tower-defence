/**
 * EnemyStates.ts
 * State classes for enemy behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import { gameLoop } from '$store/GameLoop.svelte';

const CHARGE_CD = 100;

export class ChargeShoot extends BaseState {
	timeManager = $state();

	constructor(stateMachine) {
		super(stateMachine);
		this.cdId = gameLoop.setCD(CHARGE_CD, false);
	}

	update(deltaTime: number, enemy) {
		enemy.rotation += deltaTime * 20;

		if (gameLoop.isCDReady(this.cdId)) {
			this.stateMachine.setState('Shoot');
		}
	}
}

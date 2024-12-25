/**
 * EnemyStates.ts
 * State classes for enemy behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import { managers } from '$store/managers.svelte';
const CHARGE_CD = 100;

export class ChargeShoot extends BaseState {
	cdId: number;

	constructor(stateMachine) {
		super(stateMachine);
		const gameLoop = managers.getManager('gameLoop');
		this.cdId = gameLoop.setCD(CHARGE_CD, false);
	}

	update(deltaTime: number, enemy) {
		const gameLoop = managers.getManager('gameLoop');

		enemy.rotation += deltaTime * 20;

		if (gameLoop.isCDReady(this.cdId)) {
			this.stateMachine.setState('Shoot');
		}
	}
}

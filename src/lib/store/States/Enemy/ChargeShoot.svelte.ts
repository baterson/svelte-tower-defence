/**
 * EnemyStates.ts
 * State classes for enemy behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import { TimeManager } from '$store/TimeManager.svelte';

const CHARGE_CD = 100;

export class ChargeShoot extends BaseState {
	timeManager = $state();

	constructor(stateMachine, context) {
		super(stateMachine, context);

		const onChargeReady = () => {
			stateMachine.setState('Shoot');
		};

		this.timeManager = new TimeManager();
		this.timeManager.setTimer(onChargeReady, CHARGE_CD);
	}

	update(deltaTime: number, enemy, entityManager) {
		enemy.rotation += deltaTime * 20;
		this.timeManager.update(deltaTime);
	}
}

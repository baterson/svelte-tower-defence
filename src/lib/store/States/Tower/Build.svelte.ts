/**
 * TowerStates.ts
 * State classes for tower behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import { managers } from '$store/managers.svelte';
import { screen } from '$store/Screen.svelte';

export class Build extends BaseState {
	constructor(stateMachine) {
		super(stateMachine);

		const gameLoop = managers.get('gameLoop');

		this.cdId = gameLoop.setCD(150, true);

		if (screen.isMobile) {
			this.entity.position.y -= 10;
		} else {
			this.entity.position.y -= 14;
		}
	}

	update(deltaTime) {
		const gameLoop = managers.get('gameLoop');

		if (gameLoop.isCDReady(this.cdId)) {
			if (screen.isMobile) {
				this.entity.position.y -= 15;
			} else {
				this.entity.position.y -= 21;
			}
			this.entity.height = 107;

			this.entity.state.setState('Guard');
		}
	}
}

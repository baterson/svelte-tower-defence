/**
 * TowerStates.ts
 * State classes for tower behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import { TimeManager } from '$store/TimeManager.svelte';
import { Vector2 } from '$store/Vector2.svelte';

const once = (fn) => {
	let called = false;
	return function () {
		if (called) return;
		called = true;
		fn();
	};
};

export class Shoot extends BaseState {
	timeManager = $state();

	constructor(stateMachine, context = {}) {
		super(stateMachine, context);

		this.timeManager = new TimeManager();

		const cb = stateMachine.setState('Idle');
		this.timeManager.setTimer(cb, 1000);
	}

	update(deltaTime, tower, entityPool) {
		this.timeManager.update(deltaTime);

		once(() => {
			const projectilePosition = new Vector2(
				tower.position.x + tower.width / 2,
				tower.position.y + tower.height / 2
			);
			entityPool.spawnProjectile(projectilePosition, this.context.target, tower.stats.damage);
		})();
	}
}

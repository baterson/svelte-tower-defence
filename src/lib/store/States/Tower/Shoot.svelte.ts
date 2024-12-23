import { BaseState } from '$lib/store/States/BaseState.svelte';
import { stageManager } from '$store/StageManager.svelte';

export class Shoot extends BaseState {
	constructor(stateMachine) {
		super(stateMachine);

		this.shoot();
	}

	update() {
		this.entity.state.setState('Guard');
	}

	shoot() {
		const { spawner, target } = this.stateMachine.context;

		for (let i = 0; i < this.entity.stats.projectileNumber; i++) {
			let targetPoint;
			if (i > 0) {
				targetPoint = target.position.clone().add({ x: 100 * i, y: 100 * i });
			}

			stageManager.spawnEntity('projectile3', spawner.position.clone(), {
				spawner,
				target,
				targetPoint
			});
		}
	}
}

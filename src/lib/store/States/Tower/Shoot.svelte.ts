import { BaseState } from '$lib/store/States/BaseState.svelte';
import { stageManager } from '$store/StageManager.svelte';

export class Shoot extends BaseState {
	constructor(stateMachine) {
		super(stateMachine);

		const { spawner, target } = this.stateMachine.context;

		stageManager.spawnEntity('projectile3', spawner.position.clone(), {
			spawner,
			target
		});
	}

	update(deltaTime: number, entity: any): void {
		this.entity.state.setState('Guard');
	}
}

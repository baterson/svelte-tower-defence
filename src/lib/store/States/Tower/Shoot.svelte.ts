import { BaseState } from '$lib/store/States/BaseState.svelte';
import { entityManager } from '$store/EntityManager.svelte';

export class Shoot extends BaseState {
	constructor(stateMachine) {
		super(stateMachine);

		const { spawner, target } = this.stateMachine.context;
		// console.log(target);

		entityManager.spawnProjectile('projectile3', spawner, target);
	}

	update(deltaTime: number, entity: any): void {
		this.entity.state.setState('Guard');
	}
}

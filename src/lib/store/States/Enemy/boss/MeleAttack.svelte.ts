import { BaseState } from '$lib/store/States/BaseState.svelte';
import { entityManager } from '$store/EntityManager.svelte';
import { gameLoop } from '$store/GameLoop.svelte';
import { stageManager } from '$store/StageManager.svelte';

export class MeleAttack extends BaseState {
	constructor(stateMachine) {
		super(stateMachine);
		this.cdShootIdBoss = gameLoop.setCD(1000, true);
	}

	update(deltaTime: number) {
		const target = entityManager.findNearestEntity(this.entity, entityManager.livingTowers);

		if (!target?.isInteractable) {
			this.stateMachine.setState('Charge');
		}

		if (gameLoop.isCDReady(this.cdShootIdBoss)) {
			stageManager.spawnEntity('projectile5', this.entity.position, {
				owner: this.entity,
				target: target
			});
		}
	}
}

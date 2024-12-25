import { BaseState } from '$lib/store/States/BaseState.svelte';
import { managers } from '$store/managers.svelte';
export class MeleAttack extends BaseState {
	cdId: number;

	constructor(stateMachine) {
		super(stateMachine);
		const gameLoop = managers.getManager('gameLoop');
		this.cdId = gameLoop.setCD(1000, true);
	}

	update(deltaTime: number) {
		const entityManager = managers.getManager('entityManager');
		const stageManager = managers.getManager('stageManager');
		const gameLoop = managers.getManager('gameLoop');

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

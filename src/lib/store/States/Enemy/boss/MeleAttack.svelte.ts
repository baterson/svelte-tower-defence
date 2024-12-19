import { BaseState } from '$lib/store/States/BaseState.svelte';
import { entityManager } from '$store/EntityManager.svelte';
import { gameLoop } from '$store/GameLoop.svelte';

export class MeleAttack extends BaseState {
	constructor(stateMachine, context) {
		super(stateMachine);
		this.cdShootIdBoss = gameLoop.setCD(1000, true);
	}
	update(deltaTime: number, enemy: Entity) {
		const target = entityManager.getNearestTowerLiving(this.entity.position);

		if (!target?.isInteractable) {
			this.stateMachine.setState('Charge');
		}

		if (gameLoop.isCDReady(this.cdShootIdBoss)) {
			entityManager.spawnProjectile(enemy, target, 'projectile5');
		}
	}
}

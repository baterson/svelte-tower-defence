import { entityManager } from '$store/EntityManager.svelte';
import { BaseState } from '$store/States/BaseState.svelte';
import { gameLoop } from '$store/GameLoop.svelte';

export class RangeAttack extends BaseState {
	constructor(stateMachine) {
		super(stateMachine);
		this.cdShootIdBoss = gameLoop.setCD(1000, true);
	}
	update(deltaTime: number, enemy: Entity) {
		const target = entityManager.getNearestTowerLiving(this.entity.position, 'towers');

		const health = this.entity.stats.health;
		if (health <= health / 2) {
			this.stateMachine.setState('Charge');
		}
		if (gameLoop.isCDReady(this.cdShootIdBoss) && target) {
			entityManager.spawnProjectile(enemy, target, 'projectile2');
			this.entity.scale -= 0.1;
		}
	}
}

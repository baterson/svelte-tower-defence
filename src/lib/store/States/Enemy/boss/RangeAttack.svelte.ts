import { entityManager } from '$store/EntityManager.svelte';
import { BaseState } from '$store/States/BaseState.svelte';
import { gameLoop } from '$store/GameLoop.svelte';
import { Vector2 } from '$store/Vector2.svelte';

export class RangeAttack extends BaseState {
	constructor(stateMachine) {
		super(stateMachine);
		this.cdShootIdBoss = gameLoop.setCD(1000, true);
	}
	update(deltaTime: number, enemy: Entity) {
        
		const target = entityManager.getNearestEntityOfType(this.entity.position, 'towers');

		if (gameLoop.isCDReady(this.cdShootIdBoss) && target) {
			entityManager.spawnProjectile(enemy, target, 'projectile2');
		}
	}
}

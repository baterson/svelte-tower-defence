import { stageManager } from '$store/StageManager.svelte';
import { BaseState } from '$store/States/BaseState.svelte';
import { gameLoop } from '$store/GameLoop.svelte';
import { entityManager } from '$store/EntityManager.svelte';

export class RangeAttack extends BaseState {
	constructor(stateMachine) {
		super(stateMachine);
		this.cdShootIdBoss = gameLoop.setCD(1000, true);
	}
	update(deltaTime: number, enemy: Entity) {
		const target = entityManager.findNearestEntity(this.entity, entityManager.livingTowers);

		const health = this.entity.stats.health;
		if (health <= health / 2) {
			this.stateMachine.setState('Charge');
		}
		if (gameLoop.isCDReady(this.cdShootIdBoss) && target) {
			stageManager.spawnEntity('projectile2', this.entity.position.clone(), {
				spawner: this.entity,
				target: target
			});
			this.entity.scale -= 0.1;
		}
	}
}

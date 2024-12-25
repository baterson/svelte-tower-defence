import { BaseState } from '$store/States/BaseState.svelte';
import { managers } from '$store/managers.svelte';
export class RangeAttack extends BaseState {
	cdId: number;

	constructor(stateMachine) {
		super(stateMachine);
		const gameLoop = managers.getManager('gameLoop');
		this.cdId = gameLoop.setCD(1000, true);
	}
	update(deltaTime: number) {
		const { entityManager, stageManager, gameLoop } = managers.get([
			'entityManager',
			'stageManager',
			'gameLoop'
		]);

		const target = entityManager.findNearestEntity(this.entity, entityManager.livingTowers);

		const health = this.entity.stats.health;
		if (health <= health / 2) {
			this.stateMachine.setState('Charge');
		}
		if (gameLoop.isCDReady(this.cdId) && target) {
			stageManager.spawnEntity('projectile2', this.entity.position.clone(), {
				spawner: this.entity,
				target: target
			});
			this.entity.scale -= 0.1;
		}
	}
}

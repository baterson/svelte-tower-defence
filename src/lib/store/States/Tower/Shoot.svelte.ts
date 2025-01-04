import { BaseState } from '$lib/store/States/BaseState.svelte';
import { managers } from '$store/managers.svelte';
import { Vector2 } from '$store/Vector2.svelte';
export class Shoot extends BaseState {
	update() {
		// if (this.entity.animation.isComplete) {
		// 	this.shoot();
		// 	this.entity.state.setState('Guard');
		// }
		this.shoot();
		this.entity.state.setState('Guard');
	}

	shoot() {
		const stageManager = managers.get('stageManager');
		const { spawner, target } = this.stateMachine.context;
		const projectileType = spawner.stats.projectileType;

		for (let i = 0; i < this.entity.stats.projectileNumber; i++) {
			const towerShootPoint = spawner.boundingBox.center.subtract(new Vector2(0, 50));

			if (i === 0) {
				stageManager.spawnEntity(projectileType, towerShootPoint, {
					initialState: 'FollowThroughTarget',
					spawner,
					target
				});
			} else {
				const angle = Math.atan2(
					target.position.y - spawner.position.y,
					target.position.x - spawner.position.x
				);
				const distance = 2000;
				const targetPoint = towerShootPoint.add({
					x: Math.cos(angle) * distance + 300 * i,
					y: Math.sin(angle) * distance + 300 * i
				});

				stageManager.spawnEntity(projectileType, towerShootPoint, {
					initialState: 'FollowPoint',
					spawner,
					targetPoint
				});
			}
		}
	}
}

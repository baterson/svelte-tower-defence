import { BaseState } from '$lib/store/States/BaseState.svelte';
import { managers } from '$store/managers.svelte';
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
		managers.get('soundManager').play('pickUp');
		for (let i = 0; i < this.entity.stats.projectileNumber; i++) {
			let targetPoint;
			if (i === 0) {
				stageManager.spawnEntity(projectileType, spawner.position.clone(), {
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
				targetPoint = spawner.position.clone().add({
					x: Math.cos(angle) * distance + 300 * i,
					y: Math.sin(angle) * distance + 300 * i
				});

				stageManager.spawnEntity(projectileType, spawner.position.clone(), {
					initialState: 'FollowPoint',
					spawner,
					targetPoint
				});
			}
		}
	}
}

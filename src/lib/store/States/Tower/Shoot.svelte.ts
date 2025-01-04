import { BaseState } from '$lib/store/States/BaseState.svelte';
import { managers } from '$store/managers.svelte';
import { Vector2 } from '$store/Vector2.svelte';

export class Shoot extends BaseState {
	update() {
		this.shoot();
		this.entity.addVFX('TowerShoot');
		this.entity.state.setState('Guard');
	}

	shoot() {
		const stageManager = managers.get('stageManager');
		const { spawner, target } = this.stateMachine.context;
		const projectileType = spawner.stats.projectileType;
		const towerShootPoint = spawner.boundingBox.center.subtract(new Vector2(0, 50));

		// Calculate base angle to target
		const baseAngle = Math.atan2(
			target.position.y - spawner.position.y,
			target.position.x - spawner.position.x
		);

		// Spread for multiple projectiles
		const angleSpread = Math.PI / 10;

		for (let i = 0; i < this.entity.stats.projectileNumber; i++) {
			let projectileAngle;

			if (this.entity.stats.projectileNumber === 1) {
				stageManager.spawnEntity(projectileType, towerShootPoint, {
					spawner,
					target
				});
			} else {
				projectileAngle = baseAngle + (i - 1) * angleSpread;

				stageManager.spawnEntity(projectileType, towerShootPoint, {
					initialState: 'FollowAngle',
					spawner,
					angle: projectileAngle
				});
			}
		}
	}
}

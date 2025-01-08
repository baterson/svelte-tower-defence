import { BaseState } from '$lib/store/States/BaseState.svelte';
import { managers } from '$lib/store/managers.svelte';
import { Vector2 } from '$lib/store/Vector2.svelte';
import { boundingBoxFromPoint } from '$lib/utils/math';

export class Shoot extends BaseState {
	update() {
		this.shoot();
		this.entity.addVFX('TowerShoot');
		this.entity.state.setState('Guard');
	}

	shoot() {
		// debugger;

		const stageManager = managers.get('stageManager');
		const { spawner, target } = this.stateMachine.context;
		const projectileType = spawner.stats.projectileType;
		// use upgradeLvl

		const towerShootPoint = spawner.position.add(new Vector2(spawner.width / 2, 0));

		// Calculate base angle to target
		const baseAngle = Math.atan2(
			target.position.y - towerShootPoint.y,
			target.position.x - towerShootPoint.x
		);

		// Spread for multiple projectiles
		const angleSpread = Math.PI / 10;

		for (let i = 0; i < this.entity.stats.projectileNumber; i++) {
			let projectileAngle;

			if (this.entity.stats.projectileNumber === 1) {
				// debugger;
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

		managers.get('soundManager').play('pickUp');
	}

	// shoot() {
	// 	// debugger;

	// 	const stageManager = managers.get('stageManager');
	// 	const { spawner, target } = this.stateMachine.context;
	// 	const projectileType = spawner.stats.projectileType;
	// 	const towerShootPoint = spawner.position;
	// 	// const towerShootPoint = boundingBoxFromPoint(
	// 	// 	// spawner.staticPosition,
	// 	// 	spawner.position,
	// 	// 	spawner.width,
	// 	// 	spawner.height
	// 	// ).topMiddle;

	// 	// Calculate base angle to target
	// 	const baseAngle = Math.atan2(
	// 		target.position.y - towerShootPoint.y,
	// 		target.position.x - towerShootPoint.x
	// 	);
	// 	// const baseAngle = Math.atan2(
	// 	// 	target.position.y - spawner.position.y,
	// 	// 	target.position.x - spawner.position.x
	// 	// );

	// 	// Spread for multiple projectiles
	// 	const angleSpread = Math.PI / 10;

	// 	for (let i = 0; i < this.entity.stats.projectileNumber; i++) {
	// 		let projectileAngle;

	// 		if (this.entity.stats.projectileNumber === 1) {
	// 			stageManager.spawnEntity(projectileType, towerShootPoint, {
	// 				spawner,
	// 				target
	// 			});
	// 		} else {
	// 			projectileAngle = baseAngle + (i - 1) * angleSpread;

	// 			stageManager.spawnEntity(projectileType, towerShootPoint, {
	// 				initialState: 'FollowAngle',
	// 				spawner,
	// 				angle: projectileAngle
	// 			});
	// 		}
	// 	}

	// 	managers.get('soundManager').play('pickUp');
	// }
}

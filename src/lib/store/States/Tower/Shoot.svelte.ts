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
		const stageManager = managers.get('stageManager');
		const { spawner } = this.stateMachine.context;
		const projectileType = spawner.stats.projectileType;
		const projectileNumber = this.entity.stats.projectileNumber;
		// use upgradeLvl

		const towerShootPoint = spawner.position.add(new Vector2(spawner.width / 2, 0));

		const entityManager = managers.get('entityManager');
		const targets = entityManager.findNearestEntities(
			spawner,
			entityManager.enemies,
			projectileNumber
		);
		targets.forEach((target) => {
			stageManager.spawnEntity(projectileType, towerShootPoint, {
				spawner,
				target
			});
		});

		managers.get('soundManager').play('towerShoot');
	}
}

import { stages } from '$lib/config/stages';
import { initEntity } from '$lib/store/entityFabric';
import { managers } from './managers.svelte';
import { Vector2 } from './Vector2.svelte';

const spawnAreas = [70, 100, 130, 160, 190, 220, 250, 280, 310, 340];

const getRandomSpawnArea = () => {
	return spawnAreas[Math.floor(Math.random() * spawnAreas.length)];
};

const pickRandomEnemy = (enemies: string[]) => {
	return enemies[Math.floor(Math.random() * enemies.length)];
};

export class StageManager {
	stageNumber = $state(0);
	stageConfig = $derived(stages[this.stageNumber]);
	commonSpawnCd;
	eliteSpawnCd;

	init = () => {
		const gameLoop = managers.getManager('gameLoop');
		this.commonSpawnCd = gameLoop.setCD(200, true);
		this.eliteSpawnCd = gameLoop.setCD(1000, false);
		this.spawnTowers();
		this.spawnEntity('throne', new Vector2(200, 200));
	};

	update = (deltaTime: number) => {
		const gameLoop = managers.getManager('gameLoop');

		if (gameLoop.isCDReady(this.commonSpawnCd)) {
			this.spawnCommonEnemy();
		}
		if (gameLoop.isCDReady(this.eliteSpawnCd)) {
			// this.spawnEliteEnemy();
		}

		this.checkStageTime();
	};

	spawnTowers() {
		// ['fireTower'].forEach((name) => {
		// 	this.spawnEntity(name, new Vector2(0, 0));
		// });
		['fireTower', 'fireTower', 'fireTower', 'fireTower'].forEach((name) => {
			this.spawnEntity(name, new Vector2(0, 0));
		});
		// ['fireTower', 'windTower', 'earthTower', 'iceTower'].forEach((name) => {
		// 	this.spawnEntity(name, new Vector2(0, 0));
		// });
	}

	spawnCommonEnemy() {
		const commonEnemies = this.stageConfig.commonEnemies;
		const enemy = pickRandomEnemy(commonEnemies);
		const position = new Vector2(getRandomSpawnArea(), 20);
		this.spawnEntity(enemy, position);
	}

	spawnEliteEnemy() {
		const eliteEnemies = this.stageConfig.eliteEnemies;
		const enemy = pickRandomEnemy(eliteEnemies);
		const position = new Vector2(getRandomSpawnArea(), 20);
		this.spawnEntity(enemy, position);
	}

	checkStageTime() {
		const gameLoop = managers.getManager('gameLoop');
		if (gameLoop.elapsedTime > this.stageConfig.time) {
			this.nextStage();
		}
	}

	nextStage() {
		if (this.stageNumber < stages.length - 1) {
			this.stageNumber += 1;
		}
	}

	spawnEntity = (name: string, position: Vector2, context = {}) => {
		const entityManager = managers.getManager('entityManager');
		const entity = initEntity(name, position, context);
		entityManager.add(entity);
		return entity;
	};
}

import { initEntity } from '$lib/store/entityFabric';
import { entityManager } from './EntityManager.svelte';
import { gameLoop } from './GameLoop.svelte';
import { Vector2 } from './Vector2.svelte';

const stageConfig = [
	{
		commonEnemies: ['enemy1', 'enemy3'],
		eliteEnemies: ['stunner'],
		time: 4000
	},
	{
		commonEnemies: ['enemy5', 'enemy2'],
		eliteEnemies: ['stunner'],
		time: 10000
	}
];

const spawnAreas = [70, 100, 130, 160, 190, 220, 250, 280, 310, 340];

const getRandomSpawnArea = () => {
	return spawnAreas[Math.floor(Math.random() * spawnAreas.length)];
};

const pickRandomEnemy = (enemies: string[]) => {
	return enemies[Math.floor(Math.random() * enemies.length)];
};

export class StageManager {
	stageNumber = $state(0);
	stageConfig = $derived(stageConfig[this.stageNumber]);
	commonSpawnCd;
	eliteSpawnCd;

	constructor() {
		this.commonSpawnCd = gameLoop.setCD(400, true);
		this.eliteSpawnCd = gameLoop.setCD(1000, false);

		this.spawnTowers();
		this.spawnEntity('throne', new Vector2(200, 200));
	}

	update = (deltaTime: number) => {
		if (gameLoop.isCDReady(this.commonSpawnCd)) {
			this.spawnCommonEnemy();
		}
		if (gameLoop.isCDReady(this.eliteSpawnCd)) {
			this.spawnEliteEnemy();
		}

		this.checkStageTime();
	};

	spawnTowers() {
		[0, 1, 2, 3].forEach((i) => {
			this.spawnEntity('fireTower', new Vector2(0, 0));
		});
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
		if (gameLoop.elapsedTime > this.stageConfig.time) {
			this.nextStage();
		}
	}

	nextStage() {
		if (this.stageNumber < stageConfig.length - 1) {
			this.stageNumber += 1;
		}
	}

	spawnEntity = (name: string, position: Vector2, context = {}) => {
		const entity = initEntity(name, position, context);
		entityManager.add(entity);
	};
}

export const stageManager = new StageManager();

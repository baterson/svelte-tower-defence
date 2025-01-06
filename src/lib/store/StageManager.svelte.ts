import { stages } from '$lib/config/stages';
import { initEntity } from '$lib/store/entityFabric';
import { managers } from './managers.svelte';
import { Vector2 } from './Vector2.svelte';
import { screen } from '$lib/store/Screen.svelte';

const spawnZones = $derived({
	top: [
		{ x: screen.gameAreaWidth * 0.1, y: 20 },
		{ x: screen.gameAreaWidth * 0.3, y: 20 },
		{ x: screen.gameAreaWidth * 0.5, y: 20 },
		{ x: screen.gameAreaWidth * 0.7, y: 20 },
		{ x: screen.gameAreaWidth * 0.9, y: 20 }
	],
	left: [
		{ x: -20, y: 50 },
		{ x: -20, y: 80 },
		{ x: -20, y: 110 },
		{ x: -20, y: 140 }
	],
	right: [
		{ x: screen.gameAreaWidth + 20, y: 50 },
		{ x: screen.gameAreaWidth + 20, y: 80 },
		{ x: screen.gameAreaWidth + 20, y: 110 },
		{ x: screen.gameAreaWidth + 20, y: 140 }
	]
});

const getRandomSpawnPoint = () => {
	const rand = Math.floor(Math.random() * 100);

	let selectedZone;
	if (rand < 20) {
		selectedZone = spawnZones.left;
	} else if (rand < 40) {
		selectedZone = spawnZones.right;
	} else {
		selectedZone = spawnZones.top;
	}
	return selectedZone[Math.floor(Math.random() * selectedZone.length)];
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
		const gameLoop = managers.get('gameLoop');
		this.commonSpawnCd = gameLoop.setCD(this.stageConfig.spawnDelays.common, true);
		this.eliteSpawnCd = gameLoop.setCD(this.stageConfig.spawnDelays.elite, false);
		this.spawnTowers();
		this.spawnEntity('Throne', new Vector2(200, 200));
		this.spawnCommonEnemy();
	};

	update = (deltaTime: number) => {
		const gameLoop = managers.get('gameLoop');

		if (gameLoop.isCDReady(this.commonSpawnCd)) {
			this.spawnCommonEnemy();
		}
		if (gameLoop.isCDReady(this.eliteSpawnCd)) {
			this.spawnEliteEnemy();
		}

		this.checkStageTime();
	};

	spawnTowers() {
		// ['IceTower'].forEach((name) => {
		// 	this.spawnEntity(name, new Vector2(0, 0));
		// });

		['PoisonTower', 'FireTower', 'IceTower', 'ThunderTower'].forEach((name) => {
			this.spawnEntity(name, new Vector2(0, 0));
		});

		// ['FireTower', 'ThunderTower', 'PoisonTower', 'IceTower'].forEach((name) => {
		// 	this.spawnEntity(name, new Vector2(0, 0));
		// });
	}

	spawnCommonEnemy() {
		const entityManager = managers.get('entityManager');

		const commonEnemies = this.stageConfig.commonEnemies;
		const enemy = pickRandomEnemy(commonEnemies);
		const spawnPoint = getRandomSpawnPoint();
		const position = new Vector2(spawnPoint.x, spawnPoint.y);

		this.spawnEntity(enemy, position, { throne: entityManager.throne });
	}

	spawnEliteEnemy() {
		const entityManager = managers.get('entityManager');

		const eliteEnemies = this.stageConfig.eliteEnemies;
		const enemy = pickRandomEnemy(eliteEnemies);
		const spawnPoint = getRandomSpawnPoint();
		const position = new Vector2(spawnPoint.x, spawnPoint.y);
		this.spawnEntity(enemy, position, { throne: entityManager.throne });
	}

	spawnLoot(enemy) {
		const entityManager = managers.get('entityManager');
		const throne = entityManager.throne;

		this.spawnEntity('Loot', enemy.boundingBox.center.clone(), {
			target: throne
		});
	}

	checkStageTime() {
		const gameLoop = managers.get('gameLoop');
		if (gameLoop.elapsedTime > this.stageConfig.time) {
			this.nextStage();
		}
	}

	nextStage() {
		if (this.stageNumber < stages.length - 1) {
			this.stageNumber += 1;
		}
		const gameLoop = managers.get('gameLoop');
		this.commonSpawnCd = gameLoop.setCD(this.stageConfig.spawnDelays.common, true);
		this.eliteSpawnCd = gameLoop.setCD(this.stageConfig.spawnDelays.elite, false);
	}

	spawnEntity = (name: string, position: Vector2, context = {}) => {
		const entityManager = managers.get('entityManager');
		const entity = initEntity(name, position, context);
		entityManager.add(entity);
		return entity;
	};
}

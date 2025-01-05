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
	commonGroupsSpawnCDs = $state([]);
	eliteSpawnCDs = $state([]);

	init = () => {
		const gameLoop = managers.get('gameLoop');

		this.commonGroupsSpawnCDs = this.stageConfig.commonGroups.map((group) =>
			gameLoop.setCD(group.spawnInterval, true)
		);

		this.eliteSpawnCDs = this.stageConfig.eliteSpawns.map((spawn) =>
			gameLoop.setCD(spawn.spawnInterval, true)
		);
		this.spawnTowers();
		this.spawnEntity('Throne', new Vector2(200, 200));
	};

	update = (deltaTime: number) => {
		const gameLoop = managers.get('gameLoop');
		this.commonGroupsSpawnCDs.forEach((cd, index) => {
			if (gameLoop.isCDReady(cd)) {
				this.spawnCommonGroups(index);
			}
		});
		this.eliteSpawnCDs.forEach((cd, index) => {
			if (gameLoop.isCDReady(cd)) {
				this.spawnEliteEnemy(index);
			}
		});

		this.checkStageTime();
	};

	// calculateTowerPosition(tower, index) {
	// 	const sideMargin = screen.isMobile ? 30 : 100;
	// 	const bottomMargin = screen.isMobile ? 150 : 200;

	// 	const isLeftSide = index === 0 || index === 2;
	// 	const isTopRow = index === 0 || index === 1;

	// 	const x = isLeftSide ? sideMargin : screen.gameAreaWidth - tower.width - sideMargin + 10;

	// 	const y = isTopRow
	// 		? screen.gameAreaHeight - bottomMargin * 2
	// 		: screen.gameAreaHeight - bottomMargin;

	// 	return new Vector2(x, y);
	// }

	// spawnTowers() {
	// 	const towerTypes = ['FireTower', 'ThunderTower', 'PoisonTower', 'IceTower'];

	// 	towerTypes.forEach((name, index) => {
	// 		const tower = this.spawnEntity(name, new Vector2(0, 0));
	// 		tower.position = this.calculateTowerPosition(tower, index);
	// 	});
	// }

	spawnTowers() {
		['FireTower', 'ThunderTower', 'PoisonTower', 'IceTower'].forEach((name) => {
			this.spawnEntity(name, new Vector2(0, 0));
		});
	}

	// spawnCommonEnemy() {
	// 	const entityManager = managers.get('entityManager');

	// 	const commonEnemies = this.stageConfig.commonEnemies;
	// 	const enemy = pickRandomEnemy(commonEnemies);
	// 	const position = new Vector2(getRandomSpawnArea(), 20);

	// 	this.spawnEntity(enemy, position, { throne: entityManager.throne });
	// }

	// spawnEliteEnemy() {
	// 	const entityManager = managers.get('entityManager');

	// 	const eliteEnemies = this.stageConfig.eliteEnemies;
	// 	const enemy = pickRandomEnemy(eliteEnemies);
	// 	const position = new Vector2(getRandomSpawnArea(), 20);

	// 	this.spawnEntity(enemy, position, { throne: entityManager.throne });
	// }

	spawnCommonGroups(groupIndex: number) {
		const entityManager = managers.get('entityManager');
		const group = this.stageConfig.commonGroups[groupIndex];

		for (let i = 0; i < group.count; i++) {
			const randomType = group.types[Math.floor(Math.random() * group.types.length)];
			const position = new Vector2(group.spawnPosition[i], 20);

			this.spawnEntity(randomType, position, { throne: entityManager.throne });
		}
	}

	spawnEliteEnemy(spawnIndex: number) {
		debugger;
		const entityManager = managers.get('entityManager');
		const eliteSpawnEnemies = this.stageConfig.eliteSpawns[spawnIndex];
		const randomType =
			eliteSpawnEnemies.types[Math.floor(Math.random() * eliteSpawnEnemies.types.length)];
		const spawnPoints = [70, 180, 230];
		const randomPoint = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
		const position = new Vector2(randomPoint, 20);
		this.spawnEntity(randomType, position, { target: entityManager.throne });
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
		this.commonGroupsSpawnCDs = this.stageConfig.commonGroups.map((group) =>
			gameLoop.setCD(group.spawnInterval, true)
		);

		this.eliteSpawnCDs = this.stageConfig.eliteSpawns.map((spawn) =>
			gameLoop.setCD(spawn.spawnInterval, true)
		);
	}

	spawnEntity = (name: string, position: Vector2, context = {}) => {
		const entityManager = managers.get('entityManager');
		const entity = initEntity(name, position, context);
		entityManager.add(entity);
		return entity;
	};
}

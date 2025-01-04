import { stages } from '$lib/config/stages';
import { initEntity } from '$lib/store/entityFabric';
import { managers } from './managers.svelte';
import { Vector2 } from './Vector2.svelte';
import { screen } from '$lib/store/Screen.svelte';

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
		const gameLoop = managers.get('gameLoop');
		this.commonSpawnCd = gameLoop.setCD(300, true);
		this.eliteSpawnCd = gameLoop.setCD(100, false);
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
			// this.spawnEliteEnemy();
		}

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
		// ['FireTower'].forEach((name) => {
		// 	this.spawnEntity(name, new Vector2(0, 0));
		// });
		// ['fireTower', 'fireTower', 'fireTower', 'fireTower'].forEach((name) => {
		// 	this.spawnEntity(name, new Vector2(0, 0));
		// });

		['FireTower', 'ThunderTower', 'PoisonTower', 'IceTower'].forEach((name) => {
			this.spawnEntity(name, new Vector2(0, 0));
		});
	}

	spawnCommonEnemy() {
		const entityManager = managers.get('entityManager');

		const commonEnemies = this.stageConfig.commonEnemies;
		const enemy = pickRandomEnemy(commonEnemies);
		const position = new Vector2(getRandomSpawnArea(), 20);

		this.spawnEntity(enemy, position, { throne: entityManager.throne });
	}

	spawnEliteEnemy() {
		const entityManager = managers.get('entityManager');

		const eliteEnemies = this.stageConfig.eliteEnemies;
		const enemy = pickRandomEnemy(eliteEnemies);
		const position = new Vector2(getRandomSpawnArea(), 20);

		this.spawnEntity(enemy, position, { throne: entityManager.throne });
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
	}

	spawnEntity = (name: string, position: Vector2, context = {}) => {
		const entityManager = managers.get('entityManager');
		const entity = initEntity(name, position, context);
		entityManager.add(entity);
		return entity;
	};
}

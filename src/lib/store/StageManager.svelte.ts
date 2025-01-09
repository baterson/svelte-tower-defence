import { stages } from '$lib/config/stages';
import { initEntity } from '$lib/store/entityFabric';
import { managers } from './managers.svelte';
import { Vector2 } from './Vector2.svelte';
import { screen } from '$lib/store/Screen.svelte';
import type { Entity } from './Entity.svelte';

// const spawnZones = $derived({
// 	top: [
// 		{ x: screen.width * 0.1, y: 20 },
// 		{ x: screen.width * 0.3, y: 20 },
// 		{ x: screen.width * 0.5, y: 20 },
// 		{ x: screen.width * 0.7, y: 20 },
// 		{ x: screen.width * 0.9, y: 20 }
// 	],
// 	left: [
// 		{ x: -20, y: 50 },
// 		{ x: -20, y: 80 },
// 		{ x: -20, y: 110 },
// 		{ x: -20, y: 140 }
// 	],
// 	right: [
// 		{ x: screen.width + 20, y: 50 },
// 		{ x: screen.width + 20, y: 80 },
// 		{ x: screen.width + 20, y: 110 },
// 		{ x: screen.width + 20, y: 140 }
// 	]
// });

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
	isGameOver = $state(false);
	isWin = $state(false);

	init = () => {
		const gameLoop = managers.get('gameLoop');
		// this.commonSpawnCd = gameLoop.setCD(this.stageConfig.spawnDelays.common, false);
		this.commonSpawnCd = gameLoop.setCD(this.stageConfig.spawnDelays.common, true);
		this.eliteSpawnCd = gameLoop.setCD(this.stageConfig.spawnDelays.elite, true);
		this.spawnTowers();
		this.spawnEntity('Throne', new Vector2(0, 0));
		this.spawnEnemy('common');
	};

	reset() {
		this.commonSpawnCd = null;
		this.eliteSpawnCd = null;
		this.stageNumber = 0;
		this.isGameOver = false;
	}

	update = (deltaTime: number) => {
		const gameLoop = managers.get('gameLoop');

		if (gameLoop.isCDReady(this.commonSpawnCd)) {
			this.spawnEnemy('common');
		}
		if (gameLoop.isCDReady(this.eliteSpawnCd)) {
			// this.spawnEnemy('elite');
		}

		this.checkStageTime();
	};

	spawnTowers() {
		['IceTower', 'FireTower', 'PoisonTower', 'ThunderTower'].forEach((name, index) => {
			const tower = this.spawnEntity(name, new Vector2(0, 0));
			tower.staticSlot = index;
		});
	}

	apllyAmlify(entity: Entity) {
		const { statsAmplify } = this.stageConfig;
		entity.stats.health *= statsAmplify.health;
		entity.stats.damage *= statsAmplify.damage;
		entity.stats.speed *= statsAmplify.speed;
	}

	spawnEnemy(type: 'common' | 'elite') {
		const entityManager = managers.get('entityManager');

		const enemies =
			type === 'common' ? this.stageConfig.commonEnemies : this.stageConfig.eliteEnemies;
		const enemy = pickRandomEnemy(enemies);
		const spawnPoint = getRandomSpawnPoint();
		const position = new Vector2(spawnPoint.x, spawnPoint.y);
		// const position = new Vector2(500, 100);
		// const position = new Vector2(0, 0);

		const entity = this.spawnEntity(enemy, position, { throne: entityManager.throne });
		this.apllyAmlify(entity);
		return entity;
	}

	spawnLoot(enemy) {
		const entityManager = managers.get('entityManager');
		const throne = entityManager.throne;

		this.spawnEntity('Loot', enemy.boundingBox.center, {
			target: throne
		});
	}
	gameOver(isWin) {
		this.isGameOver = true;
		this.isWin = isWin;
		const gameLoop = managers.get('gameLoop');
		gameLoop.pause();
	}

	checkStageTime() {
		const gameLoop = managers.get('gameLoop');
		if (gameLoop.elapsedTime > this.stageConfig.time) {
			this.nextStage();
		}
	}

	nextStage() {
		if (this.stageNumber < stages.length - 1) {
			this.stageNumber++;
		} else {
			this.gameOver(true);
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

import { stages } from '$lib/config/stages';
import { initEntity } from '$lib/store/entityFabric';
import { managers } from './managers.svelte';
import { Vector2 } from './Vector2.svelte';
import { screen } from '$lib/store/Screen.svelte';
import type { Entity } from './Entity.svelte';

const spawnZones = $derived({
	top: [
		{ x: screen.width * 0.1, y: 20 },
		{ x: screen.width * 0.3, y: 20 },
		{ x: screen.width * 0.5, y: 20 },
		{ x: screen.width * 0.7, y: 20 },
		{ x: screen.width * 0.9, y: 20 }
	],
	bottom: [
		{ x: screen.width * 0.1, y: screen.height - 20 },
		{ x: screen.width * 0.3, y: screen.height - 20 },
		{ x: screen.width * 0.5, y: screen.height - 20 },
		{ x: screen.width * 0.7, y: screen.height - 20 },
		{ x: screen.width * 0.9, y: screen.height - 20 }
	],
	left: [
		{ x: 20, y: screen.height * 0.1 },
		{ x: 20, y: screen.height * 0.3 },
		{ x: 20, y: screen.height * 0.5 },
		{ x: 20, y: screen.height * 0.7 },
		{ x: 20, y: screen.height * 0.9 }
	],
	right: [
		{ x: screen.width - 20, y: screen.height * 0.1 },
		{ x: screen.width - 20, y: screen.height * 0.3 },
		{ x: screen.width - 20, y: screen.height * 0.5 },
		{ x: screen.width - 20, y: screen.height * 0.7 },
		{ x: screen.width - 20, y: screen.height * 0.9 }
	]
});

const getRandomSpawnPoint = () => {
	const avaliableZones = screen.isMobile ? ['top', 'bottom'] : ['top', 'bottom', 'left', 'right'];
	const selectedZone = avaliableZones[Math.floor(Math.random() * avaliableZones.length)];
	const spawnPoints = spawnZones[selectedZone];

	return spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
};

const pickRandomEnemy = (enemies: string[]) => {
	return enemies[Math.floor(Math.random() * enemies.length)];
};

export class StageManager {
	stageNumber = $state(0);
	stageConfig = $derived(stages[this.stageNumber]);
	stageStartTime = $state(0);
	commonSpawnCd;
	eliteSpawnCd;
	stageResult = $state<'win ' | 'lose' | ''>('');

	init = () => {
		const gameLoop = managers.get('gameLoop');
		// this.commonSpawnCd = gameLoop.setCD(this.stageConfig.spawnDelays.common, false);
		this.commonSpawnCd = gameLoop.setCD(this.stageConfig.spawnDelays.common, true);
		this.eliteSpawnCd = gameLoop.setCD(this.stageConfig.spawnDelays.elite, true);
		this.spawnTowers();
		this.spawnEntity('Throne', new Vector2(0, 0));
		// this.spawnEnemy('common');
	};

	reset() {
		this.commonSpawnCd = null;
		this.eliteSpawnCd = null;
		this.stageNumber = 0;
		this.stageResult = '';

		this.init();
	}

	update = (deltaTime: number) => {
		const gameLoop = managers.get('gameLoop');

		if (gameLoop.isCDReady(this.commonSpawnCd)) {
			this.spawnEnemy('common');
		}
		if (gameLoop.isCDReady(this.eliteSpawnCd)) {
			this.spawnEnemy('elite');
		}

		this.checkStageTime();
	};

	spawnTowers() {
		['IceTower', 'FireTower', 'PoisonTower', 'ThunderTower'].forEach((name, index) => {
			this.spawnEntity(name, new Vector2(0, 0));
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
	gameOver(result) {
		this.stageResult = result;

		const gameLoop = managers.get('gameLoop');
		gameLoop.pause();
	}

	checkStageTime() {
		const gameLoop = managers.get('gameLoop');
		if (this.stageStartTime + this.stageConfig.time < gameLoop.elapsedTime) {
			this.nextStage();
		}
	}

	nextStage() {
		// debugger;
		if (this.stageNumber < stages.length - 1) {
			const gameLoop = managers.get('gameLoop');

			this.stageNumber++;
			this.stageStartTime = gameLoop.elapsedTime;

			this.commonSpawnCd = gameLoop.setCD(this.stageConfig.spawnDelays.common, true);
			this.eliteSpawnCd = gameLoop.setCD(this.stageConfig.spawnDelays.elite, true);
		} else {
			this.gameOver('win');
		}
	}

	spawnEntity = (name: string, position: Vector2, context = {}) => {
		const entityManager = managers.get('entityManager');
		const entity = initEntity(name, position, context);
		entityManager.add(entity);
		return entity;
	};
}

import { Background } from './Background.svelte';
import { CollisionManager } from './CollisionManager.svelte';
import { EntityManager } from './EntityManager.svelte';
import { StageManager } from './StageManager.svelte';
import { UIManager } from './UIManager.svelte';
import { GameLoop } from './GameLoop.svelte';
import { managers } from './managers.svelte';
import { SoundManager } from './SoundManager.svelte';
import { lootTracker } from './LootTracker.svelte';

export class Game {
	isStarted = $state(false);

	update = async (deltaTime) => {
		managers.update(deltaTime);
	};

	start = async () => {
		managers.setup(setupManagers());

		const { gameLoop, soundManager, stageManager } = managers.get([
			'gameLoop',
			'soundManager',
			'stageManager'
		]);

		await soundManager.preload();

		stageManager.init();

		gameLoop.start(this.update);

		soundManager.play('bgSound');

		this.isStarted = true;
	};

	restart = () => {
		const { entityManager, gameLoop, soundManager, stageManager } = managers.get([
			'entityManager',
			'gameLoop',
			'soundManager',
			'stageManager'
		]);

		gameLoop.reset();
		entityManager.reset();
		stageManager.reset();
		// soundManager.reset();
		lootTracker.reset();

		gameLoop.resume();

		// const { entityManager, stageManager, soundManager, gameLoop } = managers.get([
		// 	'entityManager',
		// 	'stageManager',
		// 	'soundManager',
		// 	'gameLoop'
		// ]);
		// entityManager.entities = [];
		//  .elapsedTime = 0.0;
		// gameLoop.accumulator = 0.0;
		// stageManager.reset();
		// lootTracker.reset();

		// stageManager.init();

		// soundManager.restartBgMusic();
		// soundManager.setMusicVolume(0.06);
	};
}

const setupManagers = () => {
	managers.background = new Background();
	managers.collisionManager = new CollisionManager();
	managers.entityManager = new EntityManager();
	managers.uiManager = new UIManager();
	managers.gameLoop = new GameLoop();
	managers.soundManager = new SoundManager();

	managers.stageManager = new StageManager();

	return managers;
};

export const game = new Game();

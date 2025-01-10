import { CollisionManager } from './CollisionManager.svelte';
import { EntityManager } from './EntityManager.svelte';
import { StageManager } from './StageManager.svelte';
import { GameLoop } from './GameLoop.svelte';
import { managers } from './managers.svelte';
import { soundManager } from './SoundManager.svelte';
import { cursor } from './Cursor.svelte';
import { lootTracker } from './LootTracker.svelte';

export class Game {
	isStarted = $state(false);

	update = async (deltaTime) => {
		managers.update(deltaTime);
		cursor.update(deltaTime);
	};

	start = async () => {
		managers.setup(setupManagers());

		const { gameLoop, stageManager } = managers.get(['gameLoop', 'stageManager']);

		stageManager.init();

		gameLoop.start(this.update);

		soundManager.play('bgSound');

		this.isStarted = true;
	};

	restart = () => {
		const { entityManager, gameLoop, stageManager } = managers.get([
			'entityManager',
			'gameLoop',
			'stageManager'
		]);

		gameLoop.reset();
		entityManager.reset();
		stageManager.reset();
		soundManager.reset();
		lootTracker.reset();

		gameLoop.resume();
	};
}

const setupManagers = () => {
	managers.collisionManager = new CollisionManager();
	managers.entityManager = new EntityManager();
	managers.gameLoop = new GameLoop();
	managers.stageManager = new StageManager();

	return managers;
};

export const game = new Game();

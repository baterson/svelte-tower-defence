import { Background } from './Background.svelte';
import { CollisionManager } from './CollisionManager.svelte';
import { EntityManager } from './EntityManager.svelte';
import { StageManager } from './StageManager.svelte';
import { UIManager } from './UIManager.svelte';
import { GameLoop } from './GameLoop.svelte';
import { managers } from './managers.svelte';

export class Game {
	constructor() {
		managers.init(initManagers());

		const stageManager = managers.getManager('stageManager');
		stageManager.init();
	}

	update = (deltaTime, elapsedTime) => {
		// uiManager.update();
		// if (uiManager.currentDialog) return;
		// entityManager.update(deltaTime, elapsedTime);
		// collisionManager.update();
		// stageManager.update(deltaTime);
		// background.update(deltaTime);
		managers.update(deltaTime);
	};

	start = () => {
		managers.getManager('gameLoop').start(this.update);
	};
}

const initManagers = () => {
	managers.background = new Background();
	managers.collisionManager = new CollisionManager();
	managers.entityManager = new EntityManager();
	managers.stageManager = new StageManager();
	managers.uiManager = new UIManager();
	managers.gameLoop = new GameLoop();

	return managers;
};

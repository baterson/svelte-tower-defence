import { Background } from './Background.svelte';
import { CollisionManager } from './CollisionManager.svelte';
import { EntityManager } from './EntityManager.svelte';
import { StageManager } from './StageManager.svelte';
import { UIManager } from './UIManager.svelte';
import { GameLoop } from './GameLoop.svelte';
import { managers } from './managers.svelte';
import { SoundManager } from './SoundManager.svelte';

export class Game {
	constructor() {
		managers.init(initManagers());

		const stageManager = managers.get('stageManager');
		stageManager.init();
	}

	update = async (deltaTime) => {
		managers.update(deltaTime);
	};

	start = () => {
		const gameLoop = managers.get('gameLoop');
		gameLoop.start(this.update);
		const soundManager = managers.get('soundManager');
		soundManager.init();
		soundManager.play('bgSound');
	};
}

const initManagers = () => {
	managers.background = new Background();
	managers.collisionManager = new CollisionManager();
	managers.entityManager = new EntityManager();
	managers.stageManager = new StageManager();
	managers.uiManager = new UIManager();
	managers.gameLoop = new GameLoop();
	managers.soundManager = new SoundManager();

	return managers;
};

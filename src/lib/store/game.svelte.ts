import { entityManager } from './EntityManager.svelte';
import { GameLoop } from './GameLoop.svelte';

export class Game {
	gameLoop = $state();
	entityManager = $state(entityManager);
	// obj = $state({ x: 0, y: 0, sprite: { x: -640, y: -214 }, width: 60, height: 100 });

	constructor() {
		this.gameLoop = new GameLoop(this.update, this.render);
		// this.entityPool = new EntityPool();
	}

	update = (deltaTime) => {
		this.entityManager.update(deltaTime);
	};

	start = () => {
		this.gameLoop.start();
	};
}

export const game = new Game();

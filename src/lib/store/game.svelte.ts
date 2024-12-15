import { entityManager } from './EntityManager.svelte';
import { gameLoop } from './GameLoop.svelte';

export class Game {
	gameLoop = $state();

	constructor() {
		this.gameLoop = gameLoop;
	}

	update = (deltaTime, elapsedTime) => {
		entityManager.update(deltaTime, elapsedTime);
	};

	start = () => {
		this.gameLoop.start(this.update);
	};
}

export const game = new Game();

import { Background } from './Background.svelte';
import { entityManager } from './EntityManager.svelte';
import { gameLoop } from './GameLoop.svelte';

export class Game {
	gameLoop = $state();
	background = $state();

	constructor() {
		this.gameLoop = gameLoop;
		// this.background = new Background(windowWidth, windowHeight);
	}

	update = (deltaTime, elapsedTime) => {
		entityManager.update(deltaTime, elapsedTime);

		this.background.update(deltaTime);
	};

	setBackground = (windowWidth, windowHeight) => {
		this.background = new Background(windowWidth, windowHeight);
	};

	start = () => {
		this.gameLoop.start(this.update);
	};
}

export const game = new Game();

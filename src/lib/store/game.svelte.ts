import { background } from './Background.svelte';
import { collisionManager } from './CollisionManager.svelte';
import { entityManager } from './EntityManager.svelte';
import { gameLoop } from './GameLoop.svelte';
import { stageManager } from './StageManager.svelte';

export class Game {
	update = (deltaTime, elapsedTime) => {
		entityManager.update(deltaTime, elapsedTime);
		collisionManager.update();

		stageManager.update(deltaTime);

		background.update(deltaTime);
	};

	start = () => {
		gameLoop.start(this.update);
	};
}

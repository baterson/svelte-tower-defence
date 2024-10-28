const MS_PER_UPDATE = 16.666;

export class GameLoop {
	previousTime = $state(performance.now());
	accumulator = $state(0.0);
	// update = $state();
	// render = $state();

	constructor(update, render) {
		this.update = update;
		this.render = render;
		this.loop = this.loop.bind(this);
	}

	start() {
		requestAnimationFrame(this.loop);
	}

	loop(currentTime) {
		let elapsed = currentTime - this.previousTime;
		if (elapsed > 1000) elapsed = MS_PER_UPDATE;

		this.previousTime = currentTime;
		this.accumulator += elapsed;

		while (this.accumulator >= MS_PER_UPDATE) {
			this.update(MS_PER_UPDATE);
			this.accumulator -= MS_PER_UPDATE;
		}

		// const interpolation = this.accumulator / MS_PER_UPDATE;
		// this.render(interpolation);

		requestAnimationFrame(this.loop);
	}
}

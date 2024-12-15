const MS_PER_UPDATE = 16.666;

export class GameLoop {
	static lastCDId = 0;

	previousTime = $state(performance.now());
	accumulator = $state(0.0);
	elapsedTime = $state(0.0);
	pauseState = $state(null);
	cooldowns = $state<
		Record<
			string,
			{
				startTime: number;
				waitTime: number;
				isInfinite: boolean;
			}
		>
	>({});

	constructor() {
		this.loop = this.loop.bind(this);
	}

	get elapsedInSeconds() {
		return this.elapsedTime / 1000;
	}

	start(update) {
		this.update = update;
		requestAnimationFrame(this.loop);
	}

	loop(currentTime) {
		if (this.pauseState) {
			this.previousTime = currentTime;
			requestAnimationFrame(this.loop);
			return;
		}

		let elapsed = currentTime - this.previousTime;
		if (elapsed > 1000) elapsed = MS_PER_UPDATE;

		this.previousTime = currentTime;
		this.accumulator += elapsed;
		this.elapsedTime += elapsed;

		while (this.accumulator >= MS_PER_UPDATE) {
			this.update(MS_PER_UPDATE, this.elapsedTime);
			this.accumulator -= MS_PER_UPDATE;
		}

		requestAnimationFrame(this.loop);
	}

	setCD(waitTime: number, isInfinite = false) {
		const id = GameLoop.lastCDId++;

		this.cooldowns[id] = {
			waitTime,
			isInfinite,
			startTime: this.elapsedTime
		};

		return id;
	}

	isCDReady(cooldownId: string): boolean {
		const cd = this.cooldowns[cooldownId];
		if (!cd) return false;

		const elapsedCD = this.elapsedTime - cd.startTime;

		if (elapsedCD <= cd.waitTime) {
			return false;
		}

		if (cd.isInfinite) {
			this.cooldowns[cooldownId] = {
				...cd,
				startTime: this.elapsedTime
			};
			return true;
		} else {
			delete this.cooldowns[cooldownId];
			return true;
		}
	}

	pause() {
		if (!this.pauseState) {
			this.pauseState = { pausedTime: performance.now() };
		} else {
			this.resume();
		}
	}

	resume() {
		if (!this.pauseState) return;

		const { pausedTime } = this.pauseState;

		const pauseDuration = this.elapsedTime - pausedTime;
		this.previousTime = performance.now();

		Object.keys(this.cooldowns).forEach((id) => {
			const cd = this.cooldowns[id];

			this.cooldowns[id] = {
				...cd,
				startTime: cd.startTime + pauseDuration
			};
		});

		this.pauseState = null;
	}
}

export const gameLoop = new GameLoop();

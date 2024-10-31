export class Sprite {
	frames = $state([]);
	frameRate = $state(0);
	loop = $state(false);
	currentFrameIndex = $state(0);
	currentFrameTime = $state(0);
	currentFrame = $derived(this.getCurrentFrame());
	isAnimationComplete = $derived(this.checkAnimationComplete());

	constructor({ frames, frameRate, loop }) {
		this.frames = frames;
		this.frameRate = frameRate;
		this.loop = loop;
	}

	update(deltaTime: number) {
		if (this.frameRate === 0) return;

		// todo: move to `animate` function
		// Or create a Class for Animation

		this.currentFrameTime += deltaTime;

		if (this.currentFrameTime >= 1000 / this.frameRate) {
			this.currentFrameTime = 0;
			this.currentFrameIndex += 1;

			if (this.currentFrameIndex >= this.frames.length) {
				if (this.loop) {
					this.currentFrameIndex = 0;
				} else {
					this.currentFrameIndex = this.frames.length - 1;
				}
			}
		}
	}

	private getCurrentFrame() {
		return this.frames[this.currentFrameIndex];
	}

	private checkAnimationComplete() {
		return this.currentFrameIndex === this.frames.length - 1 && !this.loop;
	}
}

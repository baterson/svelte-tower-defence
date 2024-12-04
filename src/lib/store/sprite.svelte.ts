/**
 * Sprite class handling animation frames and transformations
 */
type Frame = [number, number];

interface SpriteConfig {
	frames: Frame[];
	frameRate: number;
	loop?: boolean;
}

export class Sprite {
	frames = $state<Frame[]>([]);
	frameRate = $state(0);
	loop = $state(false);
	currentFrameIndex = $state(0);
	currentFrameTime = $state(0);
	spritesheet = $state('');
	scaleX = $state(1);
	scaleY = $state(1);
	offsetX = $state(0);
	offsetY = $state(0);

	currentFrame = $derived(this.getCurrentFrame());
	isAnimationComplete = $derived(this.getIsAnimationComplete());

	constructor({ frames, frameRate, loop = false }: SpriteConfig, spritesheet: string) {
		this.frames = frames;
		this.frameRate = frameRate;
		this.loop = loop;
		this.spritesheet = spritesheet;
	}

	update(deltaTime: number) {
		if (this.frameRate === 0) return;

		this.currentFrameTime += deltaTime;

		if (this.currentFrameTime >= 1000 / this.frameRate) {
			this.currentFrameTime = 0;
			this.nextFrame();
		}
	}

	private nextFrame() {
		this.currentFrameIndex += 1;

		if (this.currentFrameIndex >= this.frames.length) {
			if (this.loop) {
				this.currentFrameIndex = 0;
			} else {
				this.currentFrameIndex = this.frames.length - 1;
			}
		}
	}

	getCurrentFrame(): Frame {
		return this.frames[this.currentFrameIndex];
	}

	getIsAnimationComplete(): boolean {
		if (this.loop) {
			return false;
		}
		return this.currentFrameIndex === this.frames.length - 1;
	}

	reset() {
		this.currentFrameIndex = 0;
		this.currentFrameTime = 0;
	}

	setScale(x: number, y = x) {
		this.scaleX = x;
		this.scaleY = y;
	}

	setOffset(x: number, y: number) {
		this.offsetX = x;
		this.offsetY = y;
	}
}

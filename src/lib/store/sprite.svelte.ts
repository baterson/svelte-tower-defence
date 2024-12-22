/**
 * Sprite class handling animation frames and transformations
 */
type Frame = [number, number];

interface SpriteConfig {
	frames: Frame[];
	frameRate: number;
	spritesheet: string;
	loop?: boolean;
}

export class Sprite {
	frames = $state<Frame[]>([]);
	frameRate = $state(0);
	loop = $state(false);
	currentFrameIndex = $state(0);
	currentFrameTime = $state(0);
	spritesheet = $state('');

	currentFrame = $derived(this.getCurrentFrame());
	isAnimationComplete = $derived(this.getIsAnimationComplete());

	constructor({ frames, frameRate, spritesheet, loop = false }: SpriteConfig) {
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

	nextFrame() {
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
}

/**
 * Sprite class handling animation frames and transformations
 */
type Frame = [number, number];

interface AnimationConfig {
	name: string;
	framesAmount: number;
	frameRate: number;
	loop?: boolean;
}

export class Animation {
	name: string;
	framesAmount = $state(0);
	frameRate = $state(0);
	loop = $state(false);
	currentFrame = $state(0);
	currentFrameTime = $state(0);
	isComplete = $derived(this.getIsAnimationComplete());

	constructor({ name, framesAmount, frameRate, loop = false }: AnimationConfig) {
		this.name = name;
		this.framesAmount = framesAmount;
		this.frameRate = frameRate;
		this.loop = loop;
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
		if (this.currentFrame >= this.framesAmount - 1) {
			if (this.loop) {
				this.currentFrame = 0;
			} else {
				this.currentFrame = this.framesAmount - 1;
			}
		} else {
			this.currentFrame += 1;
		}
	}

	getIsAnimationComplete(): boolean {
		if (this.loop) {
			return false;
		}
		return this.currentFrame === this.framesAmount - 1;
	}
}

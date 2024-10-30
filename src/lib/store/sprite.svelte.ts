// width: 32,
// height: 32,
// spriteSheet: 'enemies',
// animations: [
//     {
//         name: 'walk',
//         frames: [
//             { x: -18, y: -127 },
//             { x: -66, y: -127 },
//             { x: -114, y: -127 },
//             { x: -211, y: -127 },
//             { x: -258, y: -127 }
//         ],
//         frameRate: 6,
//         loop: true
//     },
//     {
//         name: 'die',
//         frames: [
//             { x: -18, y: -127 },
//             { x: -66, y: -127 },
//             { x: -114, y: -127 },
//             { x: -211, y: -127 },
//             { x: -258, y: -127 }
//         ],
//         frameRate: 8,
//         loop: false
//     }
// ],
// defaultAnimation: 'walk'
// },
export class Sprite {
	width = $state();
	height = $state();
	animations = $state();
	currentAnimation = $state();
	currentFrameIndex = $state(0);
	currentFrameTime = $state(0);
	currentFrame = $derived(this.getCurrentFrame());
	isAnimationComplete = $derived(this.checkAnimationComplete());

	// currentFrame = $derived(this.currentAnimation?.frames[this.currentFrameIndex]);
	// isAnimationComplete = $derived(
	// 	this.currentFrameIndex === this.currentAnimation.frames.length - 1 &&
	// 		!this.currentAnimation.loop
	// );

	constructor({ width, height, animations, defaultAnimation }) {
		this.width = width;
		this.height = height;
		this.animations = animations;
		this.setAnimation(defaultAnimation);
	}

	// todo: update this

	setAnimation(name) {
		this.currentAnimation = this.animations.find((animation) => animation.name === name);
		this.currentFrameIndex = 0;
	}

	update(deltaTime: number) {
		if (this.currentAnimation.frameRate === 0) return;

		// todo: move to `animate` function
		// Or create a Class for Animation

		this.currentFrameTime += deltaTime;

		console.log('this.currentFrameIndex', this.currentFrameIndex);

		if (this.currentFrameTime >= 1000 / this.currentAnimation.frameRate) {
			this.currentFrameTime = 0;
			this.currentFrameIndex += 1;

			if (this.currentFrameIndex >= this.currentAnimation.frames.length) {
				if (this.currentAnimation.loop) {
					this.currentFrameIndex = 0;
				} else {
					this.currentFrameIndex = this.currentAnimation.frames.length - 1;
				}
			}
		}
	}

	private getCurrentFrame() {
		return this.currentAnimation?.frames[this.currentFrameIndex];
	}

	private checkAnimationComplete() {
		return (
			this.currentFrameIndex === this.currentAnimation.frames.length - 1 &&
			!this.currentAnimation.loop
		);
	}
}

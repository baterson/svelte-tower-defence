import { getAnimation } from '$lib/config/animations';
import { Animation } from '$lib/store/Animation.svelte';

export const cursors = {
	arrow: '/cursors/cursor-arrow.svg',
	hammer: '/cursors/cursor-hammer.svg'
};

export class Cursor {
	animation = $state<Animation>();

	arrow = $derived(`url(${cursors.arrow}), auto`);
	hammer = $derived(`url(${cursors.hammer}), auto`);

	inAnimation = $derived(this.animation && !this.animation.isComplete);
	currentFrame = $derived(this.getCurrentFrame());

	update(deltaTime: number) {
		if (this.inAnimation) {
			this.animation.update(deltaTime);
		}
	}

	get(name) {
		if (this.inAnimation) {
			return this.currentFrame;
		} else {
			return this[name];
		}
	}

	setAnimation(animation: string) {
		if (!animation) {
			this.animation = null;
			return;
		}

		const animationConfig = getAnimation(animation);

		this.animation = new Animation({ ...animationConfig });
	}

	getCurrentFrame() {
		const { frames } = getAnimation(this.animation.name);
		return `url(${frames[this.animation.currentFrame]}), auto`;
	}
}

export const cursor = new Cursor();

export const cursors = {
	arrow: '/cursor-arrow.svg',
	hammer: '/cursor-hammer.svg'
};

const animations = {
	build: '/cursor-arrow.svg',
	hammer: '/cursor-hammer.svg'
};

export class Cursor {
	type = $state('arrow');
	playBuild = $state(false);

	image = $derived(this.getUrl(this.type));
	animation = $derived(animations[this.type]);

	getUrl(type) {
		return `url(${cursors[type]}), auto`;
	}

	setType(type) {
		this.type = type;
	}

	play(animation) {
		const name = `play${animation}`;
		this[name] = true;
	}

	stop(animation) {
		const name = `play${animation}`;
		this[name] = true;
	}
}

export const cursor = new Cursor();

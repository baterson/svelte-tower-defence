import { Vector2 } from '$lib/store/Vector2.svelte';
import { StateMachine } from '$lib/store/StateMachine.svelte';
import { Animation } from '$lib/store/Animation.svelte';
import { getAnimation } from '$lib/config/animations';
import { screen } from '$lib/store/Screen.svelte';

export class Entity {
	static lastId = 0;
	id;
	x = $state(0);
	y = $state(0);
	name = $state('');
	type = $state('');
	width = $state(0);
	height = $state(0);
	effects = $state.raw([]);
	vfx = $state.raw([]);
	animation = $state.raw<Animation>();
	position = $state<Vector2>();

	offsetPosition = $state<Vector2 | null>(null);
	staticSlot = $state<number | null>(null);

	state = $state<StateMachine>();
	stats = $state({});
	rotation = $state(0);
	scale = $state(1);
	opacity = $state(1);
	isInteractable = $state(true);

	stateToAnimation = $state({});

	upgradeLevel = $state(-1);
	upgrades = $state([]);

	isUpgradable = $derived(this.upgrades.length && this.upgradeLevel < this.upgrades.length);
	// positionWithOffset = $derived(
	// 	this.offsetPosition ? this.position?.add(this.offsetPosition) : this.position
	// );
	// staticPosition = $derived(this.getStaticPosition());

	constructor(
		name,
		position,
		{
			offsetPosition,
			staticSlot,
			width,
			height,
			scale,
			rotation,
			type,
			states,
			initialState,
			onCollide,
			stats,
			upgradeLevel,
			upgrades,
			vfx,
			effects,
			stateToAnimation
		},
		context
	) {
		// Entity stats
		this.id = Entity.lastId++;
		this.name = name;
		this.type = type;
		this.width = width;
		this.height = height;

		this.scale = scale || 1;

		this.rotation = rotation || 0;
		this.position = position;
		this.offsetPosition = offsetPosition || null;
		this.staticSlot = staticSlot || null;

		this.stats = { ...stats };
		this.upgradeLevel = upgradeLevel || -1;
		this.upgrades = upgrades || [];
		this.vfx = vfx || [];
		this.effects = effects || [];
		this.stateToAnimation = stateToAnimation || {};

		// Handle collisions
		this.onCollide = (other) => onCollide(this, other);

		// Sync sprite with state
		const onStateEnter = (stateName) => {
			if (this.stateToAnimation[stateName]) {
				this.setAnimation(stateName);
			}
		};

		this.state = new StateMachine({
			owner: this,
			states,
			initialState,
			onEnter: onStateEnter,
			context
		});
	}

	// get boundingBox() {
	// 	const scaledWidth = this.width * this.scale;
	// 	const scaledHeight = this.height * this.scale;

	// 	const offsetX = (scaledWidth - this.width) / 2;
	// 	const offsetY = (scaledHeight - this.height) / 2;

	// 	const x1 = this.position.x;
	// 	const y1 = this.position.y;
	// 	const x2 = this.position.x;
	// 	const y2 = this.position.y;

	// 	return {
	// 		x1: x1,
	// 		y1: y2,
	// 		x2: x2,
	// 		y2: y2,
	// 		center: new Vector2(x1 + this.width / 2, y2 + this.height / 2),
	// 		topMiddle: new Vector2(x1 + this.width / 2, y2)
	// 	};
	// }

	get boundingBox() {
		// const scaledWidth = this.width * this.scale;
		// const scaledHeight = this.height * this.scale;

		// const offsetX = (scaledWidth - this.width) / 2;
		// const offsetY = (scaledHeight - this.height) / 2;

		const x1 = this.position.x;
		const y1 = this.position.y;
		const x2 = this.position.x + this.width;
		const y2 = this.position.y + this.height;

		return {
			x1: x1,
			y1: y1,
			x2: x2,
			y2: y2,
			center: new Vector2(x1 + this.width / 2, y1 + this.height / 2),
			topMiddle: new Vector2(x1 + this.width / 2, y2)
		};
	}
	// get boundingBox() {
	// 	const scaledWidth = this.width * this.scale;
	// 	const scaledHeight = this.height * this.scale;

	// 	const offsetX = (scaledWidth - this.width) / 2;
	// 	const offsetY = (scaledHeight - this.height) / 2;

	// 	const x1 = this.position.x;
	// 	const y1 = this.position.y;
	// 	const x2 = this.position.x + scaledWidth;
	// 	const y2 = this.position.y + scaledHeight;

	// 	return {
	// 		x1: x1,
	// 		y1: y2,
	// 		x2: x2,
	// 		y2: y2,
	// 		center: new Vector2(x1 + scaledWidth / 2, y1 + scaledHeight / 2),
	// 		topMiddle: new Vector2(x1 + scaledWidth / 2, y2)
	// 	};
	// }

	update(deltaTime: number) {
		if (this.isDestroyed) return;

		this.state.update(deltaTime);

		this.effects.forEach((effectFn) => {
			effectFn(this);
		});

		if (this.animation) {
			this.animation.update(deltaTime);
		}
	}

	setPosition = (position: Vector2) => {
		this.position = position;
	};

	setAnimation(state: string) {
		const name = this.stateToAnimation[state];
		const animationConfig = getAnimation(name);

		this.animation = new Animation({ ...animationConfig, name });
	}

	addEffect(effectFn: (entity: Entity) => void) {
		if (!this.effects.includes(effectFn)) {
			this.effects = [...this.effects, effectFn];
		}
	}

	removeEffect(effectFn: (entity: Entity) => void) {
		this.effects = this.effects.filter((e) => e !== effectFn);
	}

	cleanEffects() {
		this.effects = [];
	}

	addVFX(effect: string) {
		if (!this.vfx.includes(effect)) {
			this.vfx = [...this.vfx, effect];
		}
	}

	removeVFX(effect: string) {
		this.vfx = this.vfx.filter((e) => e !== effect);
	}

	cleanVFX() {
		this.vfx = [];
	}

	takeDamage(damage: number) {
		this.stats.health -= damage;
		// this.addVFX('TakeDamage');
		if (this.stats.health <= 0) {
			this.state.setState('Die');
		}
	}

	stopInteractions() {
		this.isInteractable = false;
	}

	removeCollider() {
		this.onCollide = () => {};
	}

	getStaticPosition() {
		const sideMargin = screen.isMobile ? 10 : 50;
		const bottomMargin = screen.isMobile ? 130 : 200;
		const gap = screen.isMobile ? 20 : 50;

		const isLeftSide = this.staticSlot === 0 || this.staticSlot === 2;
		const isTopRow = this.staticSlot === 0 || this.staticSlot === 1;

		const position = this.positionWithOffset;

		if (isLeftSide) {
			if (isTopRow) {
				return new Vector2(
					position.x + sideMargin,
					position.y + screen.gameAreaHeight - this.height - bottomMargin * 2 - gap
				);
			} else {
				return new Vector2(
					position.x + sideMargin,
					position.y + screen.gameAreaHeight - this.height - bottomMargin
				);
			}
		} else {
			if (isTopRow) {
				return new Vector2(
					position.x + screen.gameAreaWidth - sideMargin - this.width,
					position.y + screen.gameAreaHeight - this.height - bottomMargin * 2 - gap
				);
			} else {
				return new Vector2(
					position.x + screen.gameAreaWidth - sideMargin - this.width,
					position.y + screen.gameAreaHeight - this.height - bottomMargin
				);
			}
		}
	}
}

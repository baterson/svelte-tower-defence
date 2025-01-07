import { Vector2 } from '$lib/store/Vector2.svelte';
import { StateMachine } from '$lib/store/StateMachine.svelte';
import { Animation } from '$lib/store/Animation.svelte';
import { getAnimation } from '$lib/config/animations';
import { screen } from '$lib/store/Screen.svelte';

export class Entity {
	static lastId = 0;
	id;
	name = $state('');
	type = $state('');
	width = $state(0);
	height = $state(0);
	velocity = $state<Vector2>();
	effects = $state([]);

	vfx = $state([]);
	animation = $state<Animation>();
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
	positionWithOffset = $derived(
		this.offsetPosition ? this.position?.add(this.offsetPosition) : this.position
	);
	staticPosition = $derived(this.getStaticPosition());

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

		this.velocity = new Vector2();
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

	get boundingBox() {
		const scaledWidth = this.width * this.scale;
		const scaledHeight = this.height * this.scale;

		const offsetX = (scaledWidth - this.width) / 2;
		const offsetY = (scaledHeight - this.height) / 2;

		return {
			x1: this.position.x - offsetX,
			y1: this.position.y - offsetY,
			x2: this.position.x - offsetX + scaledWidth,
			y2: this.position.y - offsetY + scaledHeight,
			center: new Vector2(
				this.position.x - offsetX + scaledWidth / 2,
				this.position.y - offsetY + scaledHeight / 2
			)
		};
	}

	update(deltaTime: number) {
		if (this.isDestroyed) return;

		this.effects.forEach((effectFn) => {
			effectFn(this);
		});
		this.state.update(deltaTime);

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

	upgrade() {
		if (this.isUpgradable) {
			this.state.setState('Upgrade');
		}
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
		// const sideMargin = screen.isMobile ? 50 : 50;
		const sideMargin = 50;
		const gap = 50;
		const bottomMargin = screen.isMobile ? 150 : 200;

		const isLeftSide = this.staticSlot === 0 || this.staticSlot === 2;
		const isTopRow = this.staticSlot === 0 || this.staticSlot === 1;

		const position = this.positionWithOffset;

		const height = this.height * this.scale;
		const width = this.width * this.scale;

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

// 	getStaticPosition() {
// 		// const sideMargin = screen.isMobile ? 50 : 50;
// 		const sideMargin = 50;
// 		const gap = 50;
// 		const bottomMargin = screen.isMobile ? 150 : 200;

// 		const isLeftSide = this.staticSlot === 0 || this.staticSlot === 2;
// 		const isTopRow = this.staticSlot === 0 || this.staticSlot === 1;

// 		const position = this.positionWithOffset;

//         const height = this.height * this.scale;
//         const width = this.width * this.scale;

// 		if (isLeftSide) {
// 			if (isTopRow) {
// 				return new Vector2(
// 					position.x + sideMargin,
// 					position.y + screen.gameAreaHeight - this.height - bottomMargin * 2 - gap
// 				);
// 			} else {
// 				return new Vector2(
// 					position.x + sideMargin,
// 					position.y + screen.gameAreaHeight - this.height - bottomMargin
// 				);
// 			}
// 		} else {
// 			if (isTopRow) {
// 				return new Vector2(
// 					position.x + screen.gameAreaWidth - sideMargin - this.width,
// 					position.y + screen.gameAreaHeight - this.height - bottomMargin * 2 - gap
// 				);
// 			} else {
// 				return new Vector2(
// 					position.x + screen.gameAreaWidth - sideMargin - this.width,
// 					position.y + screen.gameAreaHeight - this.height - bottomMargin
// 				);
// 			}
// 		}
// 	}
// }

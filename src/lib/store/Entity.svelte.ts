import { Sprite } from '$store/Sprite.svelte';
import { Vector2 } from '$store/Vector2.svelte';
import { StateMachine } from '$store/StateMachine.svelte';

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
	sprite = $state<Sprite>();
	position = $state<Vector2>();
	state = $state<StateMachine>();
	stats = $state({});
	rotation = $state(0);
	scale = $state(1);
	opacity = $state(1);
	isInteractable = $state(true);

	upgradeLevel = $state(0);
	upgrades = $state([]);

	isUpgradable = $derived(this.upgrades.length && this.upgradeLevel < this.upgrades.length);

	constructor(
		name,
		position,
		{
			width,
			height,
			scale,
			rotation,
			type,
			states,
			sprites,
			initialState,
			onCollide,
			stats,
			upgradeLevel,
			upgrades,
			vfx,
			effects
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
		this.velocity = new Vector2();
		this.stats = { ...stats };
		this.upgradeLevel = upgradeLevel || 0;
		this.upgrades = upgrades || [];
		// Entity has either effect or animations
		this.vfx = vfx || [];
		this.effects = effects || [];

		// Handle collisions
		this.onCollide = (other) => onCollide(this, other);

		// Sync sprite with state
		const onStateEnter = (stateName) => {
			if (sprites) {
				this.setSprite(stateName, sprites);
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
		return {
			x1: this.position.x,
			y1: this.position.y,
			x2: this.position.x + this.width,
			y2: this.position.y + this.height,
			center: this.position.clone().add(new Vector2(this.width / 2, this.height / 2))
		};
	}

	update(deltaTime: number) {
		if (this.isDestroyed) return;

		this.effects.forEach((effectFn) => {
			effectFn(this);
		});
		this.state.update(deltaTime);

		if (this.sprite) {
			this.sprite.update(deltaTime);
		}
	}

	setPosition = (position: Vector2) => {
		this.position = position;
	};

	setSprite(name: string, sprites) {
		let sprite;

		for (const entry of sprites) {
			const { animations, spritesheet } = entry;

			sprite = animations.find((sprite) => sprite.name === name);
			if (sprite) {
				this.sprite = new Sprite({ ...sprite, spritesheet });
			}
		}
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
			this.upgrades[this.upgradeLevel](this);

			this.upgradeLevel += 1;
		}
	}

	takeDamage(damage: number) {
		this.stats.health -= damage;

		if (this.stats.health <= 0) {
			this.state.setState('Die');
		}
	}

	stopInteractions() {
		this.isInteractable = false;
	}
}

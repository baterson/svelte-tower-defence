import { fireballCollider, lootCollider } from '../collisionHandlers';

export const projectiles = {
	Fireball: {
		type: 'projectile',
		width: 20,
		height: 22,
		vfx: [],
		initialState: 'FollowTarget',
		stateToAnimation: {
			FollowTarget: 'FireballFollow',
			FollowAngle: 'FireballFollow',
			Explode: 'FireballDie'
		},
		scale: 2,
		stats: {
			health: 1,
			speed: 0.5,
			damage: 11
		},
		onCollide: fireballCollider
	},
	Icebolt: {
		type: 'projectile',
		width: 10,
		height: 27,
		vfx: [],
		initialState: 'FollowTarget',
		stateToAnimation: {
			FollowTarget: 'IceboltFollow',
			FollowAngle: 'IceboltFollow',
			Explode: 'IceboltDie'
		},
		scale: 2,
		stats: {
			health: 1,
			speed: 0.3,
			damage: 11
		},
		onCollide: fireballCollider
	},
	Poisonball: {
		type: 'projectile',
		width: 17,
		height: 16,
		vfx: [],
		initialState: 'FollowTarget',
		stateToAnimation: {
			FollowTarget: 'PoisonballFollow',
			FollowAngle: 'PoisonballFollow',
			Explode: 'PoisonballDie'
		},
		scale: 2,
		stats: {
			health: 1,
			speed: 0.4,
			damage: 11
		},
		onCollide: fireballCollider
	},
	Thunderbolt: {
		type: 'projectile',
		width: 17,
		height: 31,
		vfx: [],
		initialState: 'FollowTarget',
		stateToAnimation: {
			FollowTarget: 'ThunderboltFollow',
			FollowAngle: 'ThunderboltFollow',
			Explode: 'ThunderboltDie'
		},
		scale: 2,
		stats: {
			health: 1,
			speed: 0.4,
			damage: 11
		},
		onCollide: fireballCollider
	},

	Loot: {
		type: 'loot',
		vfx: [],
		width: 14,
		height: 19,
		initialState: 'FollowTarget',
		stateToAnimation: {
			FollowTarget: 'Loot'
		},
		scale: 1,
		stats: {
			health: 1,
			damage: 0,
			speed: 0.5
		},
		onCollide: lootCollider
	},

	ClickExplode: {
		type: 'projectile',
		vfx: [],
		width: 30,
		height: 30,
		initialState: 'Explode',
		stateToAnimation: {
			Explode: 'Click'
		},
		scale: 1,
		stats: {
			health: 1,
			damage: 10,
			speed: 0.5
		}
	}
};

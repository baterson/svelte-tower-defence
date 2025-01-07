import { fireballCollider, lootCollider } from '../collisionHandlers';

export const projectiles = {
	Fireball: {
		type: 'projectile',
		width: 20,
		height: 22,
		vfx: [],
		initialState: 'FollowTarget',
		stateToAnimation: {
			FollowTarget: 'Fireball',
			FollowAngle: 'Fireball',
			Explode: 'FireballDie'
		},
		scale: 2,
		stats: {
			health: 1,
			speed: 0.5,
			damage: 1000
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
			FollowTarget: 'Icebolt',
			FollowAngle: 'Icebolt',
			Explode: 'IceboltDie'
		},
		scale: 2,
		stats: {
			health: 1,
			speed: 0.3,
			damage: 10
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
			FollowTarget: 'Poisonball',
			FollowAngle: 'Poisonball',
			Explode: 'PoisonballDie'
		},
		scale: 2,
		stats: {
			health: 1,
			speed: 0.3,
			damage: 10
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
			FollowTarget: 'Thunderbolt',
			FollowAngle: 'Thunderbolt',
			Explode: 'ThunderboltDie'
		},
		scale: 2,
		stats: {
			health: 1,
			speed: 0.3,
			damage: 10
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
			FollowTarget: 'Fireball'
		},
		scale: 1,
		stats: {
			health: 1,
			damage: 0,
			speed: 0.5
		},
		onCollide: lootCollider
	}
};

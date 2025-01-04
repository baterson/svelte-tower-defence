import { fireballCollider, lootCollider } from '../collisionHandlers';

import { projectileCollider } from '../collisionHandlers';

export const projectiles = {
	Fireball: {
		type: 'projectile',
		width: 14,
		height: 19,
		vfx: [],
		initialState: 'FollowThroughTarget',
		states: ['FollowThroughTarget', 'Die', 'FollowPoint'],
		stateToAnimation: {
			FollowThroughTarget: 'Fireball',
			FollowPoint: 'Fireball',
			Die: 'Firebal'
		},
		scale: 3,
		stats: {
			health: 1,
			speed: 0.3,
			damage: 10
		},
		onCollide: fireballCollider
	},
	Icebolt: {
		type: 'projectile',
		width: 10,
		height: 27,
		vfx: [],
		initialState: 'FollowThroughTarget',
		states: ['FollowThroughTarget', 'Die', 'FollowPoint'],
		stateToAnimation: {
			FollowThroughTarget: 'Icebolt',
			FollowPoint: 'Icebolt',
			Die: 'Icebolt'
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
		initialState: 'FollowThroughTarget',
		states: ['FollowThroughTarget', 'Die', 'FollowPoint'],
		stateToAnimation: {
			FollowThroughTarget: 'Poisonball',
			FollowPoint: 'Poisonball',
			Die: 'Poisonball'
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
		initialState: 'FollowThroughTarget',
		states: ['FollowThroughTarget', 'Die', 'FollowPoint'],
		stateToAnimation: {
			FollowThroughTarget: 'Thunderbolt',
			FollowPoint: 'Thunderbolt',
			Die: 'Thunderbolt'
		},
		scale: 2,
		stats: {
			health: 1,
			speed: 0.3,
			damage: 10
		},
		onCollide: fireballCollider
	},

	loot: {
		type: 'loot',

		vfx: [],

		width: 15,
		height: 15,
		initialState: 'FollowTarget',
		stateToAnimation: {
			FollowTarget: 'Fireball',
			FollowPoint: 'Fireball',
			Die: 'Fireball'
		},
		stats: {
			health: 1,
			damage: 0,
			speed: 0.2
		},
		onCollide: lootCollider
	}
};

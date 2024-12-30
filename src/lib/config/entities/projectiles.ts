import { animations } from '../animations';
import { fireballCollider, lootCollider } from '../collisionHandlers';

import { projectileCollider } from '../collisionHandlers';

export const projectiles = {
	fireball: {
		type: 'projectile',
		width: 10,
		height: 16,
		vfx: [],
		initialState: 'FollowThroughTarget',
		states: ['FollowThroughTarget', 'Die', 'FollowPoint'],
		stateToAnimation: {
			FollowThroughTarget: animations.Fireball,
			FollowPoint: animations.Fireball,
			Die: animations.Fireball
		},
		stats: {
			scale: 2,
			health: 1,
			speed: 0.3,
			damage: 10
		},
		onCollide: fireballCollider
	},
	projectile2: {
		type: 'projectile',
		width: 18,
		height: 18,
		vfx: [],
		initialState: 'FollowTarget',
		stateToAnimation: {
			FollowTarget: animations.Fireball,
			FollowPoint: animations.Fireball,
			Die: animations.Fireball
		},
		stats: {
			health: 1,
			speed: 0.03,
			damage: 1
		},
		onCollide: projectileCollider
	},

	loot: {
		type: 'loot',

		vfx: [],

		width: 15,
		height: 15,
		initialState: 'FollowTarget',
		stateToAnimation: {
			FollowTarget: animations.Fireball,
			FollowPoint: animations.Fireball,
			Die: animations.Fireball
		},
		stats: {
			health: 1,
			damage: 0,
			speed: 0.2
		},
		onCollide: lootCollider
	},
	thronePower: {
		type: 'projectile',
		width: 600,
		height: 100,
		initialState: 'FollowTarget',
		stateToAnimation: {
			FollowTarget: animations.Fireball,
			FollowPoint: animations.Fireball,
			Die: animations.Fireball
		},
		effects: ['ThronePowerProjectile'],
		stats: {
			health: 1,
			damage: 999,
			speed: 0.2
		},
		onCollide: projectileCollider
	}
};
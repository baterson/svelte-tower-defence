import { fireballCollider, lootCollider } from '../collisionHandlers';

import { projectileCollider } from '../collisionHandlers';

export const projectiles = {
	fireball: {
		type: 'projectile',
		width: 18,
		height: 18,
		vfx: ['FireBall'],
		initialState: 'FollowThroughTarget',
		states: ['FollowThroughTarget', 'Die', 'FollowPoint'],
		stats: {
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
		vfx: ['FrostBall'],
		initialState: 'FollowTarget',
		states: ['FollowTarget', 'Die'],
		stats: {
			health: 1,
			speed: 0.5,
			damage: 1
		},
		onCollide: projectileCollider
	},

	loot: {
		type: 'loot',

		vfx: ['Loot'],

		width: 15,
		height: 15,
		initialState: 'FollowTarget',
		states: ['FollowTarget', 'Die'],
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
		states: ['FollowTarget', 'Die'],
		effects: ['ThronePowerProjectile'],
		stats: {
			health: 1,
			damage: 999,
			speed: 0.2
		},
		onCollide: projectileCollider
	}
};

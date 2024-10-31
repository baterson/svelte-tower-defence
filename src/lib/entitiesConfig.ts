export const SPRITE_URL = '/sprite.png';

export const entities = {
	archer: {
		width: 24,
		height: 28,
		spriteSheet: '/archerEnemy.sprite.png',
		states: {
			run: {
				frames: [
					[-20, -222],
					[-69, -222],
					[-116, -222],
					[-163, -223]
				],
				frameRate: 10,
				loop: true
			},
			shoot: {
				frames: [
					[-12, -170],
					[-60, -170],
					[-110, -170],
					[-159, -170],
					[-23, -12],
					[-71, -12],
					[-119, -12],
					[-167, -12]
				],
				frameRate: 10
			},
			die: {
				frames: [
					[-20, -223],
					[-69, -223],
					[-118, -223],
					[-157, -223],
					[-186, -223]
				],
				frameRate: 10,
				loop: true
			}
		},
		defaultState: 'run',
		stats: {
			health: 100,
			speed: 0,
			damage: 10
		}
	},
	tower1: {
		width: 64,
		height: 64,
		spriteSheet: '/Towers.sprite.png',
		states: {
			place: {
				frames: [
					[-20, -222],
					[-69, -222],
					[-116, -222],
					[-163, -223]
				],
				frameRate: 10
			},
			idle: {
				frames: [
					[-20, -223],
					[-69, -223],
					[-118, -223],
					[-157, -223],
					[-186, -223]
				],
				frameRate: 10,
				loop: true
			},
			shot: {
				frames: [
					[-20, -223],
					[-69, -223],
					[-118, -223],
					[-157, -223],
					[-186, -223]
				],
				frameRate: 10
			},
			die: {
				frames: [
					[-20, -223],
					[-69, -223],
					[-118, -223],
					[-157, -223],
					[-186, -223]
				],
				frameRate: 10
			}
		},
		defaultState: 'idle',
		stats: {
			health: 100,
			speed: 0,
			damage: 10
		}
	}
};

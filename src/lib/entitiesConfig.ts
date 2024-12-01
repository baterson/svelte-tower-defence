export const SPRITE_URL = '/sprite.png';

const entities = {
	enemy1: {
		name: 'enemy1',
		type: 'enemy',
		width: 30,
		height: 40,
		spriteSheet: '/1st_enemy_run.png',
		defaultState: 'Run',
		states: ['Run', 'Shoot', 'Die'],
		sprites: [
			{
				name: 'Run',
				frames: [
					[-19, -15],
					[-82, -15],
					[-145, -15],
					[-210, -15],
					[-274, -15],
					[-338, -15],
					[-402, -15],
					[-466, -15]
				],
				frameRate: 10,
				loop: true
			},
			{
				name: 'Shoot',
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
			{
				name: 'Die',
				frames: [
					[-20, -223],
					[-69, -223],
					[-118, -223],
					[-157, -223],
					[-186, -223]
				],
				frameRate: 10
			}
		],
		stats: {
			health: 100,
			speed: 0.09,
			damage: 10
		}
	},
	enemy2: {
		name: 'enemy2',
		type: 'enemy',
		width: 30,
		height: 40,
		spriteSheet: '/2nd_enemy_run.png',
		defaultState: 'Run',
		states: ['Run', 'Shoot', 'Die'],
		sprites: [
			{
				name: 'Run',
				frames: [
					[-19, -15],
					[-82, -15],
					[-145, -15],
					[-210, -15],
					[-274, -15],
					[-338, -15],
					[-402, -15],
					[-466, -15]
				],
				frameRate: 10,
				loop: true
			},
			{
				name: 'Shoot',
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
			{
				name: 'Die',
				frames: [
					[-20, -223],
					[-69, -223],
					[-118, -223],
					[-157, -223],
					[-186, -223]
				],
				frameRate: 10
			}
		],
		stats: {
			health: 100,
			speed: 0.09,
			damage: 10
		}
	},
	enemy3: {
		name: 'enemy3',
		type: 'enemy',
		width: 30,
		height: 40,
		spriteSheet: '/3rd_enemy_run.png',
		defaultState: 'Run',
		states: ['Run', 'Shoot', 'Die'],
		sprites: [
			{
				name: 'Run',
				frames: [
					[-19, -15],
					[-82, -15],
					[-145, -15],
					[-210, -15],
					[-274, -15],
					[-338, -15],
					[-402, -15],
					[-466, -15]
				],
				frameRate: 10,
				loop: true
			},
			{
				name: 'Shoot',
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
			{
				name: 'Die',
				frames: [
					[-20, -223],
					[-69, -223],
					[-118, -223],
					[-157, -223],
					[-186, -223]
				],
				frameRate: 10
			}
		],
		stats: {
			health: 100,
			speed: 0.09,
			damage: 10
		}
	},

	blueTower: {
		name: 'blueTower',
		type: 'tower',
		width: 36,
		height: 64,
		spriteSheet: '/blueTower.png',
		defaultState: 'NotBuilt',
		states: ['Build', 'Idle', 'Shoot', 'NotBuilt'],
		sprites: [
			{
				name: 'Build',
				frames: [
					[-19, -8],
					[-83, -8],
					[-147, -8],
					[-211, -8],
					[-275, -8],
					[-339, -8],
					[-403, -8],
					[-467, -8],
					[-531, -8],
					[-595, -8],
					[-659, -8],
					[-723, -8],
					[-787, -8],
					[-851, -8],
					[-915, -8],
					[-979, -8],
					[-1043, -8],
					[-1107, -8],
					[-1171, -8]
				],
				frameRate: 10
			},
			{
				name: 'Shoot',
				frames: [
					[-19, -77],
					[-83, -77],
					[-147, -77],
					[-211, -77]
				],
				frameRate: 10
			},
			{
				name: 'Idle',
				frames: [
					[-19, -147],
					[-83, -147],
					[-147, -147],
					[-211, -147]
				],
				loop: true,
				frameRate: 10
			},
			{
				name: 'NotBuilt',
				frames: [[-19, -8]],
				loop: true,
				frameRate: 1
			}
		],
		stats: {
			health: 200,
			attackRange: 150,
			attackSpeed: 0.5,
			damage: 20
		}
	},

	projectile: {
		name: 'projectile',
		type: 'projectile',
		width: 20,
		height: 20,
		spriteSheet: '/projectile.png',
		defaultState: 'Fly',
		states: ['Fly'],
		sprites: [
			{
				name: 'Fly',
				frames: [
					[-19, -15],
					[-82, -15],
					[-145, -15],
					[-210, -15],
					[-274, -15]
				],
				frameRate: 10,
				loop: true
			},
			{
				name: 'Impact',
				frames: [
					[-19, -15],
					[-402, -15],
					[-466, -15]
				],
				frameRate: 10
			}
		],
		stats: {
			speed: 0.5,
			damage: 20
		}
	}
};

export const getConfig = (name: string) => {
	if (!entities[name]) throw new Error(`Entity config not found for: ${name}`);

	return entities[name];
};

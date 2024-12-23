export const sprites = {
	enemy1: {
		spritesheet: '/1st_enemy_run.png',
		animations: [
			{
				name: 'Idle',
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
				name: 'Run',
				frames: [
					[-19, -5],
					[-82, -5],
					[-145, -5],
					[-210, -5],
					[-274, -5],
					[-338, -5],
					[-402, -5],
					[-466, -5]
				],
				frameRate: 10,
				loop: true
			},
			{
				name: 'Shoot',
				frames: [
					[-12, -170],
					[-60, -170],
					[-167, -12]
				],
				frameRate: 10
			},
			{
				name: 'Die',
				frames: [
					[-19, -15],
					[-19, -15],
					[-19, -15],
					[-274, -15],
					[-274, -15],
					[-274, -15],
					[-19, -15],
					[-274, -15]
				],
				frameRate: 20
			},
			{
				name: 'StunAllTowers',
				frames: [
					[-19, -15],
					[-19, -15],
					[-19, -15],
					[-274, -15],
					[-274, -15],
					[-274, -15],
					[-19, -15],
					[-274, -15]
				],
				loop: true,
				frameRate: 20
			},
			{
				name: 'RunToPoint',
				frames: [
					[-19, -5],
					[-82, -5],
					[-145, -5],
					[-210, -5],
					[-274, -5],
					[-338, -5],
					[-402, -5],
					[-466, -5]
				],
				loop: true,
				frameRate: 20
			}
		]
	},
	enemy2: {
		spritesheet: '/2nd_enemy_run.png',
		animations: [
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
					[-167, -12]
				],
				frameRate: 10
			},
			{
				name: 'Die',
				frames: [
					[-19, -15],
					[-19, -15],
					[-19, -15],
					[-274, -15],
					[-274, -15],
					[-274, -15],
					[-19, -15],
					[-274, -15]
				],
				frameRate: 20
			}
		]
	},
	enemy3: {
		spritesheet: '/3rd_enemy_run.png',
		animations: [
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
					[-167, -12]
				],
				frameRate: 10
			},
			{
				name: 'Die',
				frames: [
					[-19, -15],
					[-19, -15],
					[-19, -15],
					[-274, -15],
					[-274, -15],
					[-274, -15],
					[-19, -15],
					[-274, -15]
				],
				frameRate: 10
			}
		]
	},
	enemy4: {
		spritesheet: '/4rd_flying_enemy.png',
		animations: [
			{
				name: 'Fly',
				frames: [
					[-19, -5],
					[-82, -5],
					[-145, -5],
					[-210, -5],
					[-274, -5],
					[-338, -5],
					[-402, -5],
					[-466, -5]
				],
				frameRate: 10,
				loop: true
			},
			{
				name: 'Shoot',
				frames: [
					[-12, -170],
					[-60, -170],
					[-167, -12]
				],
				frameRate: 10
			},
			{
				name: 'Die',
				frames: [
					[-19, -15],
					[-19, -15],
					[-19, -15],
					[-274, -15],
					[-274, -15],
					[-274, -15],
					[-19, -15],
					[-274, -15]
				],
				frameRate: 20
			}
		]
	},
	enemy5: {
		spritesheet: '/5rd_сar_enemy.png',
		animations: [
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
					[-167, -12]
				],
				frameRate: 10
			},
			{
				name: 'Die',
				frames: [
					[-19, -15],
					[-19, -15],
					[-19, -15],
					[-274, -15],
					[-274, -15],
					[-274, -15],
					[-19, -15],
					[-274, -15]
				],
				frameRate: 20
			}
		]
	},

	blueTower: {
		spritesheet: '/blueTower.png',
		animations: [
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
				frameRate: 40
			},
			{
				name: 'Guard',
				frames: [
					[-19, -147],
					[-83, -147],
					[-147, -147],
					[-211, -147]
				],
				loop: true,
				frameRate: 5
			},
			{
				name: 'NotBuilt',
				frames: [[-19, -8]],
				loop: true,
				frameRate: 1
			},
			{
				name: 'Die',
				frames: [
					[-1171, -8],
					[-1107, -8],
					[-1043, -8],
					[-979, -8],
					[-915, -8],
					[-851, -8],
					[-787, -8],
					[-723, -8],
					[-659, -8],
					[-595, -8],
					[-531, -8],
					[-467, -8],
					[-403, -8],
					[-339, -8],
					[-275, -8],
					[-211, -8],
					[-147, -8],
					[-83, -8]
				],
				loop: false,
				frameRate: 30
			}
		]
	},
	moon: {
		spritesheet: '/Moon.sprite.png',
		animations: [
			{
				name: 'Guard',
				frames: [
					[-5, -5],
					[-5, -58],
					[-5, -111],
					[-5, -164],
					[-5, -217],
					[-5, -270],
					[-5, -323],
					[-5, -376],
					[-5, -429],
					[-5, -482],
					[-5, -535],
					[-5, -588],
					[-5, -641],
					[-5, -694],
					[-5, -747],
					[-5, -800],
					[-5, -853],
					[-5, -906],
					[-5, -959],
					[-5, -1012],
					[-5, -1065],
					[-5, -1118],
					[-5, -1171],
					[-5, -1224],
					[-5, -1277],
					[-5, -1330],
					[-5, -1383],
					[-5, -1436],
					[-5, -1489],
					[-5, -1542],
					[-5, -1595],
					[-5, -1648],
					[-5, -1701],
					[-5, -1754],
					[-5, -1807],
					[-5, -1860],
					[-5, -1913],
					[-5, -1966],
					[-5, -2019],
					[-5, -2072],
					[-5, -2125],
					[-5, -2178],
					[-5, -2231],
					[-5, -2284],
					[-5, -2337],
					[-5, -2390],
					[-5, -2443],
					[-5, -2496],
					[-5, -2549],
					[-5, -2602],
					[-5, -2655],
					[-5, -2708],
					[-5, -2761],
					[-5, -2814],
					[-5, -2867],
					[-5, -2920],
					[-5, -2973],
					[-5, -3026],
					[-5, -3079],
					[-5, -3132]
				],
				frameRate: 30,
				loop: true
			},
			{
				name: 'Die',
				frames: [
					[-5, -3132],
					[-5, -3079],
					[-5, -3026],
					[-5, -2973],
					[-5, -2920],
					[-5, -2867],
					[-5, -2814],
					[-5, -2761],
					[-5, -2708],
					[-5, -2655],
					[-5, -2602],
					[-5, -2549],
					[-5, -2496],
					[-5, -2443],
					[-5, -2390],
					[-5, -2337],
					[-5, -2284],
					[-5, -2231],
					[-5, -2178],
					[-5, -2125],
					[-5, -2072],
					[-5, -2019],
					[-5, -1966],
					[-5, -1913],
					[-5, -1860],
					[-5, -1807],
					[-5, -1754],
					[-5, -1701],
					[-5, -1648],
					[-5, -1595],
					[-5, -1542],
					[-5, -1489],
					[-5, -1436],
					[-5, -1383],
					[-5, -1330],
					[-5, -1277],
					[-5, -1224],
					[-5, -1171],
					[-5, -1118],
					[-5, -1065],
					[-5, -1012],
					[-5, -959],
					[-5, -906],
					[-5, -853],
					[-5, -800],
					[-5, -747],
					[-5, -694],
					[-5, -641],
					[-5, -588],
					[-5, -535],
					[-5, -482],
					[-5, -429],
					[-5, -376],
					[-5, -323],
					[-5, -270],
					[-5, -217],
					[-5, -164],
					[-5, -111],
					[-5, -58],
					[-5, -5]
				],
				frameRate: 20,
				loop: false
			}
		]
	},

	// PROJECTILES
	projectile: {
		spritesheet: '/projectile.png',
		animations: [
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
				name: 'Hit',
				frames: [
					[-19, -15],
					[-402, -15],
					[-466, -15]
				],
				frameRate: 10
			}
		]
	},

	laser: {
		spritesheet: '/laser.png',
		animations: [
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
				name: 'Hit',
				frames: [
					[-19, -15],
					[-402, -15],
					[-466, -15]
				],
				frameRate: 10
			}
		]
	}
};
/**
 * Animation configurations for all game entities
 * @module animations
 */

export const animations = {
	enemy1: [
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
			frameRate: 3,
			loop: true
		},
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
	],
	enemy2: [
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
	],
	enemy3: [
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
	],
	blueTower: [
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
	],
	projectile: [
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
	],
	laser: [
		{
			name: 'Laser',
			frames: [
				[-19, -15],
				[-82, -15],
				[-145, -15],
				[-210, -15],
				[-274, -15]

				// [-20, -74],
				// [-50, -74],
				// [-80, -74],
				// [-70, -74]
			],
			frameRate: 10,
			loop: false
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
	]
};

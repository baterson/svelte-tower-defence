/**
 * Animation configurations for all game entities
 * @module animations
 */

export const animations = {
	enemy1: [
		{
			name: 'Idle',
			frames: [[-19, -15]],
			frameRate: 10,
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
				[-20, -223],
				[-69, -223],
				[-118, -223],
				[-157, -223],
				[-186, -223]
			],
			frameRate: 10
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
				[-20, -223],
				[-69, -223],
				[-118, -223],
				[-157, -223],
				[-186, -223]
			],
			frameRate: 10
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
				[-20, -223],
				[-69, -223],
				[-118, -223],
				[-157, -223],
				[-186, -223]
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

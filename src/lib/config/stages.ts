export const stages = [
	{
		commonEnemies: ['PurpleBlobEnemy', 'RedBlobEnemy'],
		time: 30000,
		eliteEnemies: ['YellowBlobEnemy'],
		spawnDelays: {
			common: 2000,
			elite: 2300
		},
		statsAmplify: {
			health: 1,
			speed: 1,
			damage: 1
		}
	},
	{
		commonEnemies: ['PurpleBlobEnemy', 'RedBlobEnemy', 'YellowBlobEnemy', 'BlueBlobEnemy'],
		eliteEnemies: ['GreyCircleEnemy'],
		time: 45000,
		spawnDelays: {
			common: 1200,
			elite: 2000
		},
		statsAmplify: {
			health: 1.5,
			speed: 1.2,
			damage: 1.3
		}
	},
	{
		commonEnemies: ['PurpleBlobEnemy', 'RedBlobEnemy', 'YellowBlobEnemy', 'BlueBlobEnemy'],
		eliteEnemies: ['GreenFlatEnemy', 'GreyCircleEnemy'],
		time: 60000,
		spawnDelays: {
			common: 1000,
			elite: 1700
		},
		statsAmplify: {
			health: 1.7,
			speed: 1.4,
			damage: 1.5
		}
	},
	{
		commonEnemies: [
			'PurpleBlobEnemy',
			'RedBlobEnemy',
			'GreenFlatEnemy',
			'YellowBlobEnemy',
			'BlueBlobEnemy'
		],
		eliteEnemies: ['GreenFlatEnemy', 'GreyCircleEnemy', 'GreyBlobEnemy'],
		time: 90000,
		spawnDelays: {
			common: 800,
			elite: 1400
		},
		statsAmplify: {
			health: 1.9,
			speed: 1.6,
			damage: 1.7
		}
	}
];

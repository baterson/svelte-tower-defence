export const stages = [
	{
		commonEnemies: ['PurpleBlobEnemy', 'RedBlobEnemy'],
		time: 30000,
		eliteEnemies: ['YellowBlobEnemy'],
		spawnDelays: {
			common: 400,
			elite: 600
		}
	},
	{
		commonEnemies: [
			'PurpleBlobEnemy',
			'RedBlobEnemy',
			'GreyBlobEnemy',
			'YellowBlobEnemy',
			'BlueBlobEnemy'
		],
		eliteEnemies: ['GreyCircleEnemy', 'GreyBlobEnemy'],
		time: 45000,
		spawnDelays: {
			common: 1200,
			elite: 2000
		}
	},
	{
		commonEnemies: [
			'PurpleBlobEnemy',
			'RedBlobEnemy',
			'GreyBlobEnemy',
			'YellowBlobEnemy',
			'BlueBlobEnemy'
		],
		eliteEnemies: ['GreenFlatEnemy', 'GreyCircleEnemy'],
		time: 60000,
		spawnDelays: {
			common: 1000,
			elite: 1700
		}
	},
	{
		commonEnemies: [
			'PurpleBlobEnemy',
			'RedBlobEnemy',
			'GreyBlobEnemy',
			'GreyCircleEnemy',
			'GreenFlatEnemy',
			'YellowBlobEnemy',
			'BlueBlobEnemy'
		],
		eliteEnemies: ['GreenFlatEnemy', 'GreyCircleEnemy', 'GreyBlobEnemy'],
		time: 90000,
		spawnDelays: {
			common: 800,
			elite: 1400
		}
	}
];

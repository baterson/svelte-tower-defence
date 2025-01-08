export const stages = [
	{
		commonEnemies: ['PurpleBlobEnemy'],
		time: 60000,
		eliteEnemies: ['RedBlobEnemy'],
		spawnDelays: {
			common: 300,
			elite: 700
			// common: 1000,
			// elite: 1500
		},
		statsAmplify: {
			health: 1,
			speed: 1,
			damage: 1
		}
	},
	{
		commonEnemies: ['YellowBlobEnemy', 'BlueBlobEnemy'],
		eliteEnemies: ['GreyCircleEnemy', 'RedBlobEnemy'],
		time: 120000,
		spawnDelays: {
			common: 800,
			elite: 1300
		},
		statsAmplify: {
			health: 1.4,
			speed: 1.2,
			damage: 1.2
		}
	},
	{
		commonEnemies: ['PurpleBlobEnemy', 'YellowBlobEnemy', 'BlueBlobEnemy'],
		eliteEnemies: ['GreenFlatEnemy', 'GreyCircleEnemy', 'RedBlobEnemy'],
		time: 150000,
		spawnDelays: {
			common: 600,
			elite: 1100
		},
		statsAmplify: {
			health: 1.8,
			speed: 1.4,
			damage: 1.5
		}
	},
	{
		commonEnemies: ['PurpleBlobEnemy', 'YellowBlobEnemy', 'BlueBlobEnemy'],
		eliteEnemies: ['GreenFlatEnemy', 'GreyCircleEnemy', 'GreyBlobEnemy', 'RedBlobEnemy'],
		time: 240000,
		spawnDelays: {
			common: 400,
			elite: 800
		},
		statsAmplify: {
			health: 2.2,
			speed: 1.6,
			damage: 1.8
		}
	}
];

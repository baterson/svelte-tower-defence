export const stages = [
	{
		// commonEnemies: ['PurpleCommon', 'YellowCommon', 'BlueCommon'],
		commonEnemies: ['PurpleCommon', 'RedBlobElite'],
		time: 2000,
		eliteEnemies: ['RedBlobElite'],
		spawnDelays: {
			// common: 300,
			// elite: 700
			common: 700,
			elite: 1000
			// elite: 1500
		},
		statsAmplify: {
			health: 1,
			speed: 1,
			damage: 1
		}
	},
	{
		commonEnemies: ['YellowCommon', 'BlueCommon'],
		eliteEnemies: ['GreenCircleElite', 'RedBlobElite'],
		// time: 120000,
		time: 3000,
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
		commonEnemies: ['PurpleCommon', 'YellowCommon', 'BlueCommon'],
		eliteEnemies: ['BlueBlobElite', 'GreenCircleElite', 'RedBlobElite'],
		// time: 150000,
		time: 3000,
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
		commonEnemies: ['PurpleCommon', 'YellowCommon', 'BlueCommon'],
		eliteEnemies: ['BlueBlobElite', 'GreenCircleElite', 'BlueBlobElite', 'RedBlobElite'],
		// time: 240000,
		time: 3000,
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

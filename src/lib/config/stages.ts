export const stages = [
	{
		commonGroups: [
			{
				types: [
					'PurpleBlobEnemy',
					'RedBlobEnemy',
					'GreyBlobEnemy',
					'YellowBlobEnemy',
					'BlueBlobEnemy'
				],
				count: 3,
				spawnPosition: [70, 190, 310],
				spawnInterval: 2000
			}
		],
		eliteSpawns: [
			{
				types: ['GreenFlatEnemy', 'GreyCircleEnemy'],
				spawnInterval: 25000
			}
		],
		time: 25000
	},
	{
		commonGroups: [
			{
				types: ['PurpleBlobEnemy', 'RedBlobEnemy', 'GreyBlobEnemy'],
				count: 4,
				spawnPosition: [70, 160, 250, 310],
				spawnInterval: 1500
			}
		],
		eliteSpawns: [
			{
				types: ['GreenFlatEnemy', 'GreyCircleEnemy'],
				spawnInterval: 4000
			}
		],
		time: 10000
	}
];

export const SPRITE_URL = '/sprite.png';

export const towers = {
	tower1: {
		sprite: {
			width: 68,
			height: 68,
			animations: [
				{
					name: 'idle',
					frames: [{ x: -650, y: -396 }],
					frameRate: 1,
					loop: true
				},
				{
					name: 'atack',
					frames: [{ x: -650, y: -396 }],
					frameRate: 6,
					loop: false
				}
			],
			defaultAnimation: 'idle'
		},
		stats: {
			health: 100,
			atackSpeed: 0,
			damage: 10
		}
	}
};

export const entities = {
	enemy: {
		sprite: {
			width: 32,
			height: 32,
			spriteSheet: 'enemies',
			animations: [
				{
					name: 'walk',
					frames: [
						{ x: -18, y: -127 },
						{ x: -66, y: -127 },
						{ x: -114, y: -127 },
						{ x: -211, y: -127 },
						{ x: -258, y: -127 }
					],
					frameRate: 6,
					loop: true
				},
				{
					name: 'die',
					frames: [
						{ x: -18, y: -127 },
						{ x: -66, y: -127 },
						{ x: -114, y: -127 },
						{ x: -211, y: -127 },
						{ x: -258, y: -127 }
					],
					frameRate: 8,
					loop: false
				}
			],
			defaultAnimation: 'walk'
		},
		collider: {
			width: 32,
			height: 32
		},
		stats: {
			health: 100,
			speed: 0,
			damage: 10
		}
	}
};

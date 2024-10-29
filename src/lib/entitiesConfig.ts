export const SPRITE_URL = '/sprite.png';

export const entities = {
	gun: {
		sprite: {
			x: -645,
			y: -537
		},
		width: 48,
		height: 20
	},
	blade: {
		sprite: {
			x: -6,
			y: -675
		},
		width: 47,
		height: 47
	},
	tower: {
		sprite: {
			x: -650,
			y: -396
		},
		width: 86,
		height: 71
	},
	enemy: {
		animations: {
			walk: [
				{ x: -18, y: -127 },
				{ x: -66, y: -127 },
				{ x: -114, y: -127 },
				{ x: -211, y: -127 },
				{ x: -258, y: -127 }
			]
		},
		width: 24,
		height: 24
		// width: 19,
		// height: 22
	}
};

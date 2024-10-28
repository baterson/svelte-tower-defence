export const SPRITE_URL = '/sprites.png';

export const sprites = {
	gun: {
		x: -640,
		y: -214,
		width: 48,
		height: 20
	},
	blade: {
		x: -1,
		y: -352,
		width: 47,
		height: 47
	}
};

export const buildStyle = (sprite, position) => {
	return `background: url(${SPRITE_URL}) no-repeat ${sprite.x}px ${sprite.y}px; width: ${sprite.width}px; height: ${sprite.height}px;`;
};

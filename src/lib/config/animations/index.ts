import * as Enemies from './enemies';
import * as Towers from './towers';
import * as Projectiles from './projectiles';
import { Throne } from './Throne';

export const animations = {
	Throne,
	...Enemies,
	...Towers,
	...Projectiles
};

export const getAnimation = (name: string) => {
	if (!animations[name]) throw new Error(`Animation config not found for: ${name}`);
	const animation = animations[name];

	return animation;
};

import * as Enemies from './enemies';
import * as Towers from './towers';
import * as Projectiles from './projectiles';
import * as Cursors from './cursors';
import { Throne } from './Throne';
import { Loot } from './Loot';

export const animations = {
	Throne,
	Loot,
	...Enemies,
	...Towers,
	...Projectiles,
	...Cursors
};

export const getAnimation = (name: string) => {
	if (!animations[name]) throw new Error(`Animation config not found for: ${name}`);
	const animation = animations[name];

	return animation;
};

import { Fireball } from './Fireball';
import { Poisonball } from './Poisonball';
import { Icebolt } from './Icebolt';
import { Thunderbolt } from './Thunderbolt';
import { Base } from './Base';
import { FireTower } from './Towers/FireTower';
import { PoisonTower } from './PoisonTower';
import { ThunderTower } from './Towers/ThunderTower';
import { NotBuilt } from './Towers/NotBuilt';
import { Bulid } from './Towers/Bulid';
import { IceTower } from './Towers/IceTower';

import { PurpleBlobEnemy } from './Enemy/PurpleBlobEnemy';
import { GreenFlatEnemy } from './Enemy/GreenFlatEnemy';
import { RedBlobEnemy } from './Enemy/RedBlobEnemy';
import { GreyBlobEnemy } from './Enemy/GreyBlobEnemy';

export const animations = {
	Base,
	FireTower,
	PoisonTower,
	ThunderTower,
	Fireball,
	Poisonball,
	Icebolt,
	Thunderbolt,
	NotBuilt,
	Bulid,

	...PurpleBlobEnemy,
	...GreenFlatEnemy,
	...RedBlobEnemy,
	...GreyBlobEnemy,
	...IceTower
} as const;

export const getAnimation = (name: string) => {
	if (!animations[name]) throw new Error(`Animation config not found for: ${name}`);
	const animation = animations[name];
	// animation.frames.map((frame) => frame.default || frame);

	return animation;
};

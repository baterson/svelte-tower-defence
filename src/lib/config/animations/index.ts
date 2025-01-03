import { Fireball } from './Fireball';
import { Poisonball } from './Poisonball';
import { Icebolt } from './Icebolt';
import { Thunderbolt } from './Thunderbolt';
import { Base } from './Base';
import { FireTower } from './FireTower';
import { IceTower } from './IceTower';
import { PoisonTower } from './PoisonTower';
import { ThunderTower } from './ThunderTower';

import { PurpleBlobEnemy } from './PurpleBlobEnemy';

export const animations = {
	Base,
	FireTower,
	IceTower,
	PoisonTower,
	ThunderTower,
	Fireball,
	Poisonball,
	Icebolt,
	Thunderbolt,

	...PurpleBlobEnemy
} as const;

export const getAnimation = (name: string) => {
	if (!animations[name]) throw new Error(`Animation config not found for: ${name}`);
	const animation = animations[name];
	// animation.frames.map((frame) => frame.default || frame);

	return animation;
};

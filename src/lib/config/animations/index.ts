import { Fireball } from './Projectiles/Fireball';
import { Poisonball } from './Projectiles/Poisonball';
import { Icebolt } from './Projectiles/Icebolt';
import { Thunderbolt } from './Projectiles/Thunderbolt';
import { FireballDie } from './Projectiles/FireballDie';
import { IceboltDie } from './Projectiles/IceboltDie';
import { PoisonballDie } from './Projectiles/PoisonballDie';
import { ThunderboltDie } from './Projectiles/ThunderboltDie';

import { NotBuilt } from './Towers/NotBuilt';
import { Base } from './Base';
import { IceTower } from './Towers/IceTower';
import { FireTower } from './Towers/FireTower';
import { PoisonTower } from './Towers/PoisonTower';
import { ThunderTower } from './Towers/ThunderTower';

import { PurpleBlobEnemy } from './Enemy/PurpleBlobEnemy';
import { GreenFlatEnemy } from './Enemy/GreenFlatEnemy';
import { RedBlobEnemy } from './Enemy/RedBlobEnemy';
import { GreyBlobEnemy } from './Enemy/GreyBlobEnemy';
import { YellowBlobEnemy } from './Enemy/YellowBlobEnemy';
import { BlueBlobEnemy } from './Enemy/BlueBlobEnemy';
import { GreyCircleEnemy } from './Enemy/GreyCircleEnemy';

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
	FireballDie,
	IceboltDie,
	PoisonballDie,
	ThunderboltDie,

	...PurpleBlobEnemy,
	...GreenFlatEnemy,
	...RedBlobEnemy,
	...GreyBlobEnemy,
	...YellowBlobEnemy,
	...BlueBlobEnemy,
	...GreyCircleEnemy,

	...IceTower,
	...FireTower,
	...PoisonTower,
	...ThunderTower
} as const;

export const getAnimation = (name: string) => {
	if (!animations[name]) throw new Error(`Animation config not found for: ${name}`);
	const animation = animations[name];

	return animation;
};

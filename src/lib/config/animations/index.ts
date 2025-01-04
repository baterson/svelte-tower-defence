import { Fireball } from './Projectiles/Fireball';
import { Poisonball } from './Projectiles/Poisonball';
import { Icebolt } from './Projectiles/Icebolt';
import { Thunderbolt } from './Projectiles/Thunderbolt';
import { Base } from './Base';
import { FireTower } from './Towers/FireTower';
import { PoisonTower } from './Towers/PoisonTower';
import { ThunderTower } from './Towers/ThunderTower';
import { NotBuilt } from './Towers/NotBuilt';
import { Build } from './Towers/Build';
import { IceTower } from './Towers/IceTower';
import { FireballDie } from './Projectiles/FireballDie';
import { IceboltDie } from './Projectiles/IceboltDie';
import { PoisonballDie } from './Projectiles/PoisonballDie';
import { ThunderboltDie } from './Projectiles/ThunderboltDie';

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
	Build,
	FireballDie,
	IceboltDie,
	PoisonballDie,
	ThunderboltDie,

	...PurpleBlobEnemy,
	...GreenFlatEnemy,
	...RedBlobEnemy,
	...GreyBlobEnemy,
	...IceTower
} as const;

export const getAnimation = (name: string) => {
	if (!animations[name]) throw new Error(`Animation config not found for: ${name}`);
	const animation = animations[name];

	return animation;
};

import { boundingBoxFromPoint } from '$lib/utils/math';
import { managers } from './managers.svelte';

const LOOT_MAP = {
	click: 3,
	upgrade: 50
};

export class LootTracker {
	collectedLoot = $state(50);
	playLowLootAnimation = $state(false);
	playTowerUpgradeAnimation = $state(false);
	playEnemyClickAnimation = $state(false);
	score = $state(50);
	killsEnemy = $state(0);

	spendLoot(action) {
		const toSpend = LOOT_MAP[action.type];

		if (this.collectedLoot < toSpend) {
			this.playAnimation('LowLoot');
			return;
		}

		if (action.type === 'upgrade') {
			const { tower } = action.payload;
			tower.state.setState('Upgrade');

			this.playAnimation('TowerUpgrade');
		} else if (action.type === 'click') {
			const { collisionManager, stageManager } = managers.get(['collisionManager', 'stageManager']);
			const { offset } = action.payload;
			// spawn projectile in explossion
			const boundingBox = boundingBoxFromPoint(offset, 20, 20);
			const enemies = collisionManager.filterEnemiesByBounds(boundingBox);

			stageManager.spawnEntity('ClickExplode', offset);

			enemies.forEach((enemy) => {
				enemy.state.setState('Die');
			});
		}

		this.collectedLoot -= toSpend;
	}

	receiveLoot(loot) {
		this.collectedLoot += loot;
		this.score += loot;
		this.killsEnemy++;
	}
	reset() {
		this.collectedLoot = 50;
		this.killsEnemy = 0;
	}

	getAnimation(name) {
		return `play${name}Animation`;
	}

	playAnimation(name) {
		const animation = this.getAnimation(name);
		this[animation] = true;
	}

	unsetAnimation(name) {
		const animation = this.getAnimation(name);
		this[animation] = false;
	}
}

export const lootTracker = new LootTracker();

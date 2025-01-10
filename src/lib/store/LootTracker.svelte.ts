import { boundingBoxFromPoint } from '$lib/utils/math';
import { soundManager } from './SoundManager.svelte';
import { cursor } from './Cursor.svelte';
import { managers } from './managers.svelte';

const LOOT_MAP = {
	click: 3,
	upgrade: 50
};

export class LootTracker {
	collectedLoot = $state(100);
	playLowLootAnimation = $state(false);
	playTowerUpgradeAnimation = $state(false);
	playEnemyClickAnimation = $state(false);
	score = $state(100);
	killsEnemy = $state(0);

	spendLoot(action) {
		const toSpend = LOOT_MAP[action.type];

		if (this.collectedLoot < toSpend) {
			this.playAnimation('LowLoot');
			// soundManager.play('lowResourse');
			return;
		}

		if (action.type === 'upgrade') {
			const { tower } = action.payload;
			this.collectedLoot -= toSpend;

			tower.state.setState('Upgrade');
			this.playAnimation('TowerUpgrade');

			cursor.setAnimation('TowerBuildCursor');
		} else if (action.type === 'click') {
			const { collisionManager, stageManager } = managers.get(['collisionManager', 'stageManager']);
			const { offset } = action.payload;

			const boundingBox = boundingBoxFromPoint(offset, 60, 60);
			const enemies = collisionManager.filterEnemiesByBounds(boundingBox);

			stageManager.spawnEntity('ClickExplode', offset);
			soundManager.play('clickEnemy', true);

			enemies.forEach((enemy) => {
				enemy.state.setState('Die');
			});

			if (enemies.length > 0) {
				this.collectedLoot -= toSpend;
			}
		}
	}

	receiveLoot(loot) {
		this.collectedLoot += loot;
		this.score += loot;
		this.killsEnemy++;
	}
	reset() {
		this.collectedLoot = 100;
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

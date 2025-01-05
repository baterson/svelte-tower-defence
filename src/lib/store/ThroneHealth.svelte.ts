import { managers } from './managers.svelte';

const MAX_HEALTH = 500;

class ThroneHealth {
	playLowHealthAnimation = $state(false);

	spend(action) {
		const { entityManager } = managers.get(['entityManager', 'stageManager']);

		let toSpend = 0;

		if (action === 'click') {
			toSpend = 10;
		} else if (action === 'towerBuild') {
			toSpend = 50;
		} else if (action === 'upgrade') {
			toSpend = 30;
		}

		if (entityManager.throne.stats.health >= toSpend) {
			entityManager.throne.stats.health -= toSpend;
		} else {
			this.playLowHealthAnimation = true;
		}
	}
}

export const throneHealth = new ThroneHealth();

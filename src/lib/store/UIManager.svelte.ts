import { stageDialogs, enemyDescriptions } from '$lib/config/tutorials';
import { managers } from './managers.svelte';
import type { Entity } from './Entity.svelte';

const strongEnemies = Object.keys(enemyDescriptions);

export class UIManager {
	alreadyHighlightedEntities = $state([]);
	highlightedEntity = $state<Entity | null>(null);
	nextToHighlightEntity = $derived(
		strongEnemies.filter((name) => !this.alreadyHighlightedEntities.includes(name))
	);
	showedStageDialogs = $state([]);
	currentDialog = $state('');

	update = (deltaTime: number) => {
		this.checkStageDialog();
		this.checkHighlightedEntity();
	};

	checkHighlightedEntity() {
		if (this.currentDialog) return;

		const entityManager = managers.get('entityManager');

		const entities = entityManager.filterByName(this.nextToHighlightEntity);
		const nextToHiglight = entities[0];

		if (nextToHiglight) {
			this.highlightedEntity = nextToHiglight;
			this.alreadyHighlightedEntities.push(nextToHiglight.name);

			this.currentDialog = enemyDescriptions[nextToHiglight.name];
		}
	}

	checkStageDialog() {
		if (this.currentDialog) return;

		const stageManager = managers.get('stageManager');

		if (!this.showedStageDialogs.includes(stageManager.stageNumber)) {
			this.currentDialog = stageDialogs[stageManager.stageNumber].start;
			this.showedStageDialogs.push(stageManager.stageNumber);
		}
	}

	clear() {
		this.currentDialog = '';
		this.highlightedEntity = null;
	}
}

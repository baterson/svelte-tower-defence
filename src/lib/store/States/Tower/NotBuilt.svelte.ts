import { BaseState } from '$lib/store/States/BaseState.svelte';
import { screen } from '$lib/store/Screen.svelte';

export class NotBuilt extends BaseState {
	isSetup = false;

	update(deltaTime: number, entity: any): void {
		if (!this.isSetup) {
			if (screen.isMobile) {
				this.entity.position.y += 30;
			} else {
				this.entity.position.y += 35;
			}

			this.isSetup = true;
		}
	}
}

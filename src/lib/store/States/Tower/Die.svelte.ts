/**
 * TowerStates.ts
 * State classes for tower behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';

export class Die extends BaseState {
	update(deltaTime: number, tower: any): void {
		tower.stopInteractions();
	}
}

/**
 * EnemyStates.ts
 * State classes for enemy behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import type { EntityPool } from '$lib/store/EntityPool.svelte';

export class Die extends BaseState {
	update(deltaTime: number, throne, entityPool: EntityPool) {
		// if(throne.)
		// throne.update(deltaTime);
	}
}

import { BaseState } from '../BaseState.svelte';
import type { Enemy } from '$store/Entities/Enemy.svelte';
import { distance } from '$utils/math';

export class Death extends BaseState {
	update(deltaTime: number, enemy: Enemy) {
		// Death animation is handled by the sprite system
	}
}

import { BaseState } from '../BaseState.svelte';
import type { Enemy } from '$store/Entities/Enemy.svelte';
import { distance } from '$utils/math';

export class Idle extends BaseState {
	update(deltaTime: number, enemy: Enemy) {
		// Transition to run after short delay
		setTimeout(() => {
			enemy.state.setState('run');
		}, 500);
	}
}

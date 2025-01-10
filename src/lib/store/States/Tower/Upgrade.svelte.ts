import { soundManager } from '$lib/store/SoundManager.svelte';
import { BaseState } from '$lib/store/States/BaseState.svelte';

const getPrefix = (level) => {
	if (level === 1) {
		return '1';
	} else if (level === 2) {
		return '2';
	}
	return '0';
};

const getUpgradeAnimationName = (tower, level) => {
	return `${tower.name}Upgrade${getPrefix(level)}`;
};

const getGuardAnimationName = (tower, level) => {
	return `${tower.name}Base${getPrefix(level)}`;
};

export class Upgrade extends BaseState {
	constructor(stateMachine) {
		super(stateMachine);

		this.entity.upgradeLevel += 1;

		const upgradeFn = this.entity.upgrades[this.entity.upgradeLevel];
		upgradeFn(this.entity);

		this.entity.animation.onFrameChange = (frame) => {
			// this.entity.scale += 0.1;
		};

		soundManager.play('towerUpgrade');
	}

	update(deltaTime) {
		if (this.entity.animation.isComplete) {
			this.entity.stateToAnimation = {
				...this.entity.stateToAnimation,
				Guard: getGuardAnimationName(this.entity, this.entity.upgradeLevel),
				Shoot: getGuardAnimationName(this.entity, this.entity.upgradeLevel),
				Upgrade: getUpgradeAnimationName(this.entity, this.entity.upgradeLevel + 1)
			};

			this.entity.state.setState('Guard');
			this.entity.animation.onFrameChange = () => {};
		}
	}
}

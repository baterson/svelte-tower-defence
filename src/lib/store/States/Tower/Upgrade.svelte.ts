import { managers } from '$lib/store/managers.svelte';
import { BaseState } from '$lib/store/States/BaseState.svelte';
import { Vector2 } from '$lib/store/Vector2.svelte';

const UPGRADE_SIZES = {
	'0': {
		'0': { width: 68, height: 86, offset: new Vector2(0, 0) },
		'1': { width: 68, height: 107, offset: new Vector2(0, 0) }
	},
	'1': {
		'0': { width: 84, height: 125, offset: new Vector2(12, 17) },
		'1': { width: 93, height: 140, offset: new Vector2(12, 33) }
	},
	'2': {
		'0': { width: 109, height: 156, offset: new Vector2(18, 50) },
		'1': { width: 122, height: 176, offset: new Vector2(18, 66) }
	}
};

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
			if (this.entity.upgradeLevel === 1) {
				// debugger;
			}
			const upgrades = UPGRADE_SIZES[this.entity.upgradeLevel];
			const currentFrameUpgrade = upgrades[frame];
			this.entity.height = currentFrameUpgrade.height;
			this.entity.width = currentFrameUpgrade.width;

			const xDirection = [0, 2].includes(this.entity.staticSlot) ? -1 : 1;

			const slotOffset = new Vector2(
				xDirection * currentFrameUpgrade.offset.x,
				currentFrameUpgrade.offset.y
			);

			this.entity.offsetPosition = slotOffset;
		};

		managers.get('soundManager').play('lvlUp');
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

<script>
	import { fade } from 'svelte/transition';

	const { entity } = $props();

	const getColor = () => {
		switch (entity.name) {
			case 'IceTower':
				return '#9AD5FF';
			case 'FireTower':
				return '#E45F01';
			case 'ThunderTower':
				return '#FFF263';
			case 'PoisonTower':
				return '#6CE966';
			default:
				return '#ffffff';
		}
	};

	let color = $derived(getColor());

	const getEffectOffset = () => {
		if (entity.upgradeLevel === 0) {
			return { x: entity.width / 2, y: 22 };
		} else if (entity.upgradeLevel === 1) {
			return { x: entity.width / 2, y: 23 };
		} else {
			return { x: entity.width / 2, y: 24 };
		}
	};

	let offset = $derived(getEffectOffset());
</script>

<div
	out:fade={{ duration: 100 }}
	onanimationend={() => {
		entity.removeVFX('TowerShoot');
	}}
	class="shoot-effect"
	style:--effect-color={color}
	style:left={`${offset.x}px`}
	style:top={`${offset.y}px`}
></div>

<style>
	.shoot-effect {
		z-index: 100;
		position: absolute;
		/* transform: translate(-50%, -50%); */
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: var(--effect-color);
		mix-blend-mode: screen;
		animation: shootAndGrow 0.4s ease-out forwards;
	}

	@keyframes shootAndGrow {
		0% {
			transform: translate(-50%, -50%) scale(1);

			box-shadow: 0 0 20px 10px var(--effect-color);
		}
		100% {
			transform: translate(-50%, -50%) scale(3);
			opacity: 1;
			box-shadow: 0 0 40px 20px transparent;
		}
	}
</style>

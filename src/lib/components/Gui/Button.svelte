<script>
	import { cursor } from '$lib/store/Cursor.svelte';
	import { soundManager } from '$lib/store/SoundManager.svelte';

	const { onclick, disabled, text = '' } = $props();

	const handleClick = () => {
		if (soundManager?.preloaded) {
			soundManager.play('clickMenu', true);
		}
		onclick();
	};
</script>

<button style:cursor={cursor.get('arrow')} {disabled} class="btn" onclick={handleClick}
	>{text}</button
>

<style>
	.btn {
		position: relative;
		padding: 1rem 3rem;
		font-size: 1.3rem;
		color: rgba(214, 133, 218);

		background: #3b005f;
		border: 2px solid #ac82d4;
		border-radius: 10px;
		transition:
			background 0.3s ease,
			transform 0.3s ease;
		width: 100%;
		min-width: 204px;
		max-width: 300px;
		-webkit-tap-highlight-color: transparent;
		user-select: none;
		-webkit-touch-callout: none;
		font-family: 'Astro Space', sans-serif;
	}

	.btn:hover {
		background: #270139;
		transform: translateY(-2px);
	}

	@media (max-width: 768px) {
		.btn {
			padding: 0.8rem 2rem;
			font-size: 1.2rem;
		}
	}
</style>

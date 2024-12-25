<script>
	import { managers } from '$store/managers.svelte';

	const uiManager = $derived(managers.get('uiManager'));
	const gameLoop = $derived(managers.get('gameLoop'));

	$effect(() => {
		if (uiManager.currentDialog && !gameLoop.pauseState) {
			gameLoop.pause();
		}
	});
</script>

{#if uiManager.currentDialog}
	<div
		class="wrapper"
		onclick={() => {
			gameLoop.resume();
			uiManager.clear();
		}}
	>
		<div class="dialog">{uiManager.currentDialog}</div>
	</div>
{/if}

<style>
	.wrapper {
		position: absolute;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 300px;
	}

	.dialog {
		color: purple;
		font-size: 48px;

		background-color: gainsboro;
		border: 2px solid purple;
		padding: 40px;
		z-index: 1001;
	}
</style>

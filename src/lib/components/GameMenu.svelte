<script>
	const { onStart, onResume, isPaused, onRestart } = $props();
	import GitHubIcon from './GitHubIcon.svelte';
	import { managers } from '$lib/store/managers.svelte';
	import { fade } from 'svelte/transition';

	const stageManager = $derived(managers.get('stageManager'));
	const soundManager = $derived(managers.get('soundManager'));

	const toggleMute = () => {
		soundManager.toggleMute();
	};
</script>

<div class="menu-container">
	<div class="menu-content" in:fade={{ duration: 300 }}>
		{#if isPaused}
			<div class="header">
				<div class="stage">Stage {stageManager.stageNumber + 1}</div>

				<a href="https://github.com/baterson/svelte-tower-defence" class="git-link"
					><GitHubIcon /></a
				>
			</div>
			<div class="title">
				<h1>Paused</h1>
			</div>
			<div class="buttons-container">
				<button class="btn" onclick={onResume}> Resume Game </button>
				<button class="btn" onclick={onRestart}> Restart Game </button>
				<button class="btn" onclick={toggleMute}
					>{soundManager.isMuted ? 'Sound: OFF' : 'Sound: ON'}</button
				>
			</div>
		{:else}
			<div class="title">
				<h1>Welcome to the game!</h1>
			</div>
			<div class="buttons-container">
				<button class="btn" onclick={onStart}> Start Game </button>
			</div>
		{/if}
	</div>
</div>

<style>
	.menu-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100dvw;
		height: 100dvh;
		display: flex;
		justify-content: center;
		align-items: center;
		background: radial-gradient(circle at center, #5b1578 0%, #1c0334 80%);
		z-index: 1000;
	}

	.menu-content {
		text-align: center;
		padding: 2rem;
		border-radius: 20px;
		width: 100%;
		height: 80%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		margin-bottom: 1rem;
		font-size: 1.5rem;
		color: #fff;
	}
	.git-link {
		color: #fff;
		text-decoration: none;
	}

	.title,
	.stage {
		color: #fff;
		font-weight: bold;
		font-size: 2rem;
	}

	.buttons-container {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		align-items: center;
		justify-content: center;
	}

	.btn {
		position: relative;
		padding: 1rem 3rem;
		font-size: 1.3rem;
		color: #fff;
		background: #3b005f;
		border: 2px solid #ac82d4;
		border-radius: 10px;
		transition:
			background 0.3s ease,
			transform 0.3s ease;
		width: 100%;
		max-width: 300px;
		-webkit-tap-highlight-color: transparent;
		user-select: none;
		-webkit-touch-callout: none;
	}

	.btn:hover {
		background: #270139;
		transform: translateY(-2px);
	}

	@media (max-width: 768px) {
		.title {
			font-size: 2rem;
		}

		.btn {
			padding: 0.8rem 2rem;
			font-size: 1.2rem;
		}
	}
</style>

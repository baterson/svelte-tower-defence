<script>
	import Button from './Button.svelte';
	import MenuLayout from './MenuLayout.svelte';
	import { managers } from '$lib/store/managers.svelte';
	import GitHubIcon from '../GitHubIcon.svelte';
	import { soundManager } from '$lib/store/SoundManager.svelte';
	import { onDestroy, onMount } from 'svelte';

	const { onResume, onRestart } = $props();

	const toggleMute = () => {
		soundManager.toggleMute();
	};

	onMount(() => {
		soundManager.reduceBgVolume();
	});

	onDestroy(() => {
		soundManager.restoreBgVolume();
	});
</script>

<div class="pause-overlay">
	<MenuLayout>
		<div class="content">
			<div class="header">
				<a href="https://github.com/baterson/svelte-tower-defence" class="git-link"
					><GitHubIcon /></a
				>
			</div>
			<div class="title">
				<h1>Paused</h1>
			</div>
			<div class="buttons-container">
				<Button text="Resume Game" onclick={onResume} />
				<Button text="Restart Game" onclick={onRestart} />
				<Button text={soundManager.isMuted ? 'Sound: OFF' : 'Sound: ON'} onclick={toggleMute} />
			</div>
		</div>
	</MenuLayout>
</div>

<style>
	.content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}
	.pause-overlay {
		position: relative;
		inset: 0;
		width: 100%;
		height: 100%;
		z-index: 100;
	}
	.header {
		display: flex;
		justify-content: end;
		align-items: center;
		width: 90%;
		font-size: 1.5rem;
		color: #fff;
	}
	.git-link {
		color: #fff;
		text-decoration: none;
		display: flex;
	}

	.title {
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

	@media (max-width: 768px) {
		.title {
			font-size: 2rem;
		}
	}
</style>

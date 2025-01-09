<script>
	import Button from './Button.svelte';
	import MenuLayout from './MenuLayout.svelte';
	import { managers } from '$lib/store/managers.svelte';
	import GitHubIcon from '../GitHubIcon.svelte';
	import { fade, slide } from 'svelte/transition';
	const { onResume, onRestart } = $props();

	const { soundManager, stageManager } = managers.get(['soundManager', 'stageManager']);

	const toggleMute = () => {
		soundManager.toggleMute();
	};
</script>

<div class="pause-overlay" in:slide={{ duration: 500 }} out:slide={{ duration: 300 }}>
	<MenuLayout>
		<div class="content">
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
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100%;
		z-index: 1000;
	}
	.header {
		display: flex;
		justify-content: space-between;
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

	.stage {
		color: #fff;
		font-weight: bold;
		font-size: 2rem;
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

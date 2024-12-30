<script>
	let starsCount = 20;
</script>

<div class="bg-container">
	<div class="gradient-bg"></div>
	<div class="stars">
		{#each Array(starsCount).fill(0) as _, i}
			<div
				class="star"
				style={`top: ${Math.random() * 100}%; left: ${Math.random() * 100}%; animation-delay: ${Math.random() * 3}s;`}
			></div>
		{/each}
	</div>
</div>

<style>
	.bg-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: radial-gradient(circle, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 1));
		z-index: 0;
		overflow: hidden;
	}

	.gradient-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: radial-gradient(circle, #63009b, #1a013e 70%);
		z-index: 1;
	}

	.stars {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
		pointer-events: none;
	}

	.star {
		position: absolute;
		width: 3px;
		height: 3px;
		background: white;
		border-radius: 50%;
		animation: twinkle 3s infinite ease-in-out;
	}

	@keyframes twinkle {
		0%,
		100% {
			opacity: 0.2;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.5);
		}
	}
</style>

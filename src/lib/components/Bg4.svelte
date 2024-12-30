<div class="bg-container">
	<div class="plasma-base"></div>

	<div class="energy-mist"></div>
</div>

<style>
	.bg-container {
		position: absolute;
		inset: 0;
		overflow: hidden;
		background: #0a0014;
	}

	.plasma-base {
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at center, #200030 0%, #100020 50%, #0a0014 100%);
	}

	.energy-mist {
		position: absolute;
		inset: 0;
		background: repeating-radial-gradient(
			circle at 50% 50%,
			rgba(255, 0, 255, 0.1) 0%,
			transparent 10%,
			rgba(255, 0, 255, 0.1) 20%
		);
		filter: blur(10px);
		mix-blend-mode: screen;
	}
</style>

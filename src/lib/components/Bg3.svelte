<div class="bg-container">
	<!-- Основной фон -->
	<div class="quantum-base"></div>

	<!-- Квантовые частицы -->
	<div class="quantum-particles">
		{#each Array(30) as _, i}
			<div
				class="particle"
				style:top="{Math.random() * 100}%"
				style:left="{Math.random() * 100}%"
				style:width="{Math.random() * 4 + 2}px"
				style:height="{Math.random() * 4 + 2}px"
			/>
		{/each}
	</div>

	<!-- Квантовая сетка -->
	<div class="quantum-grid"></div>

	<div class="energy-fields">
		<div class="field field1"></div>
		<div class="field field2"></div>
		<div class="field field3"></div>
	</div>
</div>

<style>
	.bg-container {
		position: absolute;
		inset: 0;
		overflow: hidden;
		background: #000814;
	}

	.quantum-base {
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at center, #001432 0%, #000814 70%);
	}

	.quantum-particles {
		position: absolute;
		inset: 0;
	}

	.particle {
		position: absolute;
		background: rgba(0, 255, 255, 0.5);
		border-radius: 50%;
		box-shadow:
			0 0 10px rgba(0, 255, 255, 0.5),
			0 0 20px rgba(0, 255, 255, 0.3);
	}

	.quantum-grid {
		position: absolute;
		inset: 0;
		background-image: linear-gradient(rgba(0, 150, 255, 0.2) 1px, transparent 1px),
			linear-gradient(90deg, rgba(0, 150, 255, 0.1) 1px, transparent 1px);
		background-size: 40px 40px;
		opacity: 0.3;
	}

	.energy-fields {
		position: absolute;
		inset: 0;
		mix-blend-mode: screen;
	}

	.field {
		position: absolute;
		border-radius: 50%;
		filter: blur(70px);
	}

	.field1 {
		top: 30%;
		left: 20%;
		width: 300px;
		height: 300px;
		background: radial-gradient(circle, rgba(0, 128, 255, 0.1), transparent 70%);
	}

	.field2 {
		top: 60%;
		right: 30%;
		width: 400px;
		height: 400px;
		background: radial-gradient(circle, rgba(0, 255, 255, 0.1), transparent 70%);
	}

	.field3 {
		top: 20%;
		right: 20%;
		width: 350px;
		height: 350px;
		background: radial-gradient(circle, rgba(0, 200, 255, 0.1), transparent 70%);
	}
</style>

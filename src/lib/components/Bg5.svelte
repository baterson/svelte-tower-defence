<div class="bg-container">
	<!-- Темный фон -->
	<div class="base-bg"></div>

	<!-- Центральное энергетическое поле -->
	<div class="energy-field">
		<div class="field-core"></div>
		<div class="field-pulse"></div>
	</div>

	<!-- Зоны башен -->
	<div class="tower-zones">
		<div class="zone-left"></div>
		<div class="zone-right"></div>
	</div>

	<!-- Фоновое свечение -->
	<div class="ambient-glow"></div>
</div>

<style>
	.bg-container {
		position: absolute;
		inset: 0;
		overflow: hidden;
		background: #0a0014;
	}

	.base-bg {
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at 50% 40%, #1a0032, #0a0014 85%);
	}

	.energy-field {
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.field-core {
		position: absolute;
		width: 200px;
		height: 200px;
		transform: translate(-50%, -50%);
		background: radial-gradient(
			circle,
			rgba(255, 100, 255, 0.2),
			rgba(128, 0, 255, 0.1) 50%,
			transparent 80%
		);
		filter: blur(30px);
	}

	.field-pulse {
		position: absolute;
		width: 300px;
		height: 300px;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		background: repeating-radial-gradient(
			circle at center,
			rgba(255, 0, 255, 0.05) 0%,
			transparent 10%,
			rgba(255, 0, 255, 0.05) 20%
		);
		filter: blur(10px);
	}

	.tower-zones {
		position: absolute;
		inset: 0;
	}

	.zone-left,
	.zone-right {
		position: absolute;
		top: 30%;
		width: 150px;
		height: 200px;
		background: radial-gradient(circle, rgba(128, 0, 255, 0.1), transparent 80%);
		filter: blur(20px);
	}

	.zone-left {
		left: 20%;
	}

	.zone-right {
		right: 20%;
	}

	.ambient-glow {
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse at 50% 40%, rgba(128, 0, 255, 0.05), transparent 70%);
	}
</style>

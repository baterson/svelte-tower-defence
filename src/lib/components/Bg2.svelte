<div class="bg-container">
	<!-- Ночное небо -->
	<div class="night-sky"></div>

	<!-- Слои северного сияния -->
	<div class="aurora-layers">
		<div class="aurora-layer layer1"></div>
		<div class="aurora-layer layer2"></div>
		<div class="aurora-layer layer3"></div>
	</div>

	<!-- Звездное небо -->
	<div class="star-field"></div>
</div>

<style>
	.bg-container {
		position: absolute;
		inset: 0;
		overflow: hidden;
		background: #000810;
	}

	.night-sky {
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at 50% 10%, rgba(0, 40, 70, 1) 0%, rgba(0, 10, 20, 1) 100%);
	}

	.aurora-layers {
		position: absolute;
		inset: 0;
	}

	.aurora-layer {
		position: absolute;
		width: 200%;
		height: 100%;
		opacity: 0.3;
		filter: blur(60px);
	}

	.layer1 {
		top: 20%;
		background: linear-gradient(90deg, transparent, #00ff9d, #00ffd5, transparent);
	}

	.layer2 {
		top: 30%;
		background: linear-gradient(90deg, transparent, #00c3ff, #00aaff, transparent);
	}

	.layer3 {
		top: 40%;
		background: linear-gradient(90deg, transparent, #9d00ff, #c300ff, transparent);
	}

	.star-field {
		position: absolute;
		inset: 0;
		background-image: radial-gradient(1px 1px at 20px 30px, #fff, rgba(0, 0, 0, 0)),
			radial-gradient(1px 1px at 40px 70px, #fff, rgba(0, 0, 0, 0)),
			radial-gradient(1px 1px at 50px 160px, #fff, rgba(0, 0, 0, 0)),
			radial-gradient(1px 1px at 90px 40px, #fff, rgba(0, 0, 0, 0)),
			radial-gradient(1px 1px at 130px 80px, #fff, rgba(0, 0, 0, 0));
		background-repeat: repeat;
		background-size: 200px 200px;
	}
</style>

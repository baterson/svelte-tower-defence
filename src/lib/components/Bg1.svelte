<div class="bg-container">
	<div class="gradient-bg">…</div>
	<div class="stars"></div>
</div>

<style>
	.bg-container {
		position: absolute;
		overflow: hidden;
		inset: 0;
		background: radial-gradient(circle, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 1));
		z-index: 0;
	}
	.gradient-bg {
		position: absolute;
		background: radial-gradient(circle, #63009b, #1a013e 70%);
		inset: 0;
		z-index: 1;
	}
	.stars {
		position: absolute;
		inset: 0;
		z-index: 2;
		background-image: radial-gradient(2px 2px at 10% 20%, rgba(255, 255, 255, 1), rgba(0, 0, 0, 0)),
			radial-gradient(2px 2px at 40% 70%, rgba(255, 255, 255, 0.9), rgba(0, 0, 0, 0)),
			radial-gradient(1.5px 1.5px at 50% 40%, rgba(255, 255, 255, 0.8), rgba(0, 0, 0, 0)),
			radial-gradient(1.5px 1.5px at 80% 30%, rgba(255, 255, 255, 0.8), rgba(0, 0, 0, 0)),
			radial-gradient(1px 1px at 20% 80%, rgba(255, 255, 255, 0.7), rgba(0, 0, 0, 0)),
			radial-gradient(1px 1px at 70% 50%, rgba(255, 255, 255, 0.7), rgba(0, 0, 0, 0)),
			radial-gradient(1px 1px at 90% 90%, rgba(255, 255, 255, 0.7), rgba(0, 0, 0, 0));
		background-repeat: repeat;
		background-size:
			200px 200px,
			250px 250px,
			150px 150px;
		animation: twinkle 4s ease-in-out infinite alternate;
	}
	@keyframes twinkle {
		0% {
			opacity: 0.6;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0.8;
		}
	}
</style>

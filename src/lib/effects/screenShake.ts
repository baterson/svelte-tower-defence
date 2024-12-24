export function screenShake(intensity = 5, duration = 300) {
	const gameContainer = document.querySelector('.game-container');
	let start = performance.now();

	function shake(timestamp) {
		const elapsed = timestamp - start;
		if (elapsed < duration) {
			const x = Math.random() * intensity * (1 - elapsed / duration);
			const y = Math.random() * intensity * (1 - elapsed / duration);
			gameContainer.style.transform = `translate(${x}px, ${y}px)`;
			requestAnimationFrame(shake);
		} else {
			gameContainer.style.transform = '';
		}
	}

	requestAnimationFrame(shake);
}

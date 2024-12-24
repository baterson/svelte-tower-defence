import { cubicOut } from 'svelte/easing';

export function neonLightTransition(node, params) {
	const {
		duration = 5000, // Default duration
		easing = cubicOut // Default easing
	} = params;

	return {
		duration,
		easing,
		css: (t) => {
			const opacity = easing(t);
			const scale = 1 + (1 - easing(t)) * 0.5;
			const boxShadow = `0 0 ${10 + (1 - easing(t)) * 20}px #ffe66d, 0 0 ${20 + (1 - easing(t)) * 30}px #ff69b4, 0 0 ${30 + (1 - easing(t)) * 40}px #ffe66d`;

			return `
        opacity: ${opacity};
        transform: scale(${scale});
        box-shadow: ${boxShadow};
      `;
		}
	};
}

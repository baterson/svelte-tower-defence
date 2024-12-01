/**
 * towerPositions.ts
 * Configuration for valid tower placement positions
 */

interface TowerPosition {
	x: number;
	y: number;
}

// Assuming base game width is 640px and height is 960px
export const TOWER_POSITIONS = {
	// Left side tower positions (from top to bottom)
	left: [
		{ x: 20, y: 162 },
		{ x: 20, y: 242 },
		{ x: 20, y: 322 },
		{ x: 20, y: 402 },
		{ x: 20, y: 482 },
		{ x: 20, y: 562 }
	],
	// Right side tower positions (from top to bottom)
	right: [
		{ x: 383, y: 162 },
		{ x: 383, y: 242 },
		{ x: 383, y: 322 },
		{ x: 383, y: 402 },
		{ x: 383, y: 482 },
		{ x: 383, y: 562 }
	]
} as const;

// Helper function to check if a click position is near a tower slot
export function findNearestTowerPosition(
	clickX: number,
	clickY: number,
	threshold = 32
): TowerPosition | null {
	const allPositions = [...TOWER_POSITIONS.left, ...TOWER_POSITIONS.right];

	for (const position of allPositions) {
		const distance = Math.sqrt(Math.pow(clickX - position.x, 2) + Math.pow(clickY - position.y, 2));

		if (distance <= threshold) {
			return position;
		}
	}

	return null;
}

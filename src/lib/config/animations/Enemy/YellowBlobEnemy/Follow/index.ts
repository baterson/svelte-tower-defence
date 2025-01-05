import Frame0 from './0.svg?raw';
import Frame1 from './1.svg?raw';
import Frame2 from './2.svg?raw';
import Frame3 from './3.svg?raw';

const frames = [Frame0, Frame1, Frame2, Frame3];

export const YellowBlobEnemyFollow = {
	name: 'YellowBlobEnemyFollow',
	frames,
	framesAmount: frames.length,
	frameRate: 10
} as const;

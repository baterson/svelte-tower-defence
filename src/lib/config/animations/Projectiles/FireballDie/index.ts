import Frame0 from './0.svg?raw';
import Frame1 from './1.svg?raw';
import Frame2 from './2.svg?raw';

const frames = [Frame0, Frame1, Frame2];

export const FireballDie = {
	name: 'FireBallDie',
	frames,
	framesAmount: frames.length,
	frameRate: 10
};
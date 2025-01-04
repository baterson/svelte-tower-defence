import Frame0 from './0.svg?raw';
import Frame1 from './1.svg?raw';

const frames = [Frame0, Frame1];

export const Thunderbolt = {
	name: 'Thunderbolt',
	frames,
	framesAmount: frames.length,
	frameRate: 10,
	loop: true
};
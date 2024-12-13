/**
 * Timer Manager for handling multiple game timers
 * @module TimeManager
 */

interface TimerCallback {
	callback: () => void;
	delay: number;
	elapsed: number;
	repeat: boolean;
	isCompleted: boolean;
	id: string;
}

export class TimeManager {
	private timers: Map<string, TimerCallback> = new Map();
	private lastId: number = 0;

	setTimer(callback: () => void, delay: number, repeat: boolean = false): string {
		const id = `timer_${++this.lastId}`;

		const timer: TimerCallback = {
			callback,
			delay,
			elapsed: 0,
			repeat,
			isCompleted: false,
			id
		};

		this.timers.set(id, timer);
		return id;
	}

	update(deltaTime: number, cbArgs?: any): void {
		this.timers.forEach((timer) => {
			if (timer.isCompleted) return;

			timer.elapsed += deltaTime;

			if (timer.elapsed >= timer.delay) {
				timer.callback(cbArgs);

				if (timer.repeat) {
					timer.elapsed = 0;
				} else {
					timer.isCompleted = true;
				}
			}
		});

		// Cleanup completed timers
		this.timers.forEach((timer, id) => {
			if (timer.isCompleted) {
				this.timers.delete(id);
			}
		});
	}

	cancelTimer(id: string): void {
		if (this.timers.has(id)) {
			this.timers.delete(id);
		}
	}

	cancelAll(): void {
		this.timers.clear();
	}

	hasTimer(id: string): boolean {
		return this.timers.has(id) && !this.timers.get(id)?.isCompleted;
	}

	getRemainingTime(id: string): number | null {
		const timer = this.timers.get(id);
		if (!timer || timer.isCompleted) return null;

		return Math.max(0, timer.delay - timer.elapsed);
	}

	getActiveTimersCount(): number {
		return this.timers.size;
	}

	resetTimer(id: string): void {
		const timer = this.timers.get(id);
		if (timer) {
			timer.elapsed = 0;
			timer.isCompleted = false;
		}
	}
}

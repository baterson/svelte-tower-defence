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

	/**
	 * Set new timer with unique id
	 * @param callback Function to call when timer completes
	 * @param delay Delay in milliseconds
	 * @param repeat If true, timer will repeat indefinitely
	 * @returns Timer id for future reference
	 *
	 * @example
	 * // Single execution after 1 second
	 * const timerId = timerManager.setTimer(() => console.log('Done!'), 1000);
	 *
	 * @example
	 * // Repeat every 2 seconds
	 * const spawnerId = timerManager.setTimer(() => spawnEnemy(), 2000, true);
	 */
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

	/**
	 * Update all active timers
	 * @param deltaTime Time passed since last frame in milliseconds
	 *
	 * @example
	 * gameLoop() {
	 *   timerManager.update(deltaTime);
	 * }
	 */
	update(deltaTime: number): void {
		this.timers.forEach((timer) => {
			if (timer.isCompleted) return;

			timer.elapsed += deltaTime;

			if (timer.elapsed >= timer.delay) {
				timer.callback();

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

	/**
	 * Cancel specific timer by id
	 * @param id Timer id returned from setTimer()
	 *
	 * @example
	 * timerManager.cancelTimer(spawnerId);
	 */
	cancelTimer(id: string): void {
		if (this.timers.has(id)) {
			this.timers.delete(id);
		}
	}

	/**
	 * Cancel all active timers
	 *
	 * @example
	 * timerManager.cancelAll(); // Stop all timers
	 */
	cancelAll(): void {
		this.timers.clear();
	}

	/**
	 * Check if timer exists and is active
	 * @param id Timer id to check
	 *
	 * @example
	 * if (timerManager.hasTimer(spawnerId)) {
	 *   // Timer is still active
	 * }
	 */
	hasTimer(id: string): boolean {
		return this.timers.has(id) && !this.timers.get(id)?.isCompleted;
	}

	/**
	 * Get remaining time for specific timer
	 * @param id Timer id to check
	 * @returns Remaining time in milliseconds or null if timer doesn't exist
	 *
	 * @example
	 * const remainingTime = timerManager.getRemainingTime(spawnerId);
	 */
	getRemainingTime(id: string): number | null {
		const timer = this.timers.get(id);
		if (!timer || timer.isCompleted) return null;

		return Math.max(0, timer.delay - timer.elapsed);
	}

	/**
	 * Get count of active timers
	 *
	 * @example
	 * const activeTimers = timerManager.getActiveTimersCount();
	 */
	getActiveTimersCount(): number {
		return this.timers.size;
	}

	/**
	 * Reset specific timer
	 * @param id Timer id to reset
	 *
	 * @example
	 * timerManager.resetTimer(spawnerId);
	 */
	resetTimer(id: string): void {
		const timer = this.timers.get(id);
		if (timer) {
			timer.elapsed = 0;
			timer.isCompleted = false;
		}
	}
}

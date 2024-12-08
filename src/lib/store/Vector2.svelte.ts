/**
 * Represents a 2D vector with x and y coordinates
 * Используется для представления позиций, направлений и скоростей в игре
 */
export class Vector2 {
	x = $state(0);
	y = $state(0);

	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	/**
	 * Создает копию вектора
	 * Важно для сохранения предыдущих позиций объектов
	 */
	clone(): Vector2 {
		return new Vector2(this.x, this.y);
	}

	/**
	 * Сложение векторов
	 * Пример: позиция + скорость = новая позиция
	 */
	add(vector: Vector2): Vector2 {
		return new Vector2(this.x + vector.x, this.y + vector.y);
	}

	/**
	 * Вычитание векторов
	 * Пример: разница между позициями для определения направления
	 */
	subtract(vector: Vector2): Vector2 {
		return new Vector2(this.x - vector.x, this.y - vector.y);
	}

	/**
	 * Умножение вектора на скаляр
	 * Пример: направление * скорость = вектор движения
	 */
	multiply(scalar: number): Vector2 {
		return new Vector2(this.x * scalar, this.y * scalar);
	}

	/**
	 * Длина вектора
	 * Пример: определение дистанции или скорости
	 */
	magnitude(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	/**
	 * Нормализация вектора (приведение к единичной длине)
	 * Пример: получение направления без учета скорости
	 */
	normalize(): Vector2 {
		const mag = this.magnitude();
		return mag ? new Vector2(this.x / mag, this.y / mag) : new Vector2();
	}

	/**
	 * Расстояние до другого вектора
	 * Пример: проверка дистанции между объектами
	 */
	distance(vector: Vector2): number {
		return this.subtract(vector).magnitude();
	}

	/**
	 * Скалярное произведение векторов
	 * Пример: проверка угла между векторами
	 */
	dot(vector: Vector2): number {
		return this.x * vector.x + this.y * vector.y;
	}

	/**
	 * Поворот вектора на угол в радианах
	 * Пример: поворот направления движения
	 */
	rotate(angle: number): Vector2 {
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);
		return new Vector2(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
	}

	// Статические методы для удобства
	static Zero(): Vector2 {
		return new Vector2(0, 0);
	}

	static One(): Vector2 {
		return new Vector2(1, 1);
	}

	static Up(): Vector2 {
		return new Vector2(0, -1);
	}

	static Down(): Vector2 {
		return new Vector2(0, 1);
	}

	static Left(): Vector2 {
		return new Vector2(-1, 0);
	}

	static Right(): Vector2 {
		return new Vector2(1, 0);
	}
}

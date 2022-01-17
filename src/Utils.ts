/**
 * Puzzle Pegs: A program that solves the 15-hole peg game (triangular board)
 * Copyright (C) 2021 Michael Hazell <michaelhazell@hotmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Utility functions
 */
export class Utils {
	/**
	 * Check if a value is within range (inclusive)
	 * @param {T} lower Lower bound
	 * @param {T} upper Upper bound
	 * @param {T} value Value to check against`
	 * @returns {boolean}
	 */
	public static checkInclusive<T>(lower: T, upper: T, value: T): boolean {
		if ((value >= lower) && (value <= upper)) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Count the number of items in an array that equals a value
	 * @param {T[]} array Array of items
	 * @param {T} value Value to check against
	 * @returns {number}
	 */
	public static count<T>(array: T[], value: T): number {
		let count = 0;
		for (let c of array) {
			if (c === value) {
				count++;
			}
		}
		return count;
	}
}

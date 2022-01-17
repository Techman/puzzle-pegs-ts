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

import { Utils } from "./Utils";

/**
 * Represents a peg game puzzle
 * Specifically: a 15-hole peg board (triangular)
 */
export class PuzzlePegs {
	// Universal representation of a peg
	private static peg: string = 'P';

	// Universal representation of a hole
	private static hole: string = 'H';

	// Table of all possible moves
	private static moves: number[][] = [
		[1, 2, 4],
		[1, 3, 6],
		[2, 4, 7],
		[2, 5, 9],
		[3, 5, 8],
		[3, 6, 10],
		[4, 2, 1],
		[4, 5, 6],
		[4, 7, 11],
		[4, 8, 13],
		[5, 8, 12],
		[5, 9, 14],
		[6, 3, 1],
		[6, 5, 4],
		[6, 9, 13],
		[6, 10, 15],
		[7, 4, 2],
		[7, 8, 9],
		[8, 5, 3],
		[8, 9, 10],
		[9, 5, 2],
		[9, 8, 7],
		[10, 6, 3],
		[10, 9, 8],
		[11, 7, 4],
		[11, 12, 13],
		[12, 8, 5],
		[12, 13, 14],
		[13, 12, 11],
		[13, 8, 4],
		[13, 9, 6],
		[13, 14, 15],
		[14, 13, 12],
		[14, 9, 5],
		[15, 10, 6],
		[15, 14, 13]
	];

	// History of boards representing the jumps
	private boards: string[][];

	// History of jumps
	private jumps: string[];

	// Starting hole location
	private startPos: number;

	// Ending peg location
	private endPos: number;

	/**
	 * Constructor
	 * @param {number} startPos The starting position of the hole
	 * @param {number} endPos The ending position of the peg, or -1 if location is not important
	 */
	constructor(startPos: number, endPos: number) {
		// Assign starting hole and ending peg location
		this.startPos = startPos;
		this.endPos = endPos;
		console.debug(`new PuzzlePegs(startPos = ${startPos}, endPos = ${endPos})`);

		// Initalize board and jump history
		this.boards = [];
		this.jumps = [];
	}

	private static printBoard(board: string[]): void {
		console.log(`    ${board[1]}`);
		console.log(`   ${board[2]} ${board[3]}`);
		console.log(`  ${board[4]} ${board[5]} ${board[6]}`);
		console.log(` ${board[7]} ${board[8]} ${board[9]} ${board[10]}`);
		console.log(`${board[11]} ${board[12]} ${board[13]} ${board[14]} ${board[15]}`);
	}

	public solve(): boolean {
		// Build the board.
		let board = new Array<string>(16);
		board[0] = ' '; // Space is not used
		for (let i = 1; i < 16; ++i) {
			if (this.startPos == i) {
				board[i] = PuzzlePegs.hole;
			} else {
				board[i] = PuzzlePegs.peg;
			}
		}

		// Store the original board to show before moves are printed
		let original = Array.from(board);

		// Now, solve the puzzle!
		if (this.solveInternal(board)) {
			console.log('Initial board');
			PuzzlePegs.printBoard(original);

			// Print the moves and board to the output. The moves (jumps) are in reverse order
			// due to the recursion. The board states are not.
			this.jumps.reverse();
			for (let i = 0; i < this.boards.length; ++i) {
				console.log(this.jumps[i]);
				PuzzlePegs.printBoard(this.boards[i]);
			}
			return true;
		} else {
			console.log('No solution could be found for this combination');
			return false;
		}

	}

	private solveInternal(board: string[]): boolean {
		// For every move in the table of possible moves...
		for (let move of PuzzlePegs.moves) {
			// See if we can match a PPH pattern. If we can, try following this route by calling
			// ourselves again with this modified board
			if ((board[move[0]] == PuzzlePegs.peg) && (board[move[1]] == PuzzlePegs.peg) && (board[move[2]] == PuzzlePegs.hole)) {
				// Apply the move
				board[move[0]] = PuzzlePegs.hole;
				board[move[1]] = PuzzlePegs.hole;
				board[move[2]] = PuzzlePegs.peg;

				// Record the board in history of boards
				let clone = Array.from(board);
				this.boards.push(clone);

				// Call ourselves recursively. If we return true then the conclusion was good.
				// If it was false, we hit a dead end and we shouldn't print the board
				if (this.solveInternal(board)) {
					this.jumps.push(`Moved ${move[0]} to ${move[2]}, jumping over ${move[1]}`);
					return true;
				}

				// If we end up here, undo the move and try the next one
				this.boards.pop();
				board[move[0]] = PuzzlePegs.peg;
				board[move[1]] = PuzzlePegs.peg;
				board[move[2]] = PuzzlePegs.hole;
			}
		}

		// If no pattern is matched, see if there is only one peg left and see if it is in the
		// right spot.
		// Situation 1: Count of PEG is 1 and the ending position was not specified
		let pegCount = Utils.count(board, PuzzlePegs.peg);
		if ((pegCount === 1) && (this.endPos === -1)) {
			return true;
		}
		// Situation 2: Count of PEG is 1 and the value at the ending position was PEG
		else if ((pegCount === 1) && (board[this.endPos] === PuzzlePegs.peg)) {
			return true;
		}
		// Situation 3: Count of PEG was not 1 or the value at the ending position was not PEG
		else {
			return false;
		}
	}
}

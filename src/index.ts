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

import { ArgumentParser } from 'argparse';
import { PuzzlePegs } from './PuzzlePegs';

interface Args {
	start_pos: number;
	end_pos: number;
}

function main() {
	// Parse command line arguments
	// NOTE: When changing this, make sure to update the Args interface at the top
	const parser = new ArgumentParser({
		description: 'Solve triangular puzzle peg game with 15 pegs',
		exit_on_error: true
	});
	parser.add_argument('-s', '--start_pos', {
		// @ts-ignore
		choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
		help: 'The location of the hole when the game begins, e.g. 13',
		required: true,
		type: 'int',
	});
	parser.add_argument('-e', '--end_pos', {
		// @ts-ignore
		choices: [-1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
		help: 'The location of the last peg, e.g. 13',
		required: true,
		type: 'int'
	});
	const args: Args = parser.parse_args();

	// Build puzzle
	let puzzle = new PuzzlePegs(args.start_pos, args.end_pos);
	puzzle.solve();
}

main();

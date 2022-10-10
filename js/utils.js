// Write a function to check status of tic-tac-toe game
// Ref: what is tic-tac-toe game: https://en.wikipedia.org/wiki/Tic-tac-toe
// In summary, tic-tac-toe game has 9 cells divided into 3 rows of 3 cells.
// Each cell can have 3 values: either X, O or empty.
// We say X is win if there are 3 'X' in either horizontal, vertical or diagonal row.
// The same to O.
// If 9 cells is full of values but no one win, then the game is ended.
//
// Given an array of 9 items: [a0, a1, ..., a7, a8] represent for the tic-tac-toe game cells value:
// |  a0  | a1  | a2  |
// |  a3  | a4  | a5  |
// |  a6  | a7  | a8  |
// Each item will receive either of 3 values: empty, X or O.
// Return an object includes two keys:
// - `status`: a string indicate status of the game. It can be one of the following values:
//    - 'X': if X is win
//    - `O`: if O is win
//    - 'END': if game is ended and no one win
//    - 'PLAYING': if no one is win and game is not ended yet.
//
// - `winPositions`:
//    - If X or O is win, return indexes of the 3 winning marks(X/O).
//    - Return empty array.
//
// Example:
// Input array: cellValues = ['X', 'O', 'O', '', 'X', '', '', 'O', 'X']; represent for
// |  X  | O  | O  |
// |     | X  |    |
// |     | O  | X  |
// -----
// ANSWER:
// {
//    status: 'X',
//    winPositions: [0, 4, 8],
// }
//

import { CELL_VALUE, GAME_STATUS } from './constants.js';

// Input: an array of 9 items
// Output: an object as mentioned above
export function checkGameStatus(cellValues) {
  // Write your code here ...
  // Please feel free to add more helper function if you want.
  // It's not required to write everything just in this function.
  if (!Array.isArray(cellValues) || cellValues.length !== 25) {
    throw new Error('Invalid cell vales');
  }

  const checkSetList = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],

    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],

    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
  ];

  // win
  const winSetIndex = checkSetList.findIndex((set) => {
    const first = cellValues[set[0]];
    const second = cellValues[set[1]];
    const third = cellValues[set[2]];
    const fourth = cellValues[set[3]];
    const fifth = cellValues[set[4]];

    return (
      first !== '' && first === second && second === third && third === fourth && fourth === fifth
    );
  });

  if (winSetIndex >= 0) {
    const winValueIndex = checkSetList[winSetIndex][1];
    const winValue = cellValues[winValueIndex];
    return {
      status: winValue === CELL_VALUE.CIRCLE ? GAME_STATUS.O_WIN : GAME_STATUS.X_WIN,
      winPositions: checkSetList[winSetIndex],
    };
  }
  // end
  // playing
  const isEndGame = cellValues.filter((x) => x === '').length === 0;
  return {
    status: isEndGame ? GAME_STATUS.ENDED : GAME_STATUS.PLAYING,
    winPositions: [],
  };
}


function solveNQueen(n) {
    if (!Number.isInteger(n) || n < 1 || n > 15) {
        throw new Error('N must be an integer between 1 and 15');
    }

    const board = Array.from(
        { length: n },
        () => Array(n).fill(0)
    );

    const solutions = [];

    function isSafe(row, col) {
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 1) {
                return false;
            }
        }

        for (
            let i = row - 1, j = col - 1;
            i >= 0 && j >= 0;
            i--, j--
        ) {
            if (board[i][j] === 1) {
                return false;
            }
        }

        for (
            let i = row - 1, j = col + 1;
            i >= 0 && j < n;
            i--, j++
        ) {
            if (board[i][j] === 1) {
                return false;
            }
        }

        return true;
    }

    function backtrack(row) {
        if (row === n) {
            solutions.push(
                board.map(currentRow => [...currentRow])
            );
            return;
        }

        for (let col = 0; col < n; col++) {
            if (isSafe(row, col)) {
                board[row][col] = 1;

                backtrack(row + 1);

                board[row][col] = 0;
            }
        }
    }

    backtrack(0);

    return {
        n,
        totalSolutions: solutions.length,
        solutions
    };
}

module.exports = solveNQueen;


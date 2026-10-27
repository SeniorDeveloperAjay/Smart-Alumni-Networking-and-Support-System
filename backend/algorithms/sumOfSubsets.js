function sumOfSubsets(numbers, target) {
    const solutions = [];
    const selected = [];

    function backtrack(index, currentSum) {
        if (currentSum === target) {
            solutions.push([...selected]);
            return;
        }

        if (index >= numbers.length || currentSum > target) {
            return;
        }

        // Include the current number
        selected.push(numbers[index]);
        backtrack(index + 1, currentSum + numbers[index]);
        selected.pop();

        // Exclude the current number
        backtrack(index + 1, currentSum);
    }

    backtrack(0, 0);

    return solutions;
}

module.exports = sumOfSubsets;
function matrixChainMultiplication(dimensions) {
    if (
        !Array.isArray(dimensions) ||
        dimensions.length < 2 ||
        !dimensions.every(
            dimension =>
                Number.isInteger(dimension) && dimension > 0
        )
    ) {
        throw new Error(
            'Dimensions must be an array of at least two positive integers'
        );
    }

    const n = dimensions.length - 1;

    const dp = Array.from(
        { length: n },
        () => Array(n).fill(0)
    );

    const split = Array.from(
        { length: n },
        () => Array(n).fill(0)
    );

    for (let length = 2; length <= n; length++) {
        for (let i = 0; i <= n - length; i++) {
            const j = i + length - 1;
            dp[i][j] = Infinity;

            for (let k = i; k < j; k++) {
                const cost =
                    dp[i][k] +
                    dp[k + 1][j] +
                    dimensions[i] *
                    dimensions[k + 1] *
                    dimensions[j + 1];

                if (cost < dp[i][j]) {
                    dp[i][j] = cost;
                    split[i][j] = k;
                }
            }
        }
    }

    function getOptimalOrder(i, j) {
        if (i === j) {
            return `A${i + 1}`;
        }

        const k = split[i][j];

        return `(${getOptimalOrder(i, k)} × ${getOptimalOrder(k + 1, j)})`;
    }

    return {
        minimumMultiplications: dp[0][n - 1],
        optimalOrder: getOptimalOrder(0, n - 1)
    };
}

module.exports = matrixChainMultiplication;
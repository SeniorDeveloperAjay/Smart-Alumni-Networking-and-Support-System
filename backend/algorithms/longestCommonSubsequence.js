function longestCommonSubsequence(first, second) {
    const m = first.length;
    const n = second.length;

    const dp = Array.from(
        { length: m + 1 },
        () => Array(n + 1).fill(0)
    );

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (first[i - 1] === second[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(
                    dp[i - 1][j],
                    dp[i][j - 1]
                );
            }
        }
    }

    const sequence = [];
    let i = m;
    let j = n;

    while (i > 0 && j > 0) {
        if (first[i - 1] === second[j - 1]) {
            sequence.unshift(first[i - 1]);
            i--;
            j--;
        } else if (dp[i - 1][j] >= dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }

    return {
        length: dp[m][n],
        sequence
    };
}

module.exports = longestCommonSubsequence;
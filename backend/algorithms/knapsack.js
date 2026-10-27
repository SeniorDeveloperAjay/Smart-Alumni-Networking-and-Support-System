function knapsack(items, capacity) {
    if (!Array.isArray(items) || capacity < 0) {
        throw new Error('Invalid items or capacity');
    }

    if (!Number.isInteger(capacity)) {
        throw new Error('Capacity must be an integer');
    }

    for (const item of items) {
        if (
            !Number.isInteger(item.weight) ||
            item.weight <= 0 ||
            typeof item.value !== 'number' ||
            !Number.isFinite(item.value) ||
            item.value < 0
        ) {
            throw new Error(
                'Each item must have a positive integer weight and a non-negative value'
            );
        }
    }

    const n = items.length;

    const dp = Array.from(
        { length: n + 1 },
        () => Array(capacity + 1).fill(0)
    );

    for (let i = 1; i <= n; i++) {
        const { weight, value } = items[i - 1];

        for (let w = 0; w <= capacity; w++) {
            dp[i][w] = dp[i - 1][w];

            if (weight <= w) {
                dp[i][w] = Math.max(
                    dp[i][w],
                    value + dp[i - 1][w - weight]
                );
            }
        }
    }

    const selectedItems = [];
    let remainingCapacity = capacity;

    for (let i = n; i > 0; i--) {
        if (dp[i][remainingCapacity] !== dp[i - 1][remainingCapacity]) {
            selectedItems.push(items[i - 1]);
            remainingCapacity -= items[i - 1].weight;
        }
    }

    selectedItems.reverse();

    return {
        maximumValue: dp[n][capacity],
        totalWeight: selectedItems.reduce(
            (total, item) => total + item.weight,
            0
        ),
        selectedItems
    };
}

module.exports = knapsack;
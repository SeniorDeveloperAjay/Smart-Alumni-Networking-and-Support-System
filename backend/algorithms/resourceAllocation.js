
function resourceAllocation(benefits, totalSessions) {
    if (
        !Array.isArray(benefits) ||
        benefits.length === 0 ||
        !Number.isInteger(totalSessions) ||
        totalSessions < 0
    ) {
        throw new Error(
            'Provide a valid benefits array and a non-negative integer for total sessions'
        );
    }

    for (const studentBenefits of benefits) {
        if (
            !Array.isArray(studentBenefits) ||
            studentBenefits.length === 0 ||
            !studentBenefits.every(
                benefit =>
                    typeof benefit === 'number' &&
                    Number.isFinite(benefit) &&
                    benefit >= 0
            )
        ) {
            throw new Error(
                'Each student must have a non-empty array of non-negative benefits'
            );
        }
    }

    const studentCount = benefits.length;

    const dp = Array.from(
        { length: studentCount + 1 },
        () => Array(totalSessions + 1).fill(0)
    );

    const allocation = Array.from(
        { length: studentCount + 1 },
        () => Array(totalSessions + 1).fill(0)
    );

    for (let i = 1; i <= studentCount; i++) {
        for (let sessions = 0; sessions <= totalSessions; sessions++) {
            for (
                let assigned = 0;
                assigned < benefits[i - 1].length &&
                assigned <= sessions;
                assigned++
            ) {
                const benefit =
                    dp[i - 1][sessions - assigned] +
                    benefits[i - 1][assigned];

                if (benefit > dp[i][sessions]) {
                    dp[i][sessions] = benefit;
                    allocation[i][sessions] = assigned;
                }
            }
        }
    }

    const studentAllocations = Array(studentCount).fill(0);
    let remainingSessions = totalSessions;

    for (let i = studentCount; i >= 1; i--) {
        const assigned = allocation[i][remainingSessions];

        studentAllocations[i - 1] = assigned;
        remainingSessions -= assigned;
    }

    return {
        totalSessions,
        maximumBenefit: dp[studentCount][totalSessions],
        studentAllocations
    };
}

module.exports = resourceAllocation;



function buildWeightedGraph(users) {
    const vertices = users.map((user) => user._id.toString());
    const edges = [];

    for (let i = 0; i < users.length; i++) {
        for (let j = i + 1; j < users.length; j++) {
            const userA = users[i];
            const userB = users[j];

            const skillsA = new Set(
                (userA.skills || []).map((skill) => skill.toLowerCase())
            );

            const skillsB = new Set(
                (userB.skills || []).map((skill) => skill.toLowerCase())
            );

            const commonSkills = [...skillsA].filter(
                (skill) => skillsB.has(skill)
            ).length;

            const sameDepartment =
                userA.department &&
                userB.department &&
                userA.department.toLowerCase() ===
                    userB.department.toLowerCase();

            // Lower weight means a stronger potential match.
            const weight = Math.max(
                1,
                10 - commonSkills * 2 - (sameDepartment ? 2 : 0)
            );

            edges.push({
                from: userA._id.toString(),
                to: userB._id.toString(),
                weight
            });
        }
    }

    return { vertices, edges };
}

module.exports = buildWeightedGraph;


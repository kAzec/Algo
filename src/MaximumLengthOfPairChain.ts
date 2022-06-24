function findLongestChain(pairs: number[][]): number {
    pairs.sort((a, b) => a[1] - b[1])
    var len = 0
    var tail = -Infinity
    for (let [left, right] of pairs) {
        if (left > tail) {
            len += 1
            tail = right
        }
    }
    return len
}

function findLongestChain_2(pairs: number[][]): number {
    let len = pairs.length
    if (len <= 1) return len

    pairs.sort((a, b) => a[1] - b[1])
    var dp = Array(len).fill(1)
    for (let i = 1; i < len; i++) {
        let [li, ri] = pairs[i]
        var max = 0
        for (let j = 0; j < i; j++) {
            let [lj, rj] = pairs[j]
            max = Math.max(max, dp[j] + (li > rj ? 1 : 0))
        }
        dp[i] = max
    }
    return dp[len - 1]
}

console.assert(findLongestChain([[1,2],[2,3],[3,4]]) == 2)
console.assert(findLongestChain_2([[1,2],[2,3],[3,4]]) == 2)

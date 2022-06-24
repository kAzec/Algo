function minDistance2(word1: string, word2: string): number {
    let l1 = word1.length, l2 = word2.length
    var dp = Array(l2 + 1)
    for (let j = 1; j <= l2; j++) {
        dp[j] = j // dp[0][j] = j
    }
    for (let i = 1; i <= l1; i++) {
        let c1 = word1.charCodeAt(i - 1)
        dp[0] = i // dp[i][0] = i
        var prev = i - 1 // dp[i - 1][j - 1]
        for (let j = 1; j <= l2; j++) {
            let temp = dp[j] // dp[i - 1][j]
            let c2 = word2.charCodeAt(j - 1)
            if (c1 == c2) {
                dp[j] = prev
            } else {
                let deleteC1 = temp + 1
                let deleteC2 = dp[j - 1] + 1
                dp[j] = Math.min(deleteC1, deleteC2)
            }
            prev = temp
        }
    }
    return dp[l2]
}

console.assert(minDistance2("sea", "eat") == 2)
console.assert(minDistance2("a", "b") == 2)

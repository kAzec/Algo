function longestCommonSubsequence(text1: string, text2: string): number {
    let n = text1.length, m = text2.length
    var dp: number[][] = Array.from(Array(n + 1), () => Array(m + 1).fill(0))
    for (let i = 1; i <= n; i++) {
        let ci = text1.charCodeAt(i - 1)
        for (let j = 1; j <= m; j++) {
            let cj = text2.charCodeAt(j - 1)
            if (ci == cj) {
                dp[i][j] = dp[i - 1][j - 1] + 1
            } else {
                dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j])
            }
        }
    }
    return dp[n][m]
}

console.assert(longestCommonSubsequence("abcde", "ace") == 3)
console.assert(longestCommonSubsequence("pqrsvwf", "shmtulqrypy") == 2)

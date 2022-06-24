function minDistance(word1: string, word2: string): number {
    var m = word1.length, n = word2.length
    var dp: number[][] = Array.from(Array(m + 1), () => Array(n + 1).fill(0))
    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            if (i == 0) {
                dp[0][j] = j
            } else if (j == 0) {
                dp[i][0] = i
            } else {
                let c1 = word1.charCodeAt(i - 1);
                let c2 = word2.charCodeAt(j - 1)
                if (c1 == c2) {
                    // dp[i][j] remain the same
                    dp[i][j] = dp[i - 1][j - 1]
                } else {
                    // m1 m2 m2...mi-1 mi
                    // n1 n2 n3...nj-1 nj
                    let replaceIJ = dp[i - 1][j - 1] + 1
                    // m1 m2 m2........mi-1 mi <-- delete this
                    // n1 n2 n3...nj-1 nj
                    let deleteI = dp[i - 1][j] + 1
                    // m1 m2 m2...mi-1 mi
                    // n1 n2 n3........nj-1 nj <-- insert this
                    let insertJ = dp[i][j - 1] + 1
                    dp[i][j] = Math.min(replaceIJ, deleteI, insertJ)
                }
            }
        }
    }
    return dp[m][n]
}

// In each iteration, all we need are dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]
// Let's store dp[i - 1][...] to an array and use one singe variable to store dp[i][j - 1]
function minDistance_2(word1: string, word2: string): number {
    var m = word1.length, n = word2.length
    var dp: number[] = Array(n + 1)

    // Initialize dp[j] into previous dp[0][j]
    for (let j = 0; j <= n; j++) {
        dp[j] = j
    }

    var prev: number // dp[i - 1][j - 1]
    for (let i = 1; i <= m; i++) {
        prev = dp[0] // dp[i - 1][0]
        dp[0] = i // dp[i][0] = i
        for (let j = 1; j <= n; j++) {
            let temp = dp[j] // dp[i - 1][j]
            let c1 = word1.charCodeAt(i - 1);
            let c2 = word2.charCodeAt(j - 1)
            if (c1 == c2) {
                // dp[i][j] remain the same
                dp[j] = prev
            } else {
                // m1 m2 m2...mi-1 mi
                // n1 n2 n3...nj-1 nj
                let replaceIJ = prev + 1
                // m1 m2 m2........mi-1 mi <-- delete this
                // n1 n2 n3...nj-1 nj
                let deleteI = temp + 1 // dp[i - 1][j] + 1
                // m1 m2 m2...mi-1 mi
                // n1 n2 n3........nj-1 nj <-- insert this
                let insertJ = dp[j - 1] + 1 // dp[i][j - 1] + 1
                dp[j] = Math.min(replaceIJ, deleteI, insertJ)
            }
            prev = temp
        }
    }
    return dp[n]
}

console.assert(minDistance("a", "a") == 0)
console.assert(minDistance_2("a", "a") == 0)

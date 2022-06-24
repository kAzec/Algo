function updateMatrix(mat: number[][]): number[][] {
    let m = mat.length, n = mat[0].length
    var dp: number[][] = Array.from(Array(m), () => Array(n).fill(Number.MAX_SAFE_INTEGER - 1))

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            let n = mat[i][j]
            if (n == 0) {
                dp[i][j] = 0
            } else {
                var d = dp[i][j]
                if (i > 0) {
                    d = Math.min(d, dp[i - 1][j] + 1)
                }
                if (j > 0) {
                    d = Math.min(d, dp[i][j - 1] + 1)
                }
                dp[i][j] = d
            }
        }
    }

    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (mat[i][j] != 0) {
                var d = dp[i][j]
                if (i < m - 1) {
                    d = Math.min(d, dp[i + 1][j] + 1)
                }
                if (j < n - 1) {
                    d = Math.min(d, dp[i][j + 1] + 1)
                }
                dp[i][j] = d
            }
        }
    }
    return dp
}

console.log(updateMatrix([[0,0,0],[0,1,0],[1,1,1]]))

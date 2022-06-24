function minPathSum(grid: number[][]): number {
    let m = grid.length, n = grid[0].length
    var dp: number[][] = Array.from(Array(m), () => Array(n))

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            var sum = grid[i][j]
            if (i != 0 && j != 0) {
                sum = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
            } else if (i == 0 && j != 0) {
                sum += dp[i][j - 1]
            } else if (i != 0 && j == 0) {
                sum += dp[i - 1][j]
            }
            dp[i][j] = sum
        }
    }
    return dp[m - 1][n - 1]
}

function minPathSum2(grid: number[][]): number {
    let m = grid.length, n = grid[0].length
    var dp: number[] = Array(n)

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            var sum = grid[i][j]
            if (i != 0 && j != 0) {
                sum = Math.min(dp[j], dp[j - 1]) + grid[i][j]
            } else if (i == 0 && j != 0) {
                sum += dp[j - 1]
            } else if (i != 0 && j == 0) {
                sum += dp[j]
            }
            dp[j] = sum
        }
    }
    return dp[n - 1]
}

console.log(minPathSum2([[1,2,3],[4,5,6]]))

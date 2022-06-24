function numSquares(n: number): number {
    var dp = Array(n + 1)
    dp[0] = 0
    for (let i = 1; i <= n; i++) {
        var min = Number.MAX_SAFE_INTEGER
        for (let j = 1; j * j <= i; j++) {
            min = Math.min(min, dp[i - j * j])
        }
        dp[i] = min + 1
    }
    return dp[n]
}

function numSquares2(n: number): number {
    // Find the largest number maxr so that maxr * maxr <= n
    let maxr = Math.floor(Math.sqrt(n))

    // Find all perfect squares less than or equal to maxr * maxr
    var r2 = Array(maxr - 1)
    for (let i = 1; i <= maxr; i++) {
        r2[i - 1] = maxr * maxr
    }

    // If n itself is a perfect number, return 1
    if (n == r2[maxr - 1]) {
        return 1
    }

    // Searching for the shortest path from 0 to n
    var level = 0
    // var deque: number[] = []
    // deque.push(0)
    // while (deque.length > 0) {
    //     level += 1
    //     for (let i = 0; i < r2.length; i++) {
    //         let newCur = cur + r2[i]
    //         if (newCur <= n) {
    //             cur = newCur
    //             level += 1
    //             break
    //         } else {

    //         }
    //     }
    // }
    return level
}

console.log(numSquares(12))

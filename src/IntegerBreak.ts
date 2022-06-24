function integerBreak(n: number): number {
    // dp[i] = max(dp[i - n] * dp[n] for n in [1:i-1])
    var dp = Array(n + 1)
    dp[0] = dp[1] = dp[2] = 1
    for (let i = 3; i <= n; i++) {
        var max = i - 1
        for (let j = 1; j < i; j++) {
            max = Math.max(max, Math.max(i - j, dp[i - j]) * Math.max(j, dp[j]))
        }
        dp[i] = max
    }
    return dp[n]
}

function integerBreak_2(n: number): number {
    if (n <= 2) return 1
    if (n == 3) return 2
    var product = 1
    while (n >= 5) {
        product *= 3
        n -= 3
    }
    product *= n
    return product
}

console.assert(integerBreak(3) == 2)
console.assert(integerBreak(10) == 36)

console.assert(integerBreak_2(3) == 2)
console.assert(integerBreak_2(10) == 36)

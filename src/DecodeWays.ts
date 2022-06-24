function numDecodings(s: string): number {
    let l = s.length
    if (l == 0) return 0 // ""

    var prev = s.charCodeAt(0) - 48
    if (prev == 0) return 0 // "0.*"

    if (l == 1) return 1; // "x"

    var dp = Array(l + 1).fill(1)
    for (let i = 2; i <= s.length; i++) {
        let cur = s.charCodeAt(i - 1) - 48;
        if (cur == 0) {
            // Must concat with pc
            if (prev == 0 || prev > 2) return 0
            dp[i] = dp[i - 2]
        } else if (prev * 10 + cur > 26 || prev == 0) {
            // Cannot concat with pc
            dp[i] = dp[i - 1]
        } else {
            // May concat with pc, also may not
            dp[i] = dp[i - 1] + dp[i - 2]
        }
        prev = cur
    }
    return dp[s.length]
}

console.assert(numDecodings("12") == 2)
console.assert(numDecodings("226") == 3)
console.assert(numDecodings("06") == 0)
console.assert(numDecodings("30") == 0)
console.assert(numDecodings("301") == 0)

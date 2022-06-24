function wordBreak(s: string, wordDict: string[]): boolean {
    let l = s.length
    let set = new Set(wordDict)

    var dp: boolean[] = Array(l + 1)
    dp[0] = true
    for (let i = 1; i <= l; i++) {
        var can = false
        for (let j = 0; !can && j < i; j++) {
            let s2 = s.slice(j, i)
            can ||= dp[j] && set.has(s2)
        }
        dp[i] = can
    }
    return dp[l]
}

console.assert(wordBreak("ab", ["a", "b"]))
console.assert(wordBreak("applepenapple", ["apple", "pen"]))

function isMatch(s: string, p: string): boolean {
    var dp: boolean[][] = Array.from(Array(p.length + 1), () => Array(s.length + 1))
    dp[0].fill(false)
    dp[0][0] = true

    for (let i = 0; i < p.length; i++) {
        let pc = p[i];
        dp[i + 1][0] = pc == "*" && dp[i][0]
    }

    for (let i = 0; i < p.length; i++) {
        let pc = p[i]
        for (let j = 0; j < s.length; j++) {
            let sc = s[j]
            if (pc == "?") {
                dp[i + 1][j + 1] = dp[i][j];
            } else if (pc == "*") {
                let result = false
                for (let k = j; k >= 0; k--) {
                    result ||= dp[i][j + 1] || dp[i + 1][j]
                }
                dp[i + 1][j + 1] = result
            } else {
                dp[i + 1][j + 1] = (pc == sc) && dp[i][j]
            }
        }
    }
    return dp[p.length][s.length]
}

function isMatch2(s: string, p: string): boolean {
    var i: number = s.length - 1, j: number = p.length - 1
    var ai = -1, aj = -1
    while (i >= 0) {
        console.log(`Matching ${s.substring(0, i + 1)} against ${p.substring(0, j + 1)}`)
        let sc = s[i], pc = p[j]
        if (sc == pc || pc == "?") {
            i--
            j--
        } else if (pc == "*") {
            if (j == 0) return true // asterisk at head
            ai = i
            aj = j
            j--
        } else if (aj != -1) {
            i = --ai
            j = aj - 1
        } else return false
    }

    while (p[j] == "*") j--
    return j == -1
}

// console.assert(isMatch2("aa", "a?"))
console.assert(isMatch2("aa", "a*"))
// console.assert(!isMatch2("aa", "a"))
// console.assert(!isMatch2("cb", "?a"))
// console.assert(!isMatch2("aab", "c*a*b"))

function isRegexMatch(s: string, p: string): boolean {
    var dp: boolean[][] = Array.from(Array(s.length + 1), () => Array(p.length + 1))
    let testMatch = (si: number, pi: number): boolean => {
        let matched = dp[si][pi]
        if (matched == undefined) {
            // console.log(`Matching ${s.substring(si)} against ${p.substring(pi)}`)
            matched = testMatchCore(si, pi)
            // console.log(`Match ${s.substring(si)} against ${p.substring(pi)}: ${matched}`)
            dp[si][pi] = matched
        }
        return matched
    }
    let testMatchCore = (si: number, pi: number): boolean => {
        let sAtEnd = si >= s.length
        let pAtEnd = pi >= p.length
        if (sAtEnd && pAtEnd) {
            return true
        } else if (!sAtEnd && pAtEnd) {
            return false
        } else if (sAtEnd && !pAtEnd) {
            // p can only be repeated pattern of "".*"" or "\w*"
            if ((p.length - pi) % 2 == 1) return false
            for (; pi < p.length - 1; pi += 2) {
                if (p[pi + 1] != "*") return false
            }
            return true
        }

        let pc = p[pi], pnc = p[pi + 1];
        // console.assert(pc != "*", "Invalid pattern.")
        if (pc == ".") {
            if (pnc == "*") {
                for (; si <= s.length; si++) {
                    if (testMatch(si, pi + 2)) {
                        return true
                    }
                }
                return false
            } else {
                return testMatch(si + 1, pi + 1)
            }
        } else {
            if (pnc == "*") {
                for (let i = si; i <= s.length; i++) {
                    if (i > si && s[i - 1] != pc) return false
                    if (testMatch(i, pi + 2)) return true
                }
                return false
            } else {
                return pc == s[si] && testMatch(si + 1, pi + 1)
            }
        }
    }
    return testMatch(0, 0)
}

console.assert(isRegexMatch("aa", "a") == false)
console.assert(isRegexMatch("aa", "a*") == true)
console.assert(isRegexMatch("aaa", "a*a") == true)
console.assert(isRegexMatch("aab", "c*a*b") == true)
console.assert(isRegexMatch("bbab", "b*a*") == false)
console.assert(isRegexMatch("abcaaaaaaabaabcabac", ".*ab.a.*a*a*.*b*b*") == true)

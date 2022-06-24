function longestPalindrome(s: string): string {
    if (s.length <= 1) return s

    var pi = 0, pl = 1
    let checkPalindrome = (l: number, r: number) => {
        var newl = r - l - 1
        while (l < r && l >= 0 && r < s.length && s[r] == s[l]) {
            r++
            l--
            newl += 2
        }
        if (newl > pl) {
            pi = l + 1
            pl = newl
        }
    }

    checkPalindrome(0, 1)
    for (let i = 0; i < s.length - 1; i++) {
        checkPalindrome(i, i + 1)
        checkPalindrome(i, i + 2)
    }
    return s.substring(pi, pi + pl)
}

console.log(longestPalindrome("bb"))

function longestPalindrome2(s: string): string {
    let n = s.length
    if (n <= 1) return s
    var ri = 0, rj = 0
    var dp: boolean[][] = Array.from(Array(n), () => Array(n))
    for (let i = n - 1; i >= 0; i--) {
        dp[i][i] = true // one char is always a palindrome
        for (let j = i + 1; j < n; j++) {
            let is = s[i] == s[j] && ((j - i <= 1) || dp[i+1][j-1])
            console.log(`${s.substring(i, j + 1)} is palindrome: ${is}, len: (${j - i + 1})`)
            dp[i][j] = is
            if (is && j - i > rj - ri) {
                ri = i
                rj = j
            }
        }
    }
    return s.substring(ri, rj + 1)
}

console.log(longestPalindrome2("asdaabbc"))

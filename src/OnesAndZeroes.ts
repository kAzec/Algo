type MN = {mi: number, ni: number}

function p_findMaxForm(mns: MN[], si: number, m: number, n: number): number {
    console.log(`${si}:${m}:${n}`)
    if (si >= mns.length) return 0

    let {mi, ni}: MN = mns[si]
    if (mi > m || ni > n) {
        return p_findMaxForm(mns, si + 1, m, n)
    } else {
        return Math.max(p_findMaxForm(mns, si + 1, m, n), 1 + p_findMaxForm(mns, si + 1, m - mi, n - ni))
    }
}

function findMaxForm(strs: string[], m: number, n: number): number {
    let mns = strs.map(str => {
        let mi = 0, ni = 0
        for (let i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) == 48) {
                mi += 1
            } else {
                ni += 1
            }
        }
        return { mi, ni } as MN
    })
    return p_findMaxForm(mns, 0, m, n)
}

function findMaxForm2(strs: string[], m: number, n: number): number {
    var dp: number[][] = Array.from(Array(m + 1), () => Array(n + 1).fill(0))
    for (let i = 0; i < strs.length; i++) {
        let str = strs[i];
        let mi = 0, ni = 0
        for (let i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) == 48) {
                mi += 1
            } else {
                ni += 1
            }
        }
        for (let j = m; j >= 0; j--) {
            for (let k = n; k >= 0; k--) {
                if (mi > j || ni > k) {
                    // Unable to add this str to the subset, the max value remain unchanged to i - 1
                    // dp[j][k] = dp[j][k]
                } else {
                    // This str may be added to the subset, also may be not added.
                    dp[j][k] = Math.max(dp[j][k], 1 + dp[j - mi][k - ni])
                }
            }
        }
    }
    return dp[m][n]
}

console.assert(findMaxForm(["10","0001","111001","1","0"], 5, 3) == 4)
console.assert(findMaxForm2(["10","0001","111001","1","0"], 5, 3) == 4)
// console.assert(findMaxForm(["10","0","1"], 1, 1) == 2)

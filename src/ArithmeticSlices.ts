function numberOfArithmeticSlices(nums: number[]): number {
    let l = nums.length
    if (l < 3) return 0;

    var cnt = 0
    var cur = nums[0], delta = 0, streak = 1
    for (let i = 1; i <= nums.length; i++) {
        let n = nums[i]
        let nd = n - cur
        if (nd == delta) {
            streak ++
        } else {
            if (streak >= 3) {
                cnt += (streak - 1) * (streak - 2) / 2
            }
            delta = nd
            streak = 2
        }
        cur = n
    }
    return cnt
}

function numberOfArithmeticSlices2(nums: number[]): number {
    let l = nums.length
    if (l < 3) return 0

    var dp: number[] = Array(l - 2).fill(0)
    for (let i = 2; i < l; i++) {
        let ni = nums[i], ni1 = nums[i - 1], ni2 = nums[i - 2]
        if (ni - ni1 == ni1 - ni2) {
            dp[i - 1] = dp[i - 2] + 1
        }
    }
    return dp.reduce((p, c) => p + c, 0)
}

console.log(numberOfArithmeticSlices2([0, 0, 0, 2, 1, 2, 3, 4]))

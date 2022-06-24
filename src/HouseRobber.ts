function rob(nums: number[]): number {
    let n = nums.length
    if (n == 0) return 0
    if (n == 1) return nums[0]

    var last1 = Math.max(nums[0], nums[1])
    var last2 = nums[0]
    for (let i = 2; i < n; i++) {
        let sum  = Math.max(last1, last2 + nums[i])
        last2 = last1
        last1 = sum
    }
    return last1
}

function rob_2(nums: number[]): number {
    let n = nums.length
    var pre = 0, cur = 0
    for (let i = 0; i < n; i++) {
        let sum  = Math.max(cur, pre + nums[i])
        pre = cur
        cur = sum
    }
    return cur
}

console.log(rob_2([2, 7, 9, 3, 1]))

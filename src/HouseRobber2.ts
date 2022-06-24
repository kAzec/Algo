function rob2_helper(start: number, end: number, nums: number[]): number {
    var pre = 0, cur = 0
    for (let i = start; i < end; i++) {
        let sum  = Math.max(cur, pre + nums[i])
        pre = cur
        cur = sum
    }
    return cur
}

function rob2(nums: number[]): number {
    let len = nums.length
    if (len == 1) return nums[0]
    return Math.max(rob2_helper(0, len - 1, nums), rob2_helper(1, len, nums))
}

console.log(rob2([2, 3, 2]))

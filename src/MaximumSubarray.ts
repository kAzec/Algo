function maxSubArray(nums: number[]): number {
    // dp[i] := the sum of subarray with end index i with max sum
    let len = nums.length
    var dp = Array(len)
    dp[0] = nums[0]
    for (let i = 1; i < len; i++) {
        let n = nums[i];
        dp[i] = Math.max(n, dp[i - 1] + n)
    }
    return Math.max(...dp)
}

function maxSubArray_2(nums: number[]): number {
    let len = nums.length
    var sum = nums[0], max = sum
    for (let i = 1; i < len; i++) {
        let n = nums[i];
        sum = Math.max(n, sum + n)
        max = Math.max(max, sum)
    }
    return max
}

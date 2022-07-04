function lengthOfLIS(nums: number[]): number {
    if (nums.length <=  1) return nums.length

    var dp: number[] = Array(nums.length).fill(1)
    for (let i = 1; i < nums.length; i++) {
        let n = nums[i];
        for (let j = 0; j < i; j++) {
            let m = nums[j];
            if (m < n) {
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
        }
    }

    return Math.max(...dp)
}

function LIS(nums: number[]): number[] {
    let l = nums.length
    if (l <=  1) return nums

    var dp: { len: number, ptr: number }[] = Array(l)
    for (let i = 0; i < l; i++) {
        let n = nums[i];
        dp[i] = {len: 1, ptr: -1}
        for (let j = 0; j < i; j++) {
            let m = nums[j];
            if (m < n) {
                if (dp[j].len + 1 > dp[i].len) {
                    dp[i].len = dp[j].len + 1
                    dp[i].ptr = j
                }
            }
        }
    }

    var ptr = -1
    var len = 0
    for (let i = 0; i < dp.length; i++) {
        const d = dp[i];
        if (d.len > len) {
            ptr = i
        }
    }
    var lis: number[] = []
    while (ptr != -1) {
        lis.unshift(nums[ptr])
        ptr = dp[ptr].ptr
    }
    return lis
}

function bisect_left(n: number, nums: number[]): number {
    var mid = 0
    var lower = 0, upper = nums.length - 1
    do {
        mid = Math.floor((lower + upper) / 2)
        let dm = nums[mid]
        if (dm < n) {
            lower = mid + 1
        } else {
            upper = mid
        }
    } while (lower < upper);
    return lower
}

function lengthOfLIS2(nums: number[]): number {
    let l = nums.length
    if (l <= 1) return l

    var dp = [nums[0]]
    var dl = 1
    for (let i = 1; i < l; i++) {
        let n = nums[i];
        if (n > dp[dl]) {
            // Extend the current LIS
            dp.push(n)
            dl += 1
        } else {
            dp[bisect_left(n, dp)] = n
        }
    }
    return dp.length
}

function lengthOfLIS2_specialized(nums: number[]): number {
    let l = nums.length
    if (l <= 1) return l

    var dp = [nums[0]]
    var dl = 1
outer:
    for (let i = 1; i < l; i++) {
        let n = nums[i];
        if (n > dp[dl]) {
            // Extend the current LIS
            dp.push(n)
            dl += 1
        } else {
            var mid = 0
            var lower = 0, upper = dp.length - 1
            do {
                mid = Math.floor((lower + upper) / 2)
                let dm = dp[mid]
                if (dm == n) {
                    continue outer
                } else if (dm < n) {
                    lower = mid + 1
                } else {
                    upper = mid
                }
            } while (lower < upper);
            dp[lower] = n
        }
    }

    return dp.length
}

console.log(lengthOfLIS([10,9,2,5,3,7,101,18]))
console.log(lengthOfLIS2([10,9,2,5,3,7,101,18]))

function canPartition(nums: number[]): boolean {
    let len = nums.length
    if (len <= 1) {
        return false
    }

    let sum = nums.reduce((n1, n2) => n1 + n2)
    if (sum % 2 != 0) {
        return false
    }

    let target = sum / 2
    var dp: boolean[][] = Array.from(Array(len + 1), () => Array(target + 1).fill(false))
    dp[0][0] = true
    for (let i = 1; i <= len; i++) {
        let n = nums[i - 1];
        for (let j = 1; j <= target; j++) {
            if (n > j) {
                // n is always a positive number, so impossible to sum up to j with n
                dp[i][j] = dp[i - 1][j]
            } else {
                // n is smaller than j, we have two options here:
                // 1. don't count n, which is the same as above.
                // 2. count n, then in order to sum up to j with n,
                //    then the rest numbers must sum up to j - n.
                dp[i][j] = dp[i - 1][j] || dp[i - 1][j - n]
            }
        }
    }

    return dp[len][target]
}

function canPartition2(nums: number[]): boolean {
    let len = nums.length
    if (len <= 1) {
        return false
    }

    let sum = nums.reduce((n1, n2) => n1 + n2)
    if (sum % 2 != 0) {
        return false
    }

    let target = sum / 2
    var dp: boolean[] = Array(target + 1).fill(false)
    dp[0] = true
    for (let i = 1; i <= len; i++) {
        let n = nums[i - 1];
        for (let j = target; j >= 1; j--) {
            // Reverse iteration because the need access to dp[j - n] for previous i
            if (n > j) {
                // n is always a positive number, so impossible to sum up to j with n
                // dp[j] = dp[j]
            } else {
                // n is smaller than j, we have two options here:
                // 1. don't count n, which is the same as above.
                // 2. count n, then in order to sum up to j with n,
                //    then the rest numbers must sum up to j - n.
                dp[j] = dp[j] || dp[j - n]
            }
        }
    }

    return dp[target]
}

function orBit(bits: Int8Array, pos: number, op: boolean)
{
    let bit = pos % 8
    let byte = (pos - bit) / 8
    bits[byte] |= (op ? 1 : 0) << bit
}

function getBit(bits: Int8Array, pos: number): boolean
{
    let bit = pos % 8
    let byte = (pos - bit) / 8
    let bitmask = 1 << bit
    return (bits[byte] & bitmask) != 0
}

function canPartition3(nums: number[]): boolean {
    let len = nums.length
    if (len <= 1) {
        return false
    }

    let sum = nums.reduce((n1, n2) => n1 + n2)
    if (sum % 2 != 0) {
        return false
    }

    let target = sum / 2
    var dp = new Int8Array(Math.ceil((target + 1) / 8))
    dp[0] = 1
    for (let i = 1; i <= len; i++) {
        let n = nums[i - 1];
        for (let j = target; j >= 1; j--) {
            // Reverse iteration because the need access to dp[j - n] for previous i
            if (n > j) {
                // n is always a positive number, so impossible to sum up to j with n
                // dp[j] = dp[j]
            } else {
                // n is smaller than j, we have two options here:
                // 1. don't count n, which is the same as above.
                // 2. count n, then in order to sum up to j with n,
                //    then the rest numbers must sum up to j - n.
                orBit(dp, j, getBit(dp, j - n))
            }
        }
    }

    return getBit(dp, target)
}

 console.assert(!canPartition([1,2,5]))
 console.assert(canPartition([1,5,11,5]))
 console.assert(!canPartition2([1,2,5]))
 console.assert(canPartition2([1,5,11,5]))
 console.assert(!canPartition3([1,2,5]))
 console.assert(canPartition3([1,5,11,5]))

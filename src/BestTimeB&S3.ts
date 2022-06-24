function maxProfit3(prices: number[]): number {
    var s1 = -prices[0], s2 = -Infinity, s3 = -Infinity, s4 = -Infinity
    for (let i = 1; i < prices.length; i++) {
        let p = prices[i];
        s1 = Math.max(s1, -p)
        s2 = Math.max(s2, s1 + p)
        s3 = Math.max(s3, s2 - p)
        s4 = Math.max(s4, s3 + p)
    }
    return Math.max(0, s4)
}

console.log(maxProfit3([1,2,3,4,5]))

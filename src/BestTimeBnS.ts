function maxProfit(prices: number[]): number {
    let len = prices.length
    if (len <= 1) return 0

    var max = Array(len - 1)
    max[len - 2] = prices[len - 1]
    for (let i = len - 2; i >= 1; i--) {
        max[i - 1] = Math.max(max[i], prices[i])
    }

    var profit = 0
    for (let i = 0; i < len - 1; i++) {
        let p = prices[i];
        profit = Math.max(profit, max[i] - p)
    }
    return profit
}

function maxProfit_2(prices: number[]): number {
    var profit = 0, min = Infinity
    for (let i = 0; i < prices.length; i++) {
        let p = prices[i];
        profit = Math.max(profit, p - min)
        min = Math.min(min, p)
    }
    return profit
}

console.assert(maxProfit([1]) == 0)
console.assert(maxProfit([7,6,4,3,1]) == 0)
console.assert(maxProfit([7,1,5,3,6,4]) == 5)

console.assert(maxProfit_2([1]) == 0)
console.assert(maxProfit_2([7,6,4,3,1]) == 0)
console.assert(maxProfit_2([7,1,5,3,6,4]) == 5)

function maxProfit2(prices: number[]): number {
    var profit = 0
    for (let i = 1; i < prices.length; i++) {
        profit += Math.max(0, prices[i] - prices[i - 1]);
    }
    return profit
}

console.log(maxProfit2([7,1,5,3,6,4]))

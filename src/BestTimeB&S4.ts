function maxProfit4(k: number, prices: number[]): number {
    if (k == 0) return 0

    let len = prices.length
    if (2 * k >= len) {
        // We can buy & sell everyday
        var profit = 0
        for (let i = 1; i < len; i++) {
            profit += Math.max(0, prices[i] - prices[i - 1]);
        }
        return profit
    }

    var buy = Array(k).fill(-Infinity)
    var sell = Array(k + 1).fill(-Infinity)
    buy[0] = -prices[0];
    sell[0] = 0 // Initial balance, sell starts at 1
    for (let i = 1; i < len; i++) {
        let p = prices[i];
        for (let j = 0; j < k; j++) {
            buy[j] = Math.max(buy[j], sell[j] - p)
            sell[j + 1] = Math.max(sell[j + 1], buy[j] + p)
        }
    }
    return Math.max(0, sell[k])
}

console.log(maxProfit4(2, [1,2,3,4,5]))

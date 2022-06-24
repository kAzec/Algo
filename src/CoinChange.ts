function coinChange(coins: number[], target: number): number {
    if (coins.length == 0) return 0

    var result: {[coin: number]: number} = {}
    var results = Array(target + 1)

    for (let i = Math.min(...coins); i <= target; i++) {
        var cost = Infinity
        for (let coin of coins) {
            if (coin <= i) {
                cost = Math.min(cost, results[i - coin] + 1)
            }
        }
        results[i] = cost
    }

    return isFinite(results[target]) ? results[target] : -1
}

type CostResult = {
    cost: number,
    detail: {
        [coin: number]: number
    }
}

function detailedCoinChange(coins: number[], target: number): CostResult {
    var results: CostResult[] = [{ cost: 0, detail: {} }]

    for (let i = Math.min(...coins); i <= target; i++) {
        var cost = Infinity
        var usedCash = null
        var prevResult: CostResult = null
        for (let coin of coins) {
            let c = results[i - coin]
            if (c != undefined && c.cost < cost) {
                cost = c.cost
                usedCash = coin
                prevResult = c
            }
        }

        if (!isFinite(cost)) continue

        cost += 1
        let detail = Object.assign({}, prevResult.detail)
        let prevNum = detail[usedCash] ?? 0
        detail[usedCash] = prevNum + 1
        results[i] = { cost, detail}
    }

    return results[target]
}

let r = coinChange([1, 5, 11, 21, 52], 151)
let rd = detailedCoinChange([1, 5, 11, 21, 52], 151)

console.log(r)
console.log(rd.cost)
console.log(rd.detail)

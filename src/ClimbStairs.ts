function climbStairs(n: number): number {
    if (n <= 3) return n
    var last1 = 3, last2 = 2
    for (let i = 4; i < n; i++) {
        let v = last1 + last2
        last2 = last1
        last1 = v
    }
    return last1 + last2
}

console.log(climbStairs(10))

function generateParenthesis(n: number): string[] {
    var results: string[] = []
    let backtrack = (S: string[] = [], left: number = 0, right: number = 0) => {
        if (S.length == 2 * n) {
            results.push(S.join(""))
            return
        }
        if (left < n) {
            S.push("(")
            backtrack(S, left + 1, right)
            S.pop()
        }
        if (right < left) {
            S.push(")")
            backtrack(S, left, right + 1)
            S.pop()
        }
    }
    backtrack()
    return results;
}

// Definition for a binary tree node.
class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

interface TreeNode {
    cachedVal: number
}

function rob3(root: TreeNode | null): number {
    if (root == null) return 0
    let cachedVal = root.cachedVal
    if (cachedVal) {
        return cachedVal
    }

    let val = Math.max(
        // Include root.val
        root.val + rob3(root.left?.left) + rob3(root.left?.right) + rob3(root.right?.left) + rob3(root.right?.right),
        // Exclude root.val
        rob3(root.left) + rob3(root.right)
    )
    return root.cachedVal = val
}

function rob3_1(root: TreeNode | null): number {
    if (root == null) return 0
    return Math.max(
        // Include root.val
        root.val + rob3(root.left?.left) + rob3(root.left?.right) + rob3(root.right?.left) + rob3(root.right?.right),
        // Exclude root.val
        rob3(root.left) + rob3(root.right)
    )
}

function rob3_2_helper(root: TreeNode | null): [number, number] {
    if (!root) return [0, 0]

    let left = rob3_2_helper(root.left)
    let right = rob3_2_helper(root.right)
    return [
        // Include root.val
        root.val + left[1] + right[1],
        // Exclude root.val
        left[0] + right[0]
    ]
}

function rob3_2(root: TreeNode | null): number {
    let ret = rob3_2_helper(root)
    return Math.max(ret[0], ret[1])
}

function twoSum(nums: number[], target: number): number[] {
    var sortedIndices = Array.from(nums.keys()).sort((n1, n2) => nums[n1] - nums[n2]);
    var head = 0;
    var tail = nums.length - 1;
    while (head < tail) {
        let i = sortedIndices[head];
        let j = sortedIndices[tail];
        let sum = nums[i] + nums[j];
        if (sum > target) { // Move tail left.
            tail -= 1;
        } else if (sum < target) { // Move head right;
            head += 1;
        } else {
            return [i, j];
        }
    };
    return [0, 0]; // Unreachable as long as the inputs are valid.
};

console.log(twoSum([3, 2, 4], 6));

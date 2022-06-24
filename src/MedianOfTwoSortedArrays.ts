function findMedianSortedArrays1(nums1: number[], nums2: number[]): number {
    let l1 = nums1.length, l2 = nums2.length
    let lsum = l1 + l2
    if (lsum == 0) return 0

    let odd = lsum % 2 == 1
    let lastNum = null
    let targetIdx = Math.trunc((lsum - 1) / 2)
    for (let i = 0, i1 = 0, i2 = 0;; i++) {
        let remainingIdx = null
        let remainingNums = null
        if (i1 == l1) { // nums1 has been exhausted.
            remainingIdx = i2
            remainingNums = nums2
        } else if (i2 == l2) { // nums2 has been exhausted.
            remainingIdx = i1
            remainingNums = nums1
        }

        if (remainingNums != null) {
            let offset = targetIdx - i
            let firstValue = null
            if (offset < 0) {
                firstValue = lastNum
            } else {
                firstValue = remainingNums[remainingIdx + offset]
            }
            if (odd) {
                return firstValue
            } else {
                let secondValue = remainingNums[remainingIdx + offset + 1]
                return (firstValue + secondValue) / 2
            }
        }

        let n1 = nums1[i1], n2 = nums2[i2]
        if (n1 <= n2) {
            lastNum = n1
            console.log(`Get ${n1} at nums1[${i1}]`)
            if (i1 < l1) i1 += 1
        } else {
            lastNum = n2
            console.log(`Get ${n2} at nums2[${i2}]`)
            if (i2 < l2) i2 += 1
        }

        if (i == targetIdx && i1 < l1 && i2 < l2) {
            if (odd) return lastNum
            let nextN1 = nums1[i1], nextN2 = nums2[i2]
            return (lastNum + Math.min(nextN1, nextN2)) / 2
        }
    }
}

function findMinimumIndexOfNumberInArray(target: number, nums: number[], start: number, end: number): number {
    if (target <= nums[start]) return start
    if (target >= nums[end]) return end

    while (start < end - 1) {
        let mid = Math.trunc(start + end) / 2
        if (nums[mid] > target) {
            end = mid
        } else {
            start = mid
        }
    }
    return start
}

class ArraySlice {
    backing: number[]
    startIndex: number
    endIndex: number

    constructor(arr: number[], start: number = 0, end?: number) {
        end = end ?? arr.length
        this.backing = arr
        this.startIndex = start
        this.endIndex = end
    }

    at(offset: number): number {
        return this.backing[this.startIndex + offset]
    }

    get length(): number {
        return this.endIndex - this.startIndex
    }

    toString(): String {
        return this.backing.slice(this.startIndex, this.endIndex).toString()
    }
}

function findMedianSortedArrays2(nums1: number[], nums2: number[]): number {
    let slice1 = new ArraySlice(nums1), slice2 = new ArraySlice(nums2)
    let totalLength = nums1.length + nums2.length
    if (totalLength == 0) return 0

    var nth = Math.trunc((totalLength - 1) / 2)
    let isEven = totalLength % 2 == 0
    var firstResult = null
    while (true) {
        console.log(`Search for ${nth}th number in ${slice1} and ${slice2}`)

        var result = null
        if (slice1.length == 0) result = slice2.at(nth)
        else if (slice2.length == 0) result = slice1.at(nth)
        else if (nth == 0) result = Math.min(slice1.at(0), slice2.at(0))

        if (result != null) {
            if (isEven) {
                if (firstResult != null) return (result + firstResult) / 2
                firstResult = result
                nth += 1 // execute one more loop
            } else {
                return result
            }
        }

        let odd = nth % 2 == 1
        let midN = odd ? (nth - 1) / 2 : (nth - 2) / 2
        let offset1 = Math.min(midN, slice1.length - 1)
        let offset2 = Math.min(midN, slice2.length - 1)

        let n1 = slice1.at(offset1)
        let n2 = slice2.at(offset2)

        if (n1 == n2) {
            slice1.startIndex += offset1
            slice2.startIndex += offset2 + 1
            nth -= offset1 + offset2 + 1
        } else if (n1 < n2) {
            slice1.startIndex += offset1 + 1
            nth -= offset1 + 1
        } else {
            slice2.startIndex += offset2 + 1
            nth -= offset2 + 1
        }
    }
}

let a1 = []
let a2 = [1, 2, 3, 4]
console.log(findMedianSortedArrays2(a1, a2))

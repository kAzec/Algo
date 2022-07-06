use crate::*;

impl Solution {
    pub fn single_non_duplicate(nums: Vec<i32>) -> i32 {
        // l1 l1 l2 l2 l3 l3 ... ln ln x r1 r1 ... rm rm
        // Total count: n * 2 + 1 + m * 2
        // in 0..2n, index of ending element is:
        // ni = 2i + 1, which is odd
        // in (2n+1)..(2n+2m), index of ending element is:
        // mj = 2n + 1 + 2j + 1 = 2n + 2j + 2, which is even

        let (mut lo, mut hi) = (0, nums.len());
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if mid == lo {
                break
            }

            #[allow(unused_assignments)]
            let mut end = 0;
            if nums[mid] == nums[mid - 1] {
                end = mid;
            } else if nums[mid] == nums[mid + 1] {
                end = mid + 1;
            } else {
                return nums[mid]
            }

            if end % 2 == 1 {
                lo = end + 1;
            } else {
                hi = end - 1;
            }
        }
        nums[lo]
    }

    
    pub fn single_non_duplicate_2(nums: Vec<i32>) -> i32 {
        let (mut lo, mut hi) = (0, nums.len() - 1);
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            // mid ^ 1 is:
            // mid + 1 if mid is even
            // mid - 1 if mid is odd
            // [mid, mid ^ 1] always matches the consecutive indices 2*i, 2*i + 1
            if nums[mid] == nums[mid ^ 1] {
                // the numbers at the indices are equal,
                // we are at the left part of the array
                lo = mid + 1;
            } else {
                // On the other hand, we are at the right part of the array
                hi = mid;
            }
        }
        nums[lo]
    }
}

#[cfg(test)]
mod Tests {
    use super::*;

    fn tester(f: impl Fn(Vec<i32>) -> i32) {
        assert_eq!(f(vec![1,1,2,3,3,4,4,8,8]), 2);
        assert_eq!(f(vec![3,3,7,7,10,11,11]), 10);
    }

    testcase!(single_non_duplicate);
    testcase!(single_non_duplicate_2);
}

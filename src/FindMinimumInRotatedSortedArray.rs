use crate::*;

impl Solution {
    pub fn find_min(nums: Vec<i32>) -> i32 {
        let (mut lo, mut hi, mut min) = (0, nums.len() - 1, i32::MAX);
        while lo <= hi {
            let mid = lo + (hi - lo) / 2;
            if nums[mid] >= nums[lo] {
                min = min.min(nums[lo]);
                lo = mid + 1;
            } else if nums[mid] <= nums[hi] {
                hi = mid - 1;
                min = min.min(nums[mid])
            }
        }
        min
    }

    pub fn find_min_2(nums: Vec<i32>) -> i32 {
        let (mut lo, mut hi) = (0, nums.len() - 1);
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if nums[mid] > nums[hi] {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        nums[hi]
    }

    // Find in possiblly duplicated values
    pub fn find_min_ii(nums: Vec<i32>) -> i32 {
        let (mut lo, mut hi) = (0, nums.len() - 1);
        while lo < hi {
            if nums[lo] < nums[hi] {
                // The current slice is increasing, nums[lo] is the minimum
                return nums[lo]
            }

            let mid = lo + (hi - lo) / 2;
            if nums[mid] > nums[hi] {
                lo = mid + 1;
            } else if nums[mid] < nums[hi] {
                hi = mid;
            } else {
                // nums[mid] == nums[hi]
                if nums[mid] < nums[lo] {
                    // We can stil be sure that mid is at/before the pivot
                    hi = mid;
                } else { // nums[mid] >= nums[lo]
                    // Because nums[lo] >= nums[hi] && nums[mid] == nums[hi];
                    assert!(nums[mid] == nums[lo]);
                    // We are not sure the pivot's relative position to mid,
                    // so narrow the search range by incrementing lo.
                    // We won't miss it because hi is unchanged.
                    lo += 1;
                }
            }
        }
        nums[hi]
    }
}

#[cfg(test)]
mod Tests {
    use super::*;

    fn tester(f: impl Fn(Vec<i32>) -> i32) {
        assert_eq!(f(vec![3,4,5,1,2]), 1);
        assert_eq!(f(vec![4,5,6,7,0,1,2]), 0);
        assert_eq!(f(vec![11,13,15,17]), 11);
    }

    fn tester_ii(f: impl Fn(Vec<i32>) -> i32) {
        assert_eq!(f(vec![1,3,5]), 1);
        assert_eq!(f(vec![1,3,3]), 1);
        assert_eq!(f(vec![2,2,2,0,1]), 0);
    }

    testcase!(tester, find_min);
    testcase!(tester, find_min_2);
    testcase!(tester_ii, find_min_ii);
}

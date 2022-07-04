use crate::*;

impl Solution {
    pub fn search_range(nums: Vec<i32>, target: i32) -> Vec<i32> {
        let (mut lo, mut hi) = (0, nums.len());
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if nums[mid] < target {
                lo = mid + 1;
            } else if nums[mid] > target {
                hi = mid;
            } else {
                // Found target at mid, the position can be arbitrary though.
                // Now find the first postion in [lo, mid].
                let mut fst_hi = mid;
                while lo < fst_hi {
                    let mid = lo + (fst_hi - lo) / 2;
                    if nums[mid] != target { // Found smaller number, set lo higher
                        lo = mid + 1;
                    } else {
                        fst_hi = mid;
                    }
                }

                // Then find the last position in [mid, hi).
                let mut lst_lo = mid;
                while lst_lo < hi - 1 {
                    let mid = lst_lo + (hi - lst_lo) / 2;
                    if nums[mid] != target { // Found larger number, set hi lower
                        hi = mid;
                    } else {
                        lst_lo = mid;
                    }
                }
                return vec![fst_hi as i32, lst_lo as i32]
            }
        }
        return vec![-1, -1];
    }
}

#[cfg(test)]
mod Tests {
    use super::*;

    fn tester(f: impl Fn(Vec<i32>, i32) -> Vec<i32>) {
        assert_eq!(f(vec![], 0), vec![-1,-1]);
        assert_eq!(f(vec![5,7,7,8,8,10], 8), vec![3,4]);
        assert_eq!(f(vec![5,7,7,8,8,10], 6), vec![-1,-1]);
    }

    testcase!(search_range);
}

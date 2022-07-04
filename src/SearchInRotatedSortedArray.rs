use crate::*;

impl Solution {
    fn bisect_left(slice: &[i32], target: i32) -> Option<i32> {
        // println!("Search target {} in {:?}", target, slice);
        let (mut lo, mut hi) = (0, slice.len());
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            match slice[mid] {
                m if m > target => hi = mid,
                m if m < target => lo = mid + 1,
                _ => return Some(mid as i32),
            }
        }
        return None
    }

    // Search with distinct values
    pub fn search(nums: Vec<i32>, target: i32) -> i32 {
        let (mut lo, mut hi) = (0, nums.len() - 1);
        while lo <= hi {
            let mid = lo + (hi - lo) / 2;
            let (ln, hn, mn) = (nums[lo], nums[hi], nums[mid]);

            // println!("lo: {}, hi: {}, mid: {}", lo, hi, mid);

            if mn == target {
                // println!("Found target {} at {}", target, mid);
                return mid as i32
            } else if mn >= ln {
                if ln <= target && target < mn { // target is in nums[lo..mid]
                    // println!("Search target {} in nums[{}..{}]", target, lo, mid);
                    return if let Some(pos) = Self::bisect_left(&nums[lo..mid], target) {
                        lo as i32 + pos
                    } else { - 1}
                } else {
                    lo = mid + 1;
                }
            } else if mn <= hn {
                if mn < target && target <= hn { // target is in nums[mid..=hi]
                    println!("Search target {} in nums[{}..={}]", target, mid, hi);
                    return if let Some(pos) = Self::bisect_left(&nums[mid..=hi], target) {
                        mid as i32 + pos
                    } else { - 1}
                } else {
                    hi = mid - 1;
                }
            } else {
                break
            }
        }
        -1
    }

    // Search with non-distinct values
    pub fn search_ii(nums: Vec<i32>, target: i32) -> bool {
        let (mut lo, mut hi) = (0, nums.len() - 1);
        while lo <= hi {
            let mid = lo + (hi - lo) / 2;
            let (ln, hn, mn) = (nums[lo], nums[hi], nums[mid]);

            // println!("lo: {}, hi: {}, mid: {}", lo, hi, mid);

            if mn == target {
                // println!("Found target {} at {}", target, mid);
                return true
            }

            // if ln == hn {
            //     if mn == ln {
            //         lo += 1;
            //     } else if mn > ln {
            //         // bisect in lo..mid
            //     } else if mn < hn {
            //         // bisect in mid..=hi
            //     }
            // } else if (ln > hn) {
            //     if mn >= ln {
            //         // bisect in lo..mid
            //     } else {
            //         assert!(mn <= hn);
            //         // bisect in mid..=hi
            //     }
            // } else { // ln < hn, which means the current slice is not rotated
            //     // bisect in
            // }

            if ln < hn { // The slice is not rotated
                return Self::bisect_left(&nums[lo..=hi], target).is_some()
            } else if ln == hn && mn == ln {
                // println!("Unable to determine mn = nums[{}] = {}'s position.", mid, mn);
                lo += 1;
            } else if mn >= ln {
                if ln <= target && target < mn { // target is in nums[lo..mid]
                    // println!("Search target {} in nums[{}..{}]", target, lo, mid);
                    return Self::bisect_left(&nums[lo..mid], target).is_some()
                } else {
                    lo = mid + 1;
                }
            } else if mn <= hn {
                if mn < target && target <= hn { // target is in nums[mid..=hi]
                    // println!("Search target {} in nums[{}..={}]", target, mid, hi);
                    return Self::bisect_left(&nums[mid..=hi], target).is_some()
                } else {
                    hi = mid - 1;
                }
            } else {
                panic!("Should be unreachable.");
            }
        }
        false
    }
}

#[cfg(test)]
mod Tests {
    use super::*;

    fn tester(f: impl Fn(Vec<i32>, i32) -> i32) {
        assert_eq!(f(vec![1], 0), -1);
        assert_eq!(f(vec![1, 3], 0), -1);
        assert_eq!(f(vec![3, 1], 1), 1);
        assert_eq!(f(vec![4,5,6,7,0,1,2], 0), 4);
        assert_eq!(f(vec![4,5,6,7,0,1,2], 3), -1);
    }

    fn tester_ii(f: impl Fn(Vec<i32>, i32) -> bool) {
        assert_eq!(f(vec![1,0,1,1,1], 0), true);
        assert_eq!(f(vec![2,5,6,0,0,1,2], 0), true);
        assert_eq!(f(vec![2,5,6,0,0,1,2], 3), false);
    }

    testcase!(tester, search);
    testcase!(tester_ii, search_ii);
}

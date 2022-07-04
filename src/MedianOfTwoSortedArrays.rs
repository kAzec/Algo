use crate::*;

impl Solution {
    pub fn find_median_sorted_arrays(mut nums1: Vec<i32>, mut nums2: Vec<i32>) -> f64 {
        if nums1.len() > nums2.len() {
            std::mem::swap(&mut nums1, &mut nums2);
        }

        let (n1, n2) = (nums1.len(), nums2.len());
        let k = (n1 + n2 + 1) / 2;

        let (mut lo, mut hi) = (0, n1);
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if nums1[mid] < nums2[k - mid - 1] {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }

        let (m1, m2) = (lo, k - lo);
        let M1 = i32::max(
            if m1 == 0 { i32::MIN } else { nums1[m1 - 1] },
            if m2 == 0 { i32::MIN } else { nums2[m2 - 1] }
        );

        if (n1 + n2) % 2 == 1 {
            M1 as f64
        } else {
            let M2 = i32::min(
                if m1 >= n1 { i32::MAX } else { nums1[m1] },
                if m2 >= n2 { i32::MAX } else { nums2[m2] }
            );
            (M1 + M2) as f64 / 2.0
        }
    }
}

#[cfg(test)]
mod Tests {
    use super::*;

    fn tester(f: impl Fn(Vec<i32>, Vec<i32>) -> f64) {
        assert_eq!(f(vec![1,3], vec![2]), 2.0);
    }

    testcase!(find_median_sorted_arrays);
}

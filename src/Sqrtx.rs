use crate::*;

impl Solution {
    pub fn my_sqrt(x: i32) -> i32 {
        if x <= 1 { return x }

        // Find integer n so that:
        // 1. n^2 <= x
        // 2. (n + 1)^2 > x
        let (mut lo, mut hi, mut last_lo) = (1, x.min(1073741824), -1);
        while lo <= hi {
            let mid = lo + (hi - lo) / 2;
            let div = x / mid;
            if div < mid { // n**2 > x, mid too large, not possible
                hi = mid - 1;
            } else if div > mid { // n**2 < x, mid is possible, but mid - 1 is not
                if last_lo == mid { break } // same last_lo assgined to mid for the second time, jump out dead loop
                lo = mid;
                last_lo = mid;
            } else { return mid } // n**2 == x, mid is found
        }
        // lo is always possible, hi is not. However hi are preferred since it maybe larger.
        if x / hi < hi { lo } else { hi }
    }

    pub fn my_sqrt_2(x: i32) -> i32 {
        let (mut lo, mut hi) = (1, x);
        while lo <= hi {
            let mid = lo + (hi - lo) / 2;
            if mid > x / mid {
                hi = mid - 1;
            } else {
                lo = mid + 1;
            }
        }
        hi
    }

    pub fn my_sqrt_3(x: i32) -> i32 {
        let (mut ret, lx) = (x as i64, x as i64);
        while ret * ret > lx {
            ret = (ret + lx / ret) / 2;
        }
        ret as i32
    }
}

#[cfg(test)]
mod Tests {
    use super::*;

    fn tester(f: impl Fn(i32) -> i32) {
        assert_eq!(f(4), (4 as f64).sqrt() as i32);
        assert_eq!(f(5), (5 as f64).sqrt() as i32);
        assert_eq!(f(8), (8 as f64).sqrt() as i32);
        assert_eq!(f(2147395599), (2147395599 as f64).sqrt() as i32);
    }

    testcase!(my_sqrt);
    testcase!(my_sqrt_2);
    testcase!(my_sqrt_3);
}

use crate::*;
use std::cmp::Ordering::*;

impl Solution {
    pub fn wiggle_max_length(nums: Vec<i32>) -> i32 {
        let mut ans = 1;
        let len = nums.len();
        let mut dp = vec![1; len * 2];
        for (i, ni) in nums.iter().enumerate().skip(1) {
            let (mut pos,mut neg) = (1, 1);
            for (j, nj) in nums[0..i].iter().enumerate() {
                if nj < ni {
                    pos = pos.max(dp[j + len] + 1);
                } else if nj > ni {
                    neg = neg.max(dp[j] + 1);
                }
            };
            (dp[i], dp[i+len]) = (pos, neg);
            ans = ans.max(pos).max(neg);
        }
        ans
    }

    pub fn wiggle_max_length_2(nums: Vec<i32>) -> i32 {
        let (mut up, mut down) = (1, 1);
        for i in 1..nums.len() {
            match nums[i].cmp(&nums[i - 1]) {
                Less => down = up + 1,
                Greater => up = down + 1,
                _ => ()
            }
        }
        up.max(down)
    }
}

#[cfg(test)]
mod Tests {
    use super::*;

    fn tester(f: impl Fn(Vec<i32>) -> i32) {
        assert_eq!(f(vec![1,7,4,9,2,5]), 6);
        assert_eq!(f(vec![1,17,5,10,13,15,10,5,16,8]), 7);
        assert_eq!(f(vec![1,2,3,4,5,6,7,8,9]), 2);
        assert_eq!(f(vec![3,3,3,2,5]), 3);
    }

    testcase!(wiggle_max_length);
    testcase!(wiggle_max_length_2);
}

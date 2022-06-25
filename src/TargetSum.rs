use std::ops::{Index, IndexMut};

use crate::*;

impl Solution {
    pub fn find_target_sum_ways(nums: Vec<i32>, target: i32) -> i32 {
        Self::find_target_sum_ways_helper(&nums[..], target)
    }

    fn find_target_sum_ways_helper(nums: &[i32], target: i32) -> i32 {
        if let Some((first, rest)) = nums.split_first() {
            Self::find_target_sum_ways_helper(rest, target - first) +
            Self::find_target_sum_ways_helper(rest, target + first)
        } else if target == 0 {
            1
        } else {
            0
        }
    }
}

struct DP {
    _vec: Vec<i32>
}

impl DP {
    const MAX_LEN: i32 = 2001;
    const ZERO_INDEX: i32 = 1000;

    fn new() -> Self {
        DP { _vec: vec![0; Self::MAX_LEN as usize] }
    }
}

impl Index<i32> for DP {
    type Output = i32;

    fn index(&self, index: i32) -> &i32 {
        let real_index = index + Self::ZERO_INDEX;
        if !(0..Self::MAX_LEN).contains(&real_index) {
            &0
        } else {
            &self._vec[real_index as usize]
        }
    }
}

impl IndexMut<i32> for DP {
    fn index_mut(&mut self, index: i32) -> &mut i32 {
        let real_index = index + Self::ZERO_INDEX;
        &mut self._vec[real_index as usize]
    }
}

impl Solution {
    pub fn find_target_sum_ways_2(nums: Vec<i32>, target: i32) -> i32 {
        let mut sum = nums[0];

        let (mut prev, mut cur) = (DP::new(), DP::new());
        prev[sum] += 1;
        prev[-sum] += 1;

        for num in nums.iter().skip(1) {
            sum += num;
            for j in -sum..=sum {
                cur[j] = prev[j - num] + prev[j + num];
            }
            std::mem::swap(&mut cur, &mut prev);
        }

        prev[target]
    }

    pub fn find_target_sum_ways_3(nums: Vec<i32>, target: i32) -> i32 {
        let max_sum: i32 = nums.iter().sum();
        if max_sum < target.abs() {
            return 0
        }

        let max_len = 2 * max_sum + 1;
        let (mut cur, mut next) = (vec![0; max_len as usize], vec![0; max_len as usize]);
        cur[max_sum as usize] = 1;

        for num in nums {
            for j in num..(max_len - num) {
                let temp = cur[j as usize];
                if temp > 0 {
                    next[(j - num) as usize] += temp;
                    next[(j + num) as usize] += temp;
                }
            }
            cur = next;
            next = vec![0; cur.len()];
        }

        cur[(target + max_sum) as usize]
    }

    pub fn find_target_sum_ways_4(nums: Vec<i32>, target: i32) -> i32 {
        // Reaching target is the same as reaching -target
        let target = target.abs();
        let max_sum: i32 = nums.iter().sum();

        // target must be le than max possible sum
        if max_sum < target { return 0 }

        // target = sum_p - sum_n;
        // target + sum_p + sum_n = target + sum = 2 * sum_p;
        // sum_p = (target + sum) / 2;
        // target + sum must be even
        if (max_sum + target) % 2 == 1 { return 0 }

        // Reaching target via + & - is the same as reaching sum_p with + & nums subset
        let sum_p = (max_sum + target) / 2;

        // Dynamic programming ways to reach sum_p
        let mut dp = vec![0; (sum_p + 1) as usize];
        dp[0] = 1;
        for n in nums {
            let n = n as usize;
            for j in (n..dp.len()).rev() {
                dp[j] += dp[j - n];
            }
        }
        dp[sum_p as usize]
    }
}

#[cfg(test)]
mod Tests {
    use super::*;

    fn tester(f: impl Fn(Vec<i32>, i32) -> i32) {
        // assert_eq!(f(vec![1], 1), 1);
        // assert_eq!(f(vec![1], -2), 0);
        // assert_eq!(f(vec![1, 0], 1), 2);
        // assert_eq!(f(vec![1000], 1000), 1);
        assert_eq!(f(vec![1, 999], 998), 1);
        assert_eq!(f(vec![1,1,1,1,1], 3), 5);
    }

    testcase!(find_target_sum_ways);
    testcase!(find_target_sum_ways_2);
    testcase!(find_target_sum_ways_3);
    testcase!(find_target_sum_ways_4);
}

use crate::*;

impl Solution {
    pub fn solver(nums: Vec<i32>) -> i32 {
        0
    }

    pub fn solver_2(nums: Vec<i32>) -> i32 {
        0
    }
}

#[cfg(test)]
mod Tests {
    use super::*;

    fn tester(f: impl Fn(Vec<i32>) -> i32) {
        assert_eq!(f(vec![]), 0);
    }

    testcase!(solver);
    testcase!(solver_2);
}

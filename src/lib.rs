#![allow(dead_code)]
#![allow(unused_macros)]
#![allow(non_snake_case)]

struct Solution;

macro_rules! testcase {
    ($fname:ident) => {
        testcase!(tester, $fname);
    };
    ($tester:ident, $fname:ident) => {
        #[test]
        fn $fname() {
            $tester(Solution::$fname);
        }
    }
}

mod MaximumLengthOfPairChain;
mod WiggleSubsequence;
mod TargetSum;
mod BestTimeBnSWithTRXFee;
mod Sqrtx;
mod FindPositionsOfElementInSortedArray;
mod SearchInRotatedSortedArray;
mod FindMinimumInRotatedSortedArray;
mod SingleElementInSortedArray;
mod MedianOfTwoSortedArrays;

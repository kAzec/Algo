use crate::*;

impl Solution {
    pub fn find_longest_chain(mut pairs: Vec<Vec<i32>>) -> i32 {
        pairs.sort_by_key(|a| a[1]);

        let mut max = pairs[0][1];
        let mut max_len = 1;
        for i in 1..pairs.len() {
            if pairs[i][0] > max {
                max = pairs[i][1];
                max_len += 1
            }
        }
        return max_len
    }

    pub fn find_longest_chain_2(mut pairs: Vec<Vec<i32>>) -> i32 {
        pairs.sort_by_key(|a| a[1]);

        let len = pairs.len();
        let mut dp = vec![1 as i32; len];
        for i in 1..len {
            let p = &pairs[i];
            let mut dpi = 1;
            for j in 0..i {
                let mut temp = dp[j];
                if p[0] > pairs[j][1] { // Chain can connect
                    temp += 1;
                }
                dpi = std::cmp::max(dpi, temp);
            }
            dp[i] = dpi;
        }

        dp[len - 1]
    }

    pub fn find_longest_chain_3(mut pairs: Vec<Vec<i32>>) -> i32 {
        pairs.sort_by_key(|a| a[1]);

        let mut len = 0;
        let mut dp = vec![];

        for p in pairs {
            let (left, right) = (p[0], p[1]);
            let i = dp.binary_search(&left).unwrap_or_else(|x| x);
            if i == len {
                len += 1;
                dp.push(right);
            } else {
                dp[i] = dp[i].min(right);
            }
        }

        len as i32
    }
}

#[cfg(test)]
mod Tests {
    use super::*;

    fn tester(f: impl Fn(Vec<Vec<i32>>) -> i32) {
        assert_eq!(f(vec![vec![1,2],vec![2,3],vec![3,4]]), 2);
        assert_eq!(f(vec![vec![1,2],vec![7,8],vec![4,5]]), 3);
        assert_eq!(f(vec![vec![-6,9],vec![1,6],vec![8,10],vec![-1,4],vec![-6,-2],vec![-9,8],vec![-5,3],vec![0,3]]), 3);
    }

    testcase!(find_longest_chain);
    testcase!(find_longest_chain_2);
    testcase!(find_longest_chain_3);
}

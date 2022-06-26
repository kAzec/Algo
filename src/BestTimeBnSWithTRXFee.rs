use crate::*;

impl Solution {
    #[allow(unused_assignments)]
    pub fn max_profit(prices: Vec<i32>, fee: i32) -> i32 {
        let days = prices.len();
        if days <= 1 { return 0 }

        let (mut prev_buy, mut prev_sell) = (-prices[0], 0);
        let (mut cur_buy, mut cur_sell) = (0, 0);

        for p in prices.iter().skip(1) {
            cur_buy = prev_buy.max(prev_sell - p);
            cur_sell = prev_sell.max(cur_buy + p - fee);
            std::mem::swap(&mut prev_buy, &mut cur_buy);
            std::mem::swap(&mut prev_sell, &mut cur_sell);
        }

        // Return prev_sell due to the last swap operation
        prev_sell
    }
}

#[cfg(test)]
mod Tests {
    use super::*;

    fn tester(f: impl Fn(Vec<i32>, i32) -> i32) {
        assert_eq!(f(vec![1,3,2,8,4,9], 2), 8);
        assert_eq!(f(vec![1,3,7,5,10,3], 3), 6);
        assert_eq!(f(vec![9,8,6,1,2], 3), 0);
        assert_eq!(f(vec![1], 0), 0);
    }

    testcase!(max_profit);
}

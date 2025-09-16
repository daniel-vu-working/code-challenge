/**
 * Sum to N Functions - Creative Implementations
 * Solution file containing all 3 creative implementations
 */

/**
 * Generator function that yields numbers from 1 to max
 * Used for lazy evaluation in sum_to_n_g function
 * @param {number} max - The maximum number to generate
 * @yields {number} - Numbers from 1 to max
 */
function* numberGenerator(max) {
    for (let i = 1; i <= max; i++) {
        yield i;
    }
}

/**
 * Implementation 1: Using Generator Function with Lazy Evaluation
 * Time complexity: O(n).
 * Space complexity: O(1).
 * @param {number} n - The target number to sum up to.
 * @returns {number} - The sum of integers from 1 to `n`.
 */
function sum_to_n_g(n) {
    if (n === 0) return 0;
    const abs_n = Math.abs(n);
    let sum = 0;
    
    for (const num of numberGenerator(abs_n)) {
        sum += num;
    }
    
    return n < 0 ? -sum : sum;
}

/**
 * Implementation 2: Using BigInt for Large Numbers
 * Time complexity: O(1).
 * Space complexity: O(1).
 * @param {number} n - The target number to sum up to.
 * @returns {number} - The sum of integers from 1 to `n`.
 */
function sum_to_n_h(n) {
    if (n === 0) return 0;
    const abs_n = Math.abs(n);
    const result = (BigInt(abs_n) * BigInt(abs_n + 1)) / 2n;
    return n < 0 ? -Number(result) : Number(result);
}

/**
 * Implementation 3: Using Memoization with Caching
 * Time complexity: O(1) after first call, O(1) for cached results.
 * Space complexity: O(n) for memo storage.
 * @param {number} n - The target number to sum up to.
 * @returns {number} - The sum of integers from 1 to `n`.
 */
const memo = new Map();
function sum_to_n_j(n) {
    if (memo.has(n)) return memo.get(n);
    
    let result;
    if (n === 0) {
        result = 0;
    } else {
        const abs_n = Math.abs(n);
        result = (abs_n * (abs_n + 1)) / 2;
        if (n < 0) result = -result;
    }
    
    memo.set(n, result);
    return result;
}

// Export functions for testing
module.exports = {
    sum_to_n_g,
    sum_to_n_h,
    sum_to_n_j,
    numberGenerator
};
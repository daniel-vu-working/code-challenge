// Import functions from solution.js
const { sum_to_n_g, sum_to_n_h, sum_to_n_j } = require('./solution.js');

// Test cases
console.log("=== Testing Top 3 Creative Methods ===\n");

console.log("🥇 Method 1 - Generator Function:");
console.log(sum_to_n_g(5));   // 15
console.log(sum_to_n_g(0));   // 0
console.log(sum_to_n_g(-5));  // -15

console.log("\n🥈 Method 2 - BigInt for Large Numbers:");
console.log(sum_to_n_h(5));   // 15
console.log(sum_to_n_h(0));   // 0
console.log(sum_to_n_h(-5));  // -15

console.log("\n🥉 Method 3 - Memoization with Caching:");
console.log(sum_to_n_j(5));   // 15
console.log(sum_to_n_j(0));   // 0
console.log(sum_to_n_j(-5));  // -15


// Performance test
console.log("\n=== Performance Test ===");
const testValue = 1000000;

console.time("Generator Function");
sum_to_n_g(testValue);
console.timeEnd("Generator Function");

console.time("BigInt Approach");
sum_to_n_h(testValue);
console.timeEnd("BigInt Approach");

console.time("Memoized (first call)");
sum_to_n_j(testValue);
console.timeEnd("Memoized (first call)");

console.time("Memoized (cached call)");
sum_to_n_j(testValue);
console.timeEnd("Memoized (cached call)");
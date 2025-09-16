# Sum to N Functions - Creative Implementations

3 creative and uncommon implementations of the sum to n function with unit tests.

## 🏆 The 3 Creative Methods

1. **Generator Function** (`sum_to_n_g`) - O(n) time, O(1) space
   - Uses ES6 generators (`yield` keyword)
   - Memory-efficient for huge numbers

2. **BigInt for Large Numbers** (`sum_to_n_h`) - O(1) time, O(1) space
   - Handles numbers beyond JavaScript's safe integer limit
   - Prevents overflow in financial/scientific calculations

3. **Memoization with Caching** (`sum_to_n_j`) - O(1) after first call
   - Caches results to avoid recalculation
   - Perfect for repeated function calls

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run demo
node index.js
```

## 📁 Files

- `solution.js` - Contains all 3 functions with JSDoc comments
- `index.js` - Demo and performance test
- `test.js` - Simple unit tests (16 test cases)

## 🎯 Why These 3?

- **Generator**: Rarely used, memory-efficient
- **BigInt**: Handles edge cases, future-proof  
- **Memoization**: Real-world optimization technique

All functions return identical results but use different approaches!

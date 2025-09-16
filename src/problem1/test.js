/**
 * Simple unit tests for sum_to_n functions
 */

const { sum_to_n_g, sum_to_n_h, sum_to_n_j } = require('./solution');

describe('Sum to N Functions - Simple Tests', () => {
  
  describe('Basic Functionality', () => {
    test('should return 0 for n = 0', () => {
      expect(sum_to_n_g(0)).toBe(0);
      expect(sum_to_n_h(0)).toBe(0);
      expect(sum_to_n_j(0)).toBe(0);
    });

    test('should return correct sum for positive numbers', () => {
      expect(sum_to_n_g(5)).toBe(15);
      expect(sum_to_n_h(5)).toBe(15);
      expect(sum_to_n_j(5)).toBe(15);
      
      expect(sum_to_n_g(10)).toBe(55);
      expect(sum_to_n_h(10)).toBe(55);
      expect(sum_to_n_j(10)).toBe(55);
    });

    test('should return negative sum for negative numbers', () => {
      expect(sum_to_n_g(-5)).toBe(-15);
      expect(sum_to_n_h(-5)).toBe(-15);
      expect(sum_to_n_j(-5)).toBe(-15);
      
      expect(sum_to_n_g(-10)).toBe(-55);
      expect(sum_to_n_h(-10)).toBe(-55);
      expect(sum_to_n_j(-10)).toBe(-55);
    });
  });

  describe('Cross-function Consistency', () => {
    const testCases = [0, 1, 5, 10, 100, -1, -5, -10, -100];

    testCases.forEach(n => {
      test(`all functions should return same result for n = ${n}`, () => {
        const resultG = sum_to_n_g(n);
        const resultH = sum_to_n_h(n);
        const resultJ = sum_to_n_j(n);
        
        expect(resultG).toBe(resultH);
        expect(resultH).toBe(resultJ);
      });
    });
  });

  describe('Performance Tests', () => {
    test('BigInt should be faster than Generator for large numbers', () => {
      const testValue = 100000;
      
      const startG = Date.now();
      const resultG = sum_to_n_g(testValue);
      const timeG = Date.now() - startG;

      const startH = Date.now();
      const resultH = sum_to_n_h(testValue);
      const timeH = Date.now() - startH;

      expect(resultG).toBe(resultH);
      expect(timeH).toBeLessThan(timeG);
    });

    test('Memoized function should cache results', () => {
      const testValue = 1000;
      
      // First call
      const result1 = sum_to_n_j(testValue);
      
      // Second call (should be cached)
      const result2 = sum_to_n_j(testValue);
      
      expect(result1).toBe(result2);
      expect(result1).toBe(500500);
    });
  });

  describe('Edge Cases', () => {
    test('should handle large numbers', () => {
      const largeNumber = 1000000;
      const resultG = sum_to_n_g(largeNumber);
      const resultH = sum_to_n_h(largeNumber);
      const resultJ = sum_to_n_j(largeNumber);
      
      expect(resultG).toBe(resultH);
      expect(resultH).toBe(resultJ);
    });

    test('BigInt should handle very large numbers', () => {
      const veryLarge = 1000000000000; // 1 trillion
      const result = sum_to_n_h(veryLarge);
      
      expect(result).toBe(500000000000500000000000);
    });
  });
});

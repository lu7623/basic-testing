// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 1, b: 2, action: Action.Add });

    expect(result).toEqual(3);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 7, b: 2, action: Action.Subtract });

    expect(result).toEqual(5);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 2, action: Action.Multiply });

    expect(result).toEqual(20);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 5, action: Action.Divide });

    expect(result).toEqual(2);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 7,
      action: Action.Exponentiate,
    });

    expect(result).toEqual(128);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 2, b: 7, action: '&' });

    expect(result).toEqual(null);
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: '2', b: 7, action: Action.Add });
    
    expect(result).toEqual(null);
  });
});

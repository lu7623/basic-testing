// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 9, b: 2, action: Action.Subtract, expected: 7 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 90, b: 9, action: Action.Divide, expected: 10 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 13, b: 2, action: Action.Multiply, expected: 26 },
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 8, action: Action.Exponentiate, expected: 256 },
  { a: 3, b: 2, action: '%', expected: null },
  { a: 3, b: 'uwu', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    `calculate($a $action $b) should return $expected`,
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});

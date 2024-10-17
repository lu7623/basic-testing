// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const res = generateLinkedList([1, 1, 1]);
    const expectLinkedList = {
      value: 1,
      next: {
        value: 1,
        next: {
          value: 1,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };

    expect(res).toStrictEqual(expectLinkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const res = generateLinkedList([1, 1, 1]);
    
    expect(res).toMatchSnapshot();
  });
});

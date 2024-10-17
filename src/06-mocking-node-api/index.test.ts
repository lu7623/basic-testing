// Uncomment the code below and write your tests
let mockExistSync = jest.fn();
let mockReadfile = jest.fn();

import { join } from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

jest.mock('path', () => ({
  join: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: mockReadfile,
}));

jest.mock('fs', () => ({
  existsSync: mockExistSync,
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const mockFunc = jest.fn();
    doStuffByTimeout(mockFunc, 8000);
    jest.runAllTimers();

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(mockFunc, 8000);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const mockFunc = jest.fn();
    doStuffByTimeout(mockFunc, 8000);

    expect(mockFunc).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const mockFunc = jest.fn();
    doStuffByInterval(mockFunc, 5000);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(mockFunc, 5000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    const mockFunc = jest.fn();
    doStuffByInterval(mockFunc, 1000);
    jest.advanceTimersByTime(3000);

    expect(mockFunc).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    await readFileAsynchronously('readme.txt');

    expect(join).toHaveBeenCalledWith(__dirname, 'readme.txt');
  });

  test('should return null if file does not exist', async () => {
    mockExistSync.mockReturnValue(false);
    const res = await readFileAsynchronously('readme.txt');

    expect(res).toBe(null);
  });

  test('should return file content if file exists', async () => {
    mockExistSync.mockReturnValue(true);
    mockReadfile.mockResolvedValue('Hello world');
    const res = await readFileAsynchronously('readme.txt');

    expect(res).toBe('Hello world');
  });
});

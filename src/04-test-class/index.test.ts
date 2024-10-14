// Uncomment the code below and write your tests
let mockRandom=jest.fn();

import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

jest.mock('lodash', () => ({
  random: mockRandom
}))

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAcc = getBankAccount(100);
    
    expect(bankAcc.getBalance()).toBe(100);
    expect(bankAcc).toBeInstanceOf(BankAccount);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAcc = getBankAccount(100);

    try {
      bankAcc.withdraw(200);
    } catch (error) {
      expect(error).toBeInstanceOf(InsufficientFundsError);
    }
  });

  test('should throw error when transferring more than balance', () => {
    const bankAcc = getBankAccount(100);
    const bankAcc1 = getBankAccount(100);

    try {
      bankAcc.transfer(200, bankAcc1);
    } catch (error) {
      expect(error).toBeInstanceOf(InsufficientFundsError);
    }
  });

  test('should throw error when transferring to the same account', () => {
    const bankAcc = getBankAccount(100);

    try {
      bankAcc.transfer(200, bankAcc);
    } catch (error) {
      expect(error).toBeInstanceOf(TransferFailedError);
    }
  });

  test('should deposit money', () => {
    const bankAcc = getBankAccount(100);

    expect(bankAcc.deposit(200).getBalance()).toBe(300);
  });

  test('should withdraw money', () => {
    const bankAcc = getBankAccount(100);

    expect(bankAcc.withdraw(50).getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    const bankAcc = getBankAccount(100);
    const bankAcc1 = getBankAccount(100);

    expect(bankAcc.transfer(50, bankAcc1).getBalance()).toBe(50);
    expect(bankAcc1.getBalance()).toBe(150);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAcc = getBankAccount(100);
    mockRandom.mockReturnValue(1)

    await expect(bankAcc.fetchBalance()).resolves.toEqual(expect.any(Number));
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAcc = getBankAccount(100);
    const MockFetchBalance = jest.fn().mockResolvedValue(20);
    bankAcc.fetchBalance = MockFetchBalance;

    await bankAcc.synchronizeBalance();

    expect(bankAcc.getBalance()).toBe(20);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAcc = getBankAccount(100);
    const MockFetchBalance = jest.fn().mockResolvedValue(null);
    bankAcc.fetchBalance = MockFetchBalance;

    try {
      await bankAcc.synchronizeBalance();
    } catch (error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});

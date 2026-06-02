import { kNumber } from '@/k-number/index';

describe('mixed format — boundary values', () => {
  test('0 -> ""', () => {
    expect(kNumber(0, { format: 'mixed' })).toBe('');
  });

  test('1 -> "1"', () => {
    expect(kNumber(1, { format: 'mixed' })).toBe('1');
  });

  test('-1 -> "-1"', () => {
    expect(kNumber(-1, { format: 'mixed' })).toBe('-1');
  });

  test('9999 -> "9999" (만 단위 미만은 숫자만)', () => {
    expect(kNumber(9999, { format: 'mixed' })).toBe('9999');
  });

  test('10000 -> "1만"', () => {
    expect(kNumber(10000, { format: 'mixed' })).toBe('1만');
  });

  test('10001 -> "1만1"', () => {
    expect(kNumber(10001, { format: 'mixed' })).toBe('1만1');
  });

  test('100000 -> "10만"', () => {
    expect(kNumber(100000, { format: 'mixed' })).toBe('10만');
  });

  test('123456 -> "12만3456"', () => {
    expect(kNumber(123456, { format: 'mixed' })).toBe('12만3456');
  });

  test('900_000_000_001 -> "9000억1"', () => {
    expect(kNumber(900_000_000_001, { format: 'mixed' })).toBe('9000억1');
  });

  test('-12345 -> "-1만2345"', () => {
    expect(kNumber(-12345, { format: 'mixed' })).toBe('-1만2345');
  });

  test('9_007_199_254_740_991 -> "9007조1992억5474만991"', () => {
    expect(kNumber(9_007_199_254_740_991, { format: 'mixed' })).toBe(
      '9007조1992억5474만991'
    );
  });
});

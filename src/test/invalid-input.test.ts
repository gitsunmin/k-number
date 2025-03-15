import { MAX_NUMBER, MIN_NUMBER } from '@/constants';

import { ErrorCollection } from '@/errors';
import { kNumber } from '@/k-number/index';

describe('invalid input', () => {
  test('소수점이 포함된 숫자', () => {
    expect(kNumber(3.14)).toBe(ErrorCollection.NOT_INTEGER);
  });

  test('지원하지 않는 포맷', () => {
    // @ts-expect-error
    expect(kNumber(1234, { format: 'english-only' })).toBe(
      ErrorCollection.INVALID_FORMAT
    );
  });

  test('숫자가 아닌 값을 입력받은 경우', () => {
    // @ts-expect-error
    expect(kNumber('동해물과백두산이말라버렸다.')).toBe(
      ErrorCollection.NOT_NUMBER)
      ;
  });

  test('최대 숫자를 넘긴 입력을 받은 경우', () => {
    expect(kNumber(MAX_NUMBER + 1)).toBe(
      ErrorCollection.OVER_MAX_NUMBER)
      ;
  });

  test('최소 숫자보다 낮은 입력을 받은 경우', () => {
    expect(kNumber(MIN_NUMBER - 1)).toBe(
      ErrorCollection.UNDER_MIN_NUMBER)
      ;
  });

  test('입력이 없는 경우', () => {
    // @ts-expect-error
    expect(kNumber(undefined)).toBe(ErrorCollection.NOT_NUMBER);
  });

  test('입력이 null 인 경우', () => {
    // @ts-expect-error
    expect(kNumber(null)).toBe(ErrorCollection.NOT_NUMBER);
  });

  test('custom error', () => {
    const customError = 'custom error';

    // @ts-expect-error
    expect(kNumber('동해물과백두산이말라버렸다.', { onError: () => customError })).toBe(customError);
  });

  test('custom error for 지원하지 않는 포맷', () => {
    const customError = 'custom error';

    expect(kNumber(1234, {
      // @ts-expect-error
      format: 'english-only', onError: () => customError
    })).toBe(
      customError
    );
  });

  test('custom error for 숫자가 아닌 값을 입력받은 경우', () => {
    const customError = '숫자가 아닙니다.';
    expect(kNumber(3.14, {
      // @ts-expect-error
      onError: (error) => {
        if (error === ErrorCollection.NOT_INTEGER) return customError;
      }
    })).toBe(
      customError
    );
  });

});

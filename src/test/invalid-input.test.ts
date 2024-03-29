import { MAX_NUMBER, MIN_NUMBER } from '../constants';

import { ErrorCollection } from '../errors';
import { kNumber } from '../k-number/index';

describe('invalid input', () => {
  test('소수점이 포함된 숫자', () => {
    expect(() => kNumber(3.14)).toThrow(ErrorCollection.NOT_INTEGER);
  });

  test('지원하지 않는 포맷', () => {
    // @ts-expect-error
    expect(() => kNumber(1234, { format: 'english-only' })).toThrow(
      ErrorCollection.INVALID_FORMAT
    );
  });

  test('숫자가 아닌 값을 입력받은 경우', () => {
    // @ts-expect-error
    expect(() => kNumber('동해물과백두산이말라버렸다.')).toThrow(
      ErrorCollection.NOT_NUMBER
    );
  });

  test('최대 숫자를 넘긴 입력을 받은 경우', () => {
    expect(() => kNumber(MAX_NUMBER + 1)).toThrow(
      ErrorCollection.OVER_MAX_NUMBER
    );
  });

  test('최소 숫자보다 낮은 입력을 받은 경우', () => {
    expect(() => kNumber(MIN_NUMBER - 1)).toThrow(
      ErrorCollection.UNDER_MIN_NUMBER
    );
  });
});

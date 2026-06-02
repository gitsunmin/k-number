import {
  kNumber,
  ErrorCollection,
  isInteger,
  BIG_UNITS,
  BIG_UNITS_EXTENDED,
  SMALL_UNITS,
  KOREAN_UNITS,
  STRING_NUMBERS,
  KOREAN_NUMBERS,
  K_NUMBER_FORMAT,
  MAX_NUMBER,
  MIN_NUMBER,
  MAX_BIGINT_NUMBER,
  MIN_BIGINT_NUMBER,
  NUMBER_AND_KOREAN_RECORD,
  LOG_PREFIX,
} from '@/index';

describe('public API — barrel export 접근 가능 여부', () => {
  test('kNumber 함수가 export됨', () => {
    expect(typeof kNumber).toBe('function');
  });

  test('ErrorCollection이 export됨', () => {
    expect(ErrorCollection.NOT_NUMBER).toBe('input is not number');
    expect(ErrorCollection.NOT_INTEGER).toBe('number is not integer');
    expect(ErrorCollection.OVER_MAX_NUMBER).toBe('number is too big');
    expect(ErrorCollection.UNDER_MIN_NUMBER).toBe('number is too small');
    expect(ErrorCollection.INVALID_FORMAT).toBe('invalid format');
    expect(ErrorCollection.UNKNOWN_ERROR).toBe('unknown error');
    expect(ErrorCollection.OVER_BIGINT_MAX_NUMBER).toBe('bigint is too big');
    expect(ErrorCollection.UNDER_BIGINT_MIN_NUMBER).toBe('bigint is too small');
  });

  test('상수들이 export됨', () => {
    expect(BIG_UNITS).toEqual(['만', '억', '조', '경']);
    expect(SMALL_UNITS).toEqual(['십', '백', '천']);
    expect(KOREAN_UNITS).toEqual(['십', '백', '천', '만', '억', '조', '경']);
    expect(STRING_NUMBERS).toEqual(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
    expect(KOREAN_NUMBERS).toEqual(['일', '이', '삼', '사', '오', '육', '칠', '팔', '구']);
    expect(K_NUMBER_FORMAT).toEqual(['korean-only', 'unit-only', 'mixed']);
    expect(MAX_NUMBER).toBe(9_007_199_254_740_991);
    expect(MIN_NUMBER).toBe(-9_007_199_254_740_991);
    expect(NUMBER_AND_KOREAN_RECORD['1']).toBe('일');
    expect(LOG_PREFIX).toBe('[@gitsunmin/k-number] >');
  });

  test('BigInt 관련 상수/에러가 export됨', () => {
    expect(BIG_UNITS_EXTENDED).toEqual([
      '만', '억', '조', '경',
      '해', '자', '양', '구', '간', '정', '재', '극',
      '항하사', '아승기', '나유타', '불가사의', '무량대수',
    ]);
    expect(MAX_BIGINT_NUMBER).toBe(BigInt(10) ** BigInt(72) - 1n);
    expect(MIN_BIGINT_NUMBER).toBe(-(BigInt(10) ** BigInt(72) - 1n));
  });
});

describe('isInteger 유틸', () => {
  test('정수 → true', () => {
    expect(isInteger(0)).toBe(true);
    expect(isInteger(1)).toBe(true);
    expect(isInteger(-1)).toBe(true);
    expect(isInteger(1_000_000)).toBe(true);
  });

  test('소수 → false', () => {
    expect(isInteger(0.1)).toBe(false);
    expect(isInteger(1.5)).toBe(false);
    expect(isInteger(-3.14)).toBe(false);
  });

  test('NaN, Infinity → false', () => {
    expect(isInteger(NaN)).toBe(false);
    expect(isInteger(Infinity)).toBe(false);
    expect(isInteger(-Infinity)).toBe(false);
  });
});

describe('kNumber — catch 블록 (예상치 못한 런타임 에러)', () => {
  test('내부에서 예외 발생 시 UNKNOWN_ERROR 반환', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const mathSpy = vi.spyOn(Math, 'abs').mockImplementationOnce(() => {
      throw new Error('unexpected');
    });

    expect(kNumber(100)).toBe(ErrorCollection.UNKNOWN_ERROR);
    expect(consoleSpy).toHaveBeenCalledOnce();

    consoleSpy.mockRestore();
    mathSpy.mockRestore();
  });

  test('catch 블록에서 onError 커스텀 핸들러가 호출됨', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const mathSpy = vi.spyOn(Math, 'abs').mockImplementationOnce(() => {
      throw new Error('unexpected');
    });

    const customError = '알 수 없는 오류';
    expect(kNumber(100, { onError: () => customError })).toBe(customError);

    consoleSpy.mockRestore();
    mathSpy.mockRestore();
  });

  test('catch 블록에서 onError가 undefined 반환 시 UNKNOWN_ERROR로 fallback', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const mathSpy = vi.spyOn(Math, 'abs').mockImplementationOnce(() => {
      throw new Error('unexpected');
    });

    expect(kNumber(100, { onError: () => undefined })).toBe(ErrorCollection.UNKNOWN_ERROR);

    consoleSpy.mockRestore();
    mathSpy.mockRestore();
  });
});

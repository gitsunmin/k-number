import {
  kNumber,
  ErrorCollection,
  MAX_BIGINT_NUMBER,
  MIN_BIGINT_NUMBER,
} from '@/index';

describe('kNumber — BigInt 기본 변환 (korean-only)', () => {
  test('0n → 빈 문자열', () => {
    expect(kNumber(0n)).toBe('');
  });

  test('단일 자리', () => {
    expect(kNumber(1n)).toBe('일');
    expect(kNumber(9n)).toBe('구');
  });

  test('십·백·천 — 일 생략 (국립국어원 표준)', () => {
    expect(kNumber(10n)).toBe('십');
    expect(kNumber(100n)).toBe('백');
    expect(kNumber(1_000n)).toBe('천');
    expect(kNumber(11n)).toBe('십일');
    expect(kNumber(110n)).toBe('백십');
    expect(kNumber(1_100n)).toBe('천백');
  });

  test('만·억 — 일 유지', () => {
    expect(kNumber(10_000n)).toBe('일만');
    expect(kNumber(100_000_000n)).toBe('일억');
  });

  test('경 (number로는 도달 불가였던 단위)', () => {
    expect(kNumber(10_000_000_000_000_000n)).toBe('일경');
    expect(kNumber(100_000_000_000_000_000n)).toBe('십경');
    expect(kNumber(20_000_000_000_000_000n)).toBe('이경');
  });

  test('해 (10^20)', () => {
    expect(kNumber(BigInt(10) ** 20n)).toBe('일해');
  });

  test('자 (10^24)', () => {
    expect(kNumber(BigInt(10) ** 24n)).toBe('일자');
  });

  test('무량대수 (10^68)', () => {
    expect(kNumber(BigInt(10) ** 68n)).toBe('일무량대수');
  });

  test('복합 — 큰 단위 혼합', () => {
    expect(kNumber(12_345_678_901_234_567_890n)).toBe(
      '천이백삼십사경오천육백칠십팔조구천십이억삼천사백오십육만칠천팔백구십'
    );
  });

  test('음수', () => {
    expect(kNumber(-1n)).toBe('-일');
    expect(kNumber(-10n)).toBe('-십');
    expect(kNumber(-10_000n)).toBe('-일만');
    expect(kNumber(-10_000_000_000_000_000n)).toBe('-일경');
  });
});

describe('kNumber — BigInt unit-only 포맷', () => {
  test('0n → 빈 문자열', () => {
    expect(kNumber(0n, { format: 'unit-only' })).toBe('');
  });

  test('단일 자리', () => {
    expect(kNumber(5n, { format: 'unit-only' })).toBe('5');
  });

  test('만·경 단위', () => {
    expect(kNumber(10_000n, { format: 'unit-only' })).toBe('1만');
    expect(kNumber(10_000_000_000_000_000n, { format: 'unit-only' })).toBe('1경');
  });

  test('복합', () => {
    expect(kNumber(12_345n, { format: 'unit-only' })).toBe('1만2천3백4십5');
  });

  test('음수', () => {
    expect(kNumber(-10_000_000_000_000_000n, { format: 'unit-only' })).toBe('-1경');
  });
});

describe('kNumber — BigInt mixed 포맷', () => {
  test('0n → 빈 문자열', () => {
    expect(kNumber(0n, { format: 'mixed' })).toBe('');
  });

  test('만 단위', () => {
    expect(kNumber(10_000n, { format: 'mixed' })).toBe('1만');
    expect(kNumber(12_345n, { format: 'mixed' })).toBe('1만2345');
  });

  test('경 단위', () => {
    expect(kNumber(10_000_000_000_000_000n, { format: 'mixed' })).toBe('1경');
    expect(kNumber(12_345_000_000_000_000_000n, { format: 'mixed' })).toBe('1234경5000조');
  });

  test('해 단위', () => {
    expect(kNumber(BigInt(10) ** 20n, { format: 'mixed' })).toBe('1해');
  });

  test('음수', () => {
    expect(kNumber(-12_345n, { format: 'mixed' })).toBe('-1만2345');
  });
});

describe('kNumber — BigInt 에러 처리', () => {
  test('MAX_BIGINT_NUMBER는 성공', () => {
    expect(kNumber(MAX_BIGINT_NUMBER)).not.toBe(ErrorCollection.OVER_BIGINT_MAX_NUMBER);
  });

  test('MAX_BIGINT_NUMBER + 1n → OVER_BIGINT_MAX_NUMBER', () => {
    expect(kNumber(MAX_BIGINT_NUMBER + 1n)).toBe(ErrorCollection.OVER_BIGINT_MAX_NUMBER);
  });

  test('MIN_BIGINT_NUMBER는 성공', () => {
    expect(kNumber(MIN_BIGINT_NUMBER)).not.toBe(ErrorCollection.UNDER_BIGINT_MIN_NUMBER);
  });

  test('MIN_BIGINT_NUMBER - 1n → UNDER_BIGINT_MIN_NUMBER', () => {
    expect(kNumber(MIN_BIGINT_NUMBER - 1n)).toBe(ErrorCollection.UNDER_BIGINT_MIN_NUMBER);
  });

  test('INVALID_FORMAT', () => {
    // @ts-expect-error
    expect(kNumber(1n, { format: 'english-only' })).toBe(ErrorCollection.INVALID_FORMAT);
  });

  test('onError 커스텀 핸들러', () => {
    expect(
      kNumber(MAX_BIGINT_NUMBER + 1n, { onError: () => '너무 큰 수' })
    ).toBe('너무 큰 수');
  });

  test('onError가 undefined 반환 시 에러 코드로 fallback', () => {
    expect(
      kNumber(MAX_BIGINT_NUMBER + 1n, { onError: () => undefined })
    ).toBe(ErrorCollection.OVER_BIGINT_MAX_NUMBER);
  });

  test('BigInt catch 블록 — 예상치 못한 에러', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const toStringSpy = vi.spyOn(BigInt.prototype, 'toString').mockImplementationOnce(() => {
      throw new Error('unexpected');
    });

    expect(kNumber(100n)).toBe(ErrorCollection.UNKNOWN_ERROR);
    expect(consoleSpy).toHaveBeenCalledOnce();

    consoleSpy.mockRestore();
    toStringSpy.mockRestore();
  });
});

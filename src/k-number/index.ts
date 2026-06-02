import {
  BIG_UNITS,
  BIG_UNITS_EXTENDED,
  K_NUMBER_FORMAT,
  MAX_NUMBER,
  MAX_BIGINT_NUMBER,
  MIN_NUMBER,
  MIN_BIGINT_NUMBER,
  NUMBER_AND_KOREAN_RECORD,
  SMALL_UNITS,
  LOG_PREFIX,
} from '@/constants';
import type { KNumberConfig, NonZeroNumberString, NumberString } from '@/types';

import { ErrorCollection, ErrorCollectionValue } from '@/errors';

const LooseBigUnits = ['', ...BIG_UNITS] as const;
const LooseBigUnitsExtended = ['', ...BIG_UNITS_EXTENDED] as const;
const LooseSmallUnits = ['', ...SMALL_UNITS] as const;

const getUnit = (index: number, array: string[], units: readonly string[]): string => {
  if (index % 4 !== 0) return '';
  const bigUnit = units[index / 4];
  if (!bigUnit) return '';
  const isNotZero =
    array[index] !== '0' ||
    (array[index + 1] !== undefined && array[index + 1] !== '0') ||
    (array[index + 2] !== undefined && array[index + 2] !== '0') ||
    (array[index + 3] !== undefined && array[index + 3] !== '0');
  return isNotZero ? bigUnit : '';
};

const formatKorean = (
  input: NumberString,
  index: number,
  array: NumberString[]
): string => {
  const unit = getUnit(index, array, LooseBigUnits);
  if (input === '0') return unit;
  const smallUnit = LooseSmallUnits[index % 4];
  // 십·백·천 자리에서 계수가 1이면 '일' 생략 (국립국어원 표준)
  const korean = input === '1' && smallUnit ? '' : NUMBER_AND_KOREAN_RECORD[input];
  return korean + smallUnit + unit;
};

const formatUnitOnly = (
  input: NumberString,
  index: number,
  array: NumberString[]
): string => {
  const unit = getUnit(index, array, LooseBigUnits);
  return input !== '0' ? input + LooseSmallUnits[index % 4] + unit : unit;
};

const formatMixedNumber = (num: number): string => {
  if (num === 0) return '';

  const isNegative = num < 0;
  const absNum = Math.abs(num);
  const str = absNum.toString();
  const len = str.length;

  let result = '';
  let groupIndex = 0;

  for (let i = len; i > 0; i -= 4) {
    const start = Math.max(0, i - 4);
    const groupNum = parseInt(str.substring(start, i), 10);

    if (groupNum > 0) {
      const bigUnit = LooseBigUnits[groupIndex];
      result = bigUnit ? groupNum + bigUnit + result : groupNum + result;
    }

    groupIndex++;
  }

  return isNegative ? '-' + result : result;
};

// ── BigInt 전용 헬퍼 ──────────────────────────────────────

const formatKoreanBig = (input: string, index: number, array: string[]): string => {
  const unit = getUnit(index, array, LooseBigUnitsExtended);
  if (input === '0') return unit;
  const smallUnit = LooseSmallUnits[index % 4];
  // 국립국어원 표준 일 생략 규칙 — BigInt 경로에도 동일 적용
  const korean =
    input === '1' && smallUnit
      ? ''
      : NUMBER_AND_KOREAN_RECORD[input as NonZeroNumberString];
  return korean + smallUnit + unit;
};

const formatUnitOnlyBig = (input: string, index: number, array: string[]): string => {
  const unit = getUnit(index, array, LooseBigUnitsExtended);
  return input !== '0' ? input + LooseSmallUnits[index % 4] + unit : unit;
};

const formatMixedBigNumber = (num: bigint): string => {
  if (num === 0n) return '';

  const isNegative = num < 0n;
  const absStr = isNegative ? num.toString().slice(1) : num.toString();
  const len = absStr.length;

  let result = '';
  let groupIndex = 0;

  for (let i = len; i > 0; i -= 4) {
    const start = Math.max(0, i - 4);
    // 각 그룹은 0–9999 범위이므로 parseInt 안전
    const groupNum = parseInt(absStr.substring(start, i), 10);

    if (groupNum > 0) {
      const bigUnit = LooseBigUnitsExtended[groupIndex];
      result = bigUnit ? groupNum + bigUnit + result : groupNum + result;
    }

    groupIndex++;
  }

  return isNegative ? '-' + result : result;
};

// ── 유효성 검사 ───────────────────────────────────────────

const validate = (input: number, config?: KNumberConfig): ErrorCollectionValue | null => {
  if (typeof input !== 'number' || isNaN(input) || !isFinite(input))
    return ErrorCollection.NOT_NUMBER;
  if (!Number.isInteger(input))
    return ErrorCollection.NOT_INTEGER;
  if (input > MAX_NUMBER)
    return ErrorCollection.OVER_MAX_NUMBER;
  if (input < MIN_NUMBER)
    return ErrorCollection.UNDER_MIN_NUMBER;
  if (config?.format !== undefined && !(K_NUMBER_FORMAT as readonly string[]).includes(config.format as string))
    return ErrorCollection.INVALID_FORMAT;
  return null;
};

const validateBigInt = (input: bigint, config?: KNumberConfig): ErrorCollectionValue | null => {
  if (input > MAX_BIGINT_NUMBER)
    return ErrorCollection.OVER_BIGINT_MAX_NUMBER;
  if (input < MIN_BIGINT_NUMBER)
    return ErrorCollection.UNDER_BIGINT_MIN_NUMBER;
  if (config?.format !== undefined && !(K_NUMBER_FORMAT as readonly string[]).includes(config.format as string))
    return ErrorCollection.INVALID_FORMAT;
  return null;
};

// ── 공개 API ─────────────────────────────────────────────

export function kNumber(input: number, config?: KNumberConfig): string;
export function kNumber(input: bigint, config?: KNumberConfig): string;
export function kNumber(input: number | bigint, config: KNumberConfig = {}): string {
  const { format = 'korean-only', onError = (e: ErrorCollectionValue) => e } = config;

  if (typeof input === 'bigint') {
    try {
      const error = validateBigInt(input, config);
      if (error !== null) return onError(error) ?? error;

      if (format === 'mixed') return formatMixedBigNumber(input);

      const formatFn = format === 'korean-only' ? formatKoreanBig : formatUnitOnlyBig;
      const isNegative = input < 0n;
      const absStr = isNegative ? input.toString().slice(1) : input.toString();
      const digits = absStr.split('').reverse();
      const result = digits.map((d, i) => formatFn(d, i, digits)).reverse().join('');
      return isNegative ? '-' + result : result;

    } catch (e) {
      console.error(`${LOG_PREFIX} ${ErrorCollection.UNKNOWN_ERROR} ${e}`);
      return onError(ErrorCollection.UNKNOWN_ERROR) ?? ErrorCollection.UNKNOWN_ERROR;
    }
  }

  try {
    const error = validate(input, config);
    if (error !== null) return onError(error) ?? error;

    if (format === 'mixed') return formatMixedNumber(input);

    const formatFn = format === 'korean-only' ? formatKorean : formatUnitOnly;
    const isNegative = input < 0;
    const digits = Math.abs(input).toString().split('').reverse() as NumberString[];

    const result = digits.map((d, i) => formatFn(d, i, digits)).reverse().join('');
    return isNegative ? '-' + result : result;

  } catch (e) {
    console.error(`${LOG_PREFIX} ${ErrorCollection.UNKNOWN_ERROR} ${e}`);
    return onError(ErrorCollection.UNKNOWN_ERROR) ?? ErrorCollection.UNKNOWN_ERROR;
  }
}

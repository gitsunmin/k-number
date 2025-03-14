import {
  BIG_UNITS,
  MAX_NUMBER,
  MIN_NUMBER,
  NUMBER_AND_KOREAN_RECORD,
  SMALL_UNITS,
  LOG_PREFIX,
} from '@/constants';
import type { KNumberConfig, KNumberFormat, MS, NumberString } from '@/types';

import { ErrorCollection } from '@/errors';
import { isInteger } from '@/utils';

const LooseBigUnits = ['', ...BIG_UNITS] as const;

const LooseSmallUnits = ['', ...SMALL_UNITS] as const;

const getUnit = (index: number, array: NumberString[]) => {
  const unit = isInteger(index / 4) ? LooseBigUnits[index / 4] : '';
  const isNotZero = array.slice(index, index + 4).join('') !== '0000';
  return unit && isNotZero ? unit : '';
};

const formatKorean = (
  input: MS<NumberString>,
  index: number,
  array: NumberString[]
) => {
  const unit = getUnit(index, array);

  if (input === '-') return input;
  return input !== '0'
    ? NUMBER_AND_KOREAN_RECORD[input] + LooseSmallUnits[index % 4] + unit
    : unit;
};

const formatUnitOnly = (
  input: MS<NumberString>,
  index: number,
  array: NumberString[]
) => {
  const unit = getUnit(index, array);

  if (input === '-') return input;
  return input !== '0' ? input + LooseSmallUnits[index % 4] + unit : unit;
};

const functionByFormat = (format: KNumberFormat) => {
  if (format === 'korean-only') return formatKorean;
  if (format === 'unit-only') return formatUnitOnly;
};

const safe = (input: number, config?: KNumberConfig): string | number => {
  const valid = (input: number, config?: KNumberConfig) => {
    if (typeof input !== 'number') return ErrorCollection.NOT_NUMBER;
    if (!isInteger(input)) return ErrorCollection.NOT_INTEGER;
    if (input > MAX_NUMBER) return ErrorCollection.OVER_MAX_NUMBER;
    if (input < MIN_NUMBER) return ErrorCollection.UNDER_MIN_NUMBER;
    if (config !== undefined && config.format !== undefined && config.format !== 'korean-only' && config.format !== 'unit-only')
      return ErrorCollection.INVALID_FORMAT;

    return null;
  }

  const error = valid(input, config);

  if (error !== null) {
    console.error(`${LOG_PREFIX} ${error}`);
    return error;
  }

  return input;
}

export const kNumber = (input: number, config?: KNumberConfig): string => {
  try {
    const safedInput = safe(input, config);
    const formatFunction = functionByFormat(config?.format ?? 'korean-only') || ((value) => value);
    if (typeof safedInput === 'string') return safedInput;

    const numberArray = safedInput.toString().split('').reverse() as NumberString[];

    return numberArray
      .map(formatFunction)
      .reverse()
      .join('');

  } catch (error) {
    console.error(`${LOG_PREFIX} ${error}`);
    return '';
  }
};

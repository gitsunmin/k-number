import {
  BIG_UNITS,
  MAX_NUMBER,
  MIN_NUMBER,
  NUMBER_AND_KOREAN_RECORD,
  SMALL_UNITS,
  LOG_PREFIX,
} from '@/constants';
import type { KNumberConfig, KNumberFormat, MS, NumberString } from '@/types';

import { ErrorCollection, ErrorCollectionValue } from '@/errors';
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

type ValidResult = {
  _tag: 'Valid';
  value: number;
};

type InvalidResult = {
  _tag: 'Invalid';
  value: ErrorCollectionValue;
};


const safe = (input: number, config?: KNumberConfig): ValidResult | InvalidResult => {
  const invalid = (input: number, config?: KNumberConfig) => {
    if (typeof input !== 'number') return ErrorCollection.NOT_NUMBER;
    if (!isInteger(input)) return ErrorCollection.NOT_INTEGER;
    if (input > MAX_NUMBER) return ErrorCollection.OVER_MAX_NUMBER;
    if (input < MIN_NUMBER) return ErrorCollection.UNDER_MIN_NUMBER;
    if (config !== undefined && config.format !== undefined && config.format !== 'korean-only' && config.format !== 'unit-only')
      return ErrorCollection.INVALID_FORMAT;

    return null;
  }

  const error = invalid(input, config);

  if (error === null) {
    return {
      _tag: 'Valid',
      value: input,
    }
  } else {
    return {
      _tag: 'Invalid',
      value: error,
    }
  }
}

export const kNumber = (input: number, config: KNumberConfig = { format: 'korean-only', onError: (error) => error }): string => {
  const { format = 'korean-only', onError = (error) => error } = config;

  try {
    const safedInput = safe(input, config);

    if (safedInput._tag === 'Invalid') return onError(safedInput.value);

    const formatFunction = functionByFormat(format) || ((value) => value);

    const numberArray = safedInput.value.toString().split('').reverse() as NumberString[];

    return numberArray
      .map(formatFunction)
      .reverse()
      .join('');

  } catch (error) {
    console.error(`${LOG_PREFIX} ${ErrorCollection.UNKNOWN_ERROR} ${error}`);

    return onError(ErrorCollection.UNKNOWN_ERROR);
  }
};

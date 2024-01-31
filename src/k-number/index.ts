import {
  BIG_UNITS,
  MAX_NUMBER,
  MIN_NUMBER,
  NUMBER_AND_KOREAN_RECORD,
  SMALL_UNITS,
} from '../constants';
import type { KNumberConfig, KNumberFormat, MS, NumberString } from '../types';

import { ErrorCollection } from '../errors';
import { isInteger } from '../utils';

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
  switch (format) {
    case 'korean-only':
      return formatKorean;
    case 'unit-only':
      return formatUnitOnly;
    default:
      throw ErrorCollection.INVALID_FORMAT;
  }
};

export const kNumber = (input: number, config?: KNumberConfig): string => {
  if (typeof input !== 'number') throw ErrorCollection.NOT_NUMBER;
  if (!isInteger(input)) throw ErrorCollection.NOT_INTEGER;
  if (input > MAX_NUMBER) throw ErrorCollection.OVER_MAX_NUMBER;
  if (input < MIN_NUMBER) throw ErrorCollection.UNDER_MIN_NUMBER;

  const numberArray = input.toString().split('').reverse() as NumberString[];

  return numberArray
    .map(functionByFormat(config?.format ?? 'korean-only'))
    .reverse()
    .join('');
};

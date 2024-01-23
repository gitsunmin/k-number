import type { KNumberFormat, NumberString } from '../types';
import {
  MAX_NUMBER,
  MIN_NUMBER,
  NUMBER_AND_KOREAN_RECORD,
  UNIT_IN_OTHERS_RANGE,
  UNIT_IN_SAME_RANGE,
} from '../constants';

import { ErrorCollection } from '../errors';
import { isInteger } from '../utils';

type KNumberConfig = {
  format?: KNumberFormat;
};

const functionByFormat = (format: KNumberFormat) => {
  switch (format) {
    case 'korean-only': {
      return (input: NumberString, index: number, array: NumberString[]) => {
        const unit = isInteger(index / 4)
          ? UNIT_IN_OTHERS_RANGE[index / 4]
          : '';

        if (input === '-') return input;
        else if (input !== '0') {
          return (
            NUMBER_AND_KOREAN_RECORD[input] +
            UNIT_IN_SAME_RANGE[index % 4] +
            unit
          );
        } else if (
          unit !== '' &&
          array.slice(index, index + 4).join('') !== '0000'
        ) {
          return unit;
        } else {
          return '';
        }
      };
    }
    case 'unit-only': {
      return (input: NumberString, index: number, array: NumberString[]) => {
        const unit = isInteger(index / 4)
          ? UNIT_IN_OTHERS_RANGE[index / 4]
          : '';

        if (input === '-') return input;
        else if (input !== '0') {
          return input + UNIT_IN_SAME_RANGE[index % 4] + unit;
        } else if (
          unit !== '' &&
          array.slice(index, index + 4).join('') !== '0000'
        ) {
          return unit;
        } else {
          return '';
        }
      };
    }
    default:
      throw ErrorCollection.INVALID_FORMAT;
  }
};

export const kNumber = (number: number, config?: KNumberConfig): string => {
  if (number > MAX_NUMBER) throw ErrorCollection.OVER_MAX_NUMBER;
  if (number < MIN_NUMBER) throw ErrorCollection.UNDER_MIN_NUMBER;
  if (typeof number !== 'number') throw ErrorCollection.NOT_NUMBER;
  if (!isInteger(number)) throw ErrorCollection.NOT_INTEGER;

  const numberArray = number.toString().split('').reverse() as NumberString[];

  return numberArray
    .map(functionByFormat(config?.format ?? 'korean-only'))
    .reverse()
    .join('');
};

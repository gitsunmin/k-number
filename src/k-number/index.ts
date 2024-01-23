import type { KNumberFormat, NumberString } from '../types';
import {
  MAX_NUMBER,
  NUMBER_AND_KOREAN_RECORD,
  UNIT_IN_OTHERS_RANGE,
  UNIT_IN_SAME_RANGE,
} from '../constants';

import { isInteger } from '../utils';

type KNumberConfig = {
  format?: KNumberFormat;
};

const functionByFormat = (format: KNumberFormat) => {
  switch (format) {
    case 'korean-only': {
      return (
          number: NumberString,
          index: number,
          array: NumberString[]
        ) => {
          const unit = isInteger(index / 4) ? UNIT_IN_OTHERS_RANGE[index / 4] : '';
    
          if (number !== '0') {
            return (
              NUMBER_AND_KOREAN_RECORD[number] +
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
    };
    case 'unit-only': {
      return (
        number: NumberString,
        index: number,
        array: NumberString[]
      ) => {
        const unit = isInteger(index / 4) ? UNIT_IN_OTHERS_RANGE[index / 4] : '';
  
        if (number !== '0') {
          return number + UNIT_IN_SAME_RANGE[index % 4] + unit;
        } else if (
          unit !== '' &&
          array.slice(index, index + 4).join('') !== '0000'
        ) {
          return unit;
        } else {
          return '';
        }
      }
    }
    default: {
      throw new Error('[k-number]: invalid format');
    }
  }
};

export const kNumber = (number: number, config?: KNumberConfig): string => {
  if (number > MAX_NUMBER) throw new Error('[k-number]: number is too big');
  if (typeof number !== 'number') throw new Error('[k-number]: your number is not number type');
  if (!isInteger(number)) throw new Error('[k-number]: number is not integer');

  const numberArray = number.toString().split('').reverse() as NumberString[];

  return numberArray
    .map(functionByFormat(config?.format ?? 'korean-only'))
    .reverse()
    .join('');
};

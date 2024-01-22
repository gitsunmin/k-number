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

const FunctionByFormat = (format: KNumberFormat) =>
  ({
    korean_only: (
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
    },
    korean_and_number: (
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
    },
  }[format]);

export const kNumber = (number: number, config?: KNumberConfig): string => {
  if (number > MAX_NUMBER) throw new Error('[k-number]: number is too big');

  const numberArray = number.toString().split('').reverse() as NumberString[];

  return numberArray
    .map(FunctionByFormat(config?.format ?? 'korean_only'))
    .reverse()
    .join('');
};

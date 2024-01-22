import { MAX_NUMBER, MAP_NUMBER_AND_KOREAN, KOREAN_UNITS } from "../constants";
import type { KoreanUnit, NumberString} from '../constants';
import { isInteger } from "../utils";

export const kNumber = (number: number): string => {
  if (number > MAX_NUMBER) throw new Error('[k-number]: number is too big');

  const units: (KoreanUnit | '')[] = ['', ...KOREAN_UNITS.slice(3)];
  const unitInSameRange: (KoreanUnit | '')[] = ['', ...KOREAN_UNITS.slice(0, 3)];

  const numberArray = number.toString().split('').reverse() as NumberString[];

  const data = numberArray.map((number, index) => {
    const unit = isInteger(index / 4) ? units[index / 4] : '';

    if (number !== '0') {
      return (
        MAP_NUMBER_AND_KOREAN[number] + (MAP_NUMBER_AND_KOREAN[number] === '' ? '' : unitInSameRange[index % 4]) + unit
      );
    } else if (
      unit !== '' &&
      numberArray.slice(index, index + 4).join('') !== '0000'
    ) {
      return unit;
    } else return '';
  });

  return data.reverse().join('');
};

import {
  KOREAN_NUMBERS,
  KOREAN_UNITS,
  K_NUMBER_FORMAT,
  STRING_NUMBERS,
} from '../constants';

export type NumberString = (typeof STRING_NUMBERS)[number];

export type KoreanNumberString = (typeof KOREAN_NUMBERS)[number];

export type KoreanUnit = (typeof KOREAN_UNITS)[number];

export type KNumberFormat = (typeof K_NUMBER_FORMAT)[number];

export type NumberAndKoreanRecord = Record<
  NumberString,
  KoreanNumberString | ''
>;

/**
 * * Empty String
 */
export type ES<T> = '' | T;

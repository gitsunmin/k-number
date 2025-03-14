import {
  KOREAN_NUMBERS,
  KOREAN_UNITS,
  K_NUMBER_FORMAT,
  STRING_NUMBERS,
} from '@/constants';

export type NumberString = (typeof STRING_NUMBERS)[number];

export type NonZeroNumberString = Exclude<NumberString, '0'>;

export type KoreanNumberString = (typeof KOREAN_NUMBERS)[number];

export type KoreanUnit = (typeof KOREAN_UNITS)[number];

export type KNumberFormat = (typeof K_NUMBER_FORMAT)[number];

export type NumberAndKoreanRecord = Record<
  NonZeroNumberString,
  KoreanNumberString
>;

export type KNumberConfig = {
  format?: KNumberFormat;
};

/** Minus String */
export type MS<T> = '-' | T;

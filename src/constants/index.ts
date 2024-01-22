import { ES, KoreanUnit, NumberAndKoreanRecord } from 'types';

export const STRING_NUMBERS = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
] as const;

export const KOREAN_NUMBERS = [
  '일',
  '이',
  '삼',
  '사',
  '오',
  '육',
  '칠',
  '팔',
  '구',
] as const;

export const KOREAN_UNITS = ['십', '백', '천', '만', '억', '조', '경'] as const;

export const K_NUMBER_FORMAT = ['korean-only', 'unit-only'] as const;

export const MAX_NUMBER = 9_007_199_254_740_991;

export const NUMBER_AND_KOREAN_RECORD: NumberAndKoreanRecord = {
  '0': '',
  '1': '일',
  '2': '이',
  '3': '삼',
  '4': '사',
  '5': '오',
  '6': '육',
  '7': '칠',
  '8': '팔',
  '9': '구',
};

export const UNIT_IN_OTHERS_RANGE: ES<KoreanUnit>[] = [
  '',
  '만',
  '억',
  '조',
  '경',
];

export const UNIT_IN_SAME_RANGE: ES<KoreanUnit>[] = ['', '십', '백', '천'];

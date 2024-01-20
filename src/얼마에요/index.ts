export const 얼마에요 = (number: number): string => {
  const units: string[] = [
    '',
    '만',
    '억',
    '조',
    '경',
    '해',
    '자',
    '양',
    '구',
    '간',
    '정',
    '재',
    '극',
    '항하사',
    '아승기',
    '나유타',
    '불가사의',
    '무량대수',
  ];
  const nums: string[] = ['십', '백', '천'];
  const trans: { [key: string]: string } = {
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

  return '';
};

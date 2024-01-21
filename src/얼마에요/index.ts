const isInteger = (num: number) => num % 1 === 0;

export const 얼마에요 = (number: number): string => {
  if (number > 9_007_199_254_740_992) {
    throw new Error('얼마에요는 9_007_199_254_740_992 이하만 가능합니다.');
  }
  const units: string[] = ['', '만', '억', '조', '경'];
  const nums: string[] = ['', '십', '백', '천'];
  const trans: { [key: string]: string } = {
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

  const numberArray = number.toString().split('').reverse();

  const data = numberArray.map((number, index) => {
    const unit = isInteger(index / 4) ? units[index / 4] : '';

    if (number !== '0') {
      return (
        trans[number] + (trans[number] === '' ? '' : nums[index % 4]) + unit
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

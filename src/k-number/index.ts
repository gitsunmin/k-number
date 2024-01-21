const isInteger = (num: number) => num % 1 === 0;

export const MAX_NUMBER = 9_007_199_254_740_991;

export const kNumber = (number: number): string => {
  if (number > MAX_NUMBER) {
    throw new Error('k-number: number is too big');
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

import { 얼마에요 } from '../얼마에요/index';

test('유닛 테스트', () => {
  const result = 얼마에요(30000);
  console.log('result:', result);
  expect(result).toBe('삼만');
});

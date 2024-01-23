import { kNumber } from '../k-number/index';

describe('invalid input', () => {
    test('소수점이 포함된 숫자', () => {
        expect(() => kNumber(3.14)).toThrow();
    });
});
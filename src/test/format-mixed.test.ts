import { kNumber } from '@/k-number/index';

describe('k-number mixed format (positive)', () => {
    it('100_000 -> 10만', () => {
        expect(kNumber(100_000, { format: 'mixed' })).toBe('10만');
    });

    it('123_456 -> 12만3456', () => {
        expect(kNumber(123_456, { format: 'mixed' })).toBe('12만3456');
    });

    it('1_234_567_890 -> 12억3456만7890', () => {
        expect(kNumber(1_234_567_890, { format: 'mixed' })).toBe('12억3456만7890');
    });

    it('30_000_400 -> 3000만400', () => {
        expect(kNumber(30_000_400, { format: 'mixed' })).toBe('3000만400');
    });

    it('0 -> ""', () => {
        expect(kNumber(0, { format: 'mixed' })).toBe('');
    });

    it('3_000 -> 3000', () => {
        expect(kNumber(3_000, { format: 'mixed' })).toBe('3000');
    });

    it('12_000 -> 1만2000', () => {
        expect(kNumber(12_000, { format: 'mixed' })).toBe('1만2000');
    });

    it('34_102 -> 3만4102', () => {
        expect(kNumber(34_102, { format: 'mixed' })).toBe('3만4102');
    });

    it('10_002_030 -> 1000만2030', () => {
        expect(kNumber(10_002_030, { format: 'mixed' })).toBe('1000만2030');
    });

    it('39_393_382 -> 3939만3382', () => {
        expect(kNumber(39_393_382, { format: 'mixed' })).toBe('3939만3382');
    });

    it('10_002_030_202 -> 100억203만202', () => {
        expect(kNumber(10_002_030_202, { format: 'mixed' })).toBe('100억203만202');
    });

    it('92_193_998_394 -> 921억9399만8394', () => {
        expect(kNumber(92_193_998_394, { format: 'mixed' })).toBe('921억9399만8394');
    });

    it('9_007_199_254_740_991 -> 9007조1992억5474만991', () => {
        expect(kNumber(9_007_199_254_740_991, { format: 'mixed' })).toBe('9007조1992억5474만991');
    });

    it('900_000_000_001 -> 9000억1', () => {
        expect(kNumber(900_000_000_001, { format: 'mixed' })).toBe('9000억1');
    });

    it('10_000 -> 1만', () => {
        expect(kNumber(10_000, { format: 'mixed' })).toBe('1만');
    });

    it('100_000_000 -> 1억', () => {
        expect(kNumber(100_000_000, { format: 'mixed' })).toBe('1억');
    });
});

describe('k-number mixed format (negative)', () => {
    it('-100_000 -> -10만', () => {
        expect(kNumber(-100_000, { format: 'mixed' })).toBe('-10만');
    });

    it('-123_456 -> -12만3456', () => {
        expect(kNumber(-123_456, { format: 'mixed' })).toBe('-12만3456');
    });

    it('-3_000 -> -3000', () => {
        expect(kNumber(-3_000, { format: 'mixed' })).toBe('-3000');
    });

    it('-12_000 -> -1만2000', () => {
        expect(kNumber(-12_000, { format: 'mixed' })).toBe('-1만2000');
    });

    it('-34_102 -> -3만4102', () => {
        expect(kNumber(-34_102, { format: 'mixed' })).toBe('-3만4102');
    });

    it('-10_002_030 -> -1000만2030', () => {
        expect(kNumber(-10_002_030, { format: 'mixed' })).toBe('-1000만2030');
    });

    it('-39_393_382 -> -3939만3382', () => {
        expect(kNumber(-39_393_382, { format: 'mixed' })).toBe('-3939만3382');
    });

    it('-10_002_030_202 -> -100억203만202', () => {
        expect(kNumber(-10_002_030_202, { format: 'mixed' })).toBe('-100억203만202');
    });

    it('-92_193_998_394 -> -921억9399만8394', () => {
        expect(kNumber(-92_193_998_394, { format: 'mixed' })).toBe('-921억9399만8394');
    });

    it('-9_007_199_254_740_991 -> -9007조1992억5474만991', () => {
        expect(kNumber(-9_007_199_254_740_991, { format: 'mixed' })).toBe('-9007조1992억5474만991');
    });
});

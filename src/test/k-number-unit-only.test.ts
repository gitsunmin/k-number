import { kNumber } from '../k-number/index';

describe('k-number unit only format', () => {
  test('30_000_400.12 -> 3천만4백', () => {
    expect(kNumber(30_000_400, { format: 'unit-only' })).toBe(
      '3천만4백'
    );
  });
  test('30_000_400 -> 3천만4백', () => {
    expect(kNumber(30_000_400, { format: 'unit-only' })).toBe(
      '3천만4백'
    );
  });
  test('12_389_828 -> 1천2백3십8만9천8백2십8', () => {
    expect(kNumber(12_389_828, { format: 'unit-only' })).toBe(
      '1천2백3십8만9천8백2십8'
    );
  });
  test('3_000 -> 3천', () => {
    expect(kNumber(3_000, { format: 'unit-only' })).toBe('3천');
  });
  test('12_000 -> 1만2천', () => {
    expect(kNumber(12_000, { format: 'unit-only' })).toBe('1만2천');
  });
  test('34_102 -> 3만4천1백2', () => {
    expect(kNumber(34_102, { format: 'unit-only' })).toBe('3만4천1백2');
  });
  test('10_002_030 -> 1천만2천3십', () => {
    expect(kNumber(10_002_030, { format: 'unit-only' })).toBe(
      '1천만2천3십'
    );
  });
  test('39_393_382 -> 3천9백3십9만3천3백8십2', () => {
    expect(kNumber(39_393_382, { format: 'unit-only' })).toBe(
      '3천9백3십9만3천3백8십2'
    );
  });
  test('10_002_030_202 -> 1백억2백3만2백2', () => {
    expect(kNumber(10_002_030_202, { format: 'unit-only' })).toBe(
      '1백억2백3만2백2'
    );
  });
  test('92_193_998_394 -> 9백2십1억9천3백9십9만8천3백9십4', () => {
    expect(kNumber(92_193_998_394, { format: 'unit-only' })).toBe(
      '9백2십1억9천3백9십9만8천3백9십4'
    );
  });
  test('9_007_199_254_740_991 -> 9천7조1천9백9십2억5천4백7십4만9백9십1', () => {
    expect(
      kNumber(9_007_199_254_740_991, { format: 'unit-only' })
    ).toBe('9천7조1천9백9십2억5천4백7십4만9백9십1');
  });
});

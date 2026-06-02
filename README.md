# @gitsunmin/k-number

[![npm](https://img.shields.io/npm/v/@gitsunmin/k-number)](https://www.npmjs.com/package/@gitsunmin/k-number)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

정수를 한글 수사(數詞)로 변환하는 TypeScript 라이브러리입니다.

## Installation

```bash
npm install @gitsunmin/k-number
yarn add @gitsunmin/k-number
pnpm add @gitsunmin/k-number
bun add @gitsunmin/k-number
```

## Usage

```ts
import { kNumber } from '@gitsunmin/k-number';

kNumber(39_393_382);
// '삼천구백삼십구만삼천삼백팔십이'

kNumber(39_393_382, { format: 'unit-only' });
// '3천9백3십9만3천3백8십2'

kNumber(39_393_382, { format: 'mixed' });
// '3939만3382'
```

## Format

세 가지 출력 형식을 지원합니다.

| input | `korean-only` (기본값) | `unit-only` | `mixed` |
| ------: | ---------------------- | ----------- | ------- |
| `0` | `''` | `''` | `''` |
| `10000` | `'일만'` | `'1만'` | `'1만'` |
| `123456` | `'십이만삼천사백오십육'` | `'12만3천4백5십6'` | `'12만3456'` |
| `39_393_382` | `'삼천구백삼십구만삼천삼백팔십이'` | `'3천9백3십9만3천3백8십2'` | `'3939만3382'` |
| `1_234_567_890` | `'십이억삼천사백오십육만칠천팔백구십'` | `'12억3천4백5십6만7천8백9십'` | `'12억3456만7890'` |

- `korean-only`: 모든 자리를 한글로 변환합니다. 국립국어원 표준에 따라 십·백·천 자리의 계수가 1이면 `일`을 생략합니다 (예: `천`, `백십`, `일만`).
- `unit-only`: 아라비아 숫자에 한글 단위를 붙입니다.
- `mixed`: 만·억·조·경·해 등 큰 단위만 한글로 표기하고 나머지는 아라비아 숫자로 유지합니다.

## API

### `kNumber(input, config?)`

`number`와 `bigint` 두 타입을 모두 받습니다. 일반 정수에는 `number`, `Number.MAX_SAFE_INTEGER`를
초과하는 큰 수에는 `bigint`를 사용하십시오.

```ts
kNumber(39_393_382);                     // number 입력
kNumber(10_000_000_000_000_000n);        // bigint 입력 → '일경'
kNumber(BigInt(10) ** 68n);             // bigint 입력 → '일무량대수'
```

#### Parameters

| 이름 | 타입 | 필수 | 설명 |
| ---- | ---- | :--: | ---- |
| `input` | `number \| bigint` | O | 변환할 정수 |
| `config.format` | `'korean-only' \| 'unit-only' \| 'mixed'` | - | 출력 형식. 기본값: `'korean-only'` |
| `config.onError` | `(error: ErrorCollectionValue) => string \| undefined` | - | 에러 발생 시 호출되는 핸들러. `undefined` 반환 시 에러 코드 문자열로 fallback |

#### Returns `string`

변환된 한글 수사 문자열을 반환합니다. 입력이 `0` 또는 `0n`이면 빈 문자열(`''`)을 반환합니다.

#### Constraints

##### number 입력

- 정수만 허용합니다. 소수 입력 시 `NOT_INTEGER` 에러를 반환합니다.
- 허용 범위: `-9_007_199_254_740_991` ~ `9_007_199_254_740_991` (`Number.MAX_SAFE_INTEGER`)
- `NaN`, `Infinity`, `-Infinity` 입력 시 `NOT_NUMBER` 에러를 반환합니다.

##### bigint 입력

- 허용 범위: `MIN_BIGINT_NUMBER` ~ `MAX_BIGINT_NUMBER` (72자리, 무량대수까지)
- 범위 초과 시 `OVER_BIGINT_MAX_NUMBER` / `UNDER_BIGINT_MIN_NUMBER` 에러를 반환합니다.

#### 지원 단위 (bigint)

| 단위 | 값 |
| ---- | -- |
| 만 | 10⁴ |
| 억 | 10⁸ |
| 조 | 10¹² |
| 경 | 10¹⁶ |
| 해 | 10²⁰ |
| 자 | 10²⁴ |
| 양 | 10²⁸ |
| 구 | 10³² |
| 간 | 10³⁶ |
| 정 | 10⁴⁰ |
| 재 | 10⁴⁴ |
| 극 | 10⁴⁸ |
| 항하사 | 10⁵² |
| 아승기 | 10⁵⁶ |
| 나유타 | 10⁶⁰ |
| 불가사의 | 10⁶⁴ |
| 무량대수 | 10⁶⁸ |

## Error Handling

에러가 발생하면 예외를 던지지 않으며, 에러 코드 문자열을 반환합니다.

```ts
import { kNumber, ErrorCollection } from '@gitsunmin/k-number';

kNumber(3.14)                              // => ErrorCollection.NOT_INTEGER
kNumber(NaN)                               // => ErrorCollection.NOT_NUMBER
kNumber(Infinity)                          // => ErrorCollection.NOT_NUMBER
kNumber(9_007_199_254_740_992)             // => ErrorCollection.OVER_MAX_NUMBER
kNumber(-9_007_199_254_740_992)            // => ErrorCollection.UNDER_MIN_NUMBER
kNumber('동해물과백두산이')                // => ErrorCollection.NOT_NUMBER
kNumber(1234, { format: 'english-only' })  // => ErrorCollection.INVALID_FORMAT
```

`onError` 핸들러를 지정하면 반환 값을 직접 제어할 수 있습니다.

```ts
kNumber(3.14, {
  onError: (error) => {
    if (error === ErrorCollection.NOT_INTEGER) return '정수만 입력 가능합니다.';
  },
});
// => '정수만 입력 가능합니다.'
```

## References

- [Types](https://github.com/gitsunmin/k-number/blob/master/src/types/index.ts)
- [Constants](https://github.com/gitsunmin/k-number/blob/master/src/constants/index.ts)
- [Error codes](https://github.com/gitsunmin/k-number/blob/master/src/errors/index.ts)

## License

[MIT](./LICENSE)

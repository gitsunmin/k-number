# @gitsunmin/k-number 🇰🇷

숫자를 입력하면 한글 수사로 반환하는 기능을 제공하는 라이브러리입니다. 예를들면, `10000`을 입력하면 `만`으로 반환합니다.

## Install

```bash
npm install @gitsunmin/k-number

yarn add @gitsunmin/k-number

pnpm add @gitsunmin/k-number

bun add @gitsunmin/k-number
```

## Usage

```ts
import { kNumber } from '@gitsunmin/k-number';

const result = kNumber(39_393_382);
console.log('result:', result);
// result: 삼천구백삼십구만삼천삼백팔십이

const unitOnlyResult = kNumber(39_393_382, { format: 'unit-only' });
console.log('unitOnlyResult:', unitOnlyResult);
// unitOnlyResult: 3천9백3십9만3천3백8십2

const mixedResult = kNumber(100_000, { format: 'mixed' });
console.log('mixedResult:', mixedResult);
// mixedResult: 10만
```

- :warning: 소수점 입력을 지원하지 않습니다. [integer only]
- :warning: 최대값 9_007_199_254_740_991까지만 입력이 가능합니다. 
- :warning: 최소값 -9_007_199_254_740_991까지만 입력이 가능합니다. 

## KNumber

### input
- Number
  - type: number (integer only)
  - example:
    ```ts
    kNumber(123_123)
    ```
- Config
  - type: KNumberConfig
    ```ts
    {
      format?: 'korean-only' | 'unit-only' | 'mixed';
    }
    ``` 
  - format options:
    - `korean-only`: 모든 숫자를 한글로 변환 (예: `123456` → `십이만삼천사백오십육`)
    - `unit-only`: 숫자는 그대로, 단위만 한글 (예: `123456` → `12만3천4백5십6`)
    - `mixed`: 큰 단위(만, 억, 조, 경)만 한글, 나머지는 숫자 (예: `123456` → `12만3456`)
  - example: 
    ```ts
    kNumber(123_123, { format: 'unit-only' })
    kNumber(100_000, { format: 'mixed' }) // => '10만'
    ```

### output
- type: string
- example:
  ```ts
  const koreanNumber = kNumber(123_123, { format: 'unit-only' });
  console.log(koreanNumber); // 1십2만3천1백2십3
  ```

### Error

```ts
kNumber(3.14) // => 'number is not integer' as ErrorCollection.NOT_INTEGER

kNumber(1234, { format: 'english-only' }) // => 'invalid format' as ErrorCollection.INVALID_FORMAT

kNumber(9_007_199_254_740_992) // => 'number is too big' as ErrorCollection.OVER_MAX_NUMBER

kNumber(-9_007_199_254_740_992) // => 'number is too small' as ErrorCollection.UNDER_MIN_NUMBER

kNumber('동해물과백두산이말라버렸다.') // => 'input is not number' as ErrorCollection.NOT_NUMBER

// Custom Error Handling
kNumber(3.14, { onError: (error) => {
  if (error === ErrorCollection.NOT_INTEGER) return '숫자가 아닙니다.';
} }) // => '숫자가 아닙니다.'
```

## Types & Constants
- [type.ts](https://github.com/gitsunmin/k-number/blob/master/src/types/index.ts)
- [constants.ts](https://github.com/gitsunmin/k-number/blob/master/src/constants/index.ts)
- [errors.ts](https://github.com/gitsunmin/k-number/blob/master/src/errors/index.ts)

## License

[MIT](./LICENSE)
## k-number

숫자를 입력하면 한글 수사로 반환하는 기능을 제공하는 라이브러리입니다.

## 설치

```bash
npm install @gitsunmin/k-number
```

## 사용법

```ts
import { kNumber } from '@gitsunmin/k-number';

const result = kNumber(39_393_382);
console.log('result:', result); //  // 삼천구백삼십구만삼천삼백팔십이
```

## 상세

### Parameter
- Number
  - type: number (integer only)
  - example:
    ```ts
    kNumber(123_123)
    ```
- Config
  - type: KNumberConfig 
  - example: 
    ```ts
    kNumber(123_123, { format: 'unit-only' })
    // 1십2만3천1백2십3
    ```

### Type

- format
  ```ts
  type KNumberFormat = "korean-only" | "unit-only"
  ```

이 외에도 라이브러리에서 사용중인 타입을 제공합니다. > [type.ts](https://github.com/gitsunmin/k-number/blob/master/src/types/index.ts)

### Constant
아래와 같이 최대값과 최소값을 제공합니다. 아래의 수를 벗어나면 에러가 발생합니다.
```
...
export const MAX_NUMBER = 9_007_199_254_740_991;

export const MIN_NUMBER = -9_007_199_254_740_991;
...
```
이 외에도 라이브러리에서 사용중인 상수를 제공합니다. > [constants.ts](https://github.com/gitsunmin/k-number/blob/master/src/constants/index.ts)

### Errors
아래와 같이 에러를 제공합니다. > [errors.ts](https://github.com/gitsunmin/k-number/blob/master/src/errors.ts)

## 라이선스

[MIT](./LICENSE)
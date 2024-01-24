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
console.log('result:', result);
// result: 삼천구백삼십구만삼천삼백팔십이

const unitOnlyResult = kNumber(39_393_382, { format: 'unit-only' });
console.log('unitOnlyResult:', unitOnlyResult);
// unitOnlyResult: 3천9백3십9만3천3백8십2
```

### 주의사항
- 소수점 입력을 지원하지 않습니다. [integer only]
- 최대값 9_007_199_254_740_991까지만 입력이 가능합니다. 
- 최소값 -9_007_199_254_740_991까지만 입력이 가능합니다. 

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
    ```ts
    {
      format?: 'korean-only' | 'unit-only';
    }
    ``` 
  - example: 
    ```ts
    kNumber(123_123, { format: 'unit-only' })
    ```

### Type
라이브러리에서 사용중인 타입을 제공합니다. > [type.ts](https://github.com/gitsunmin/k-number/blob/master/src/types/index.ts)

### Constant
라이브러리에서 사용중인 상수를 제공합니다. > [constants.ts](https://github.com/gitsunmin/k-number/blob/master/src/constants/index.ts)

### Errors
라이브러리에서 사용중인 Error를 제공합니다. > [errors.ts](https://github.com/gitsunmin/k-number/blob/master/src/errors.ts)

## 라이선스

[MIT](./LICENSE)
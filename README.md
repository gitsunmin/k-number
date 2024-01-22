## k-number

숫자를 입력하면 한글 수사로 반환하는 기능을 제공하는 라이브러리입니다.

### 설치

```bash
npm install @gitsunmin/k-number
```

### 사용법

```ts
import { kNumber } from '@gitsunmin/k-number';

const result = kNumber(39_393_382);
console.log('result:', result); //  // 삼천구백삼십구만삼천삼백팔십이
```

### API

- Config
  - type: KNumberConfig -> { format: 'korean-only'[default] | 'korean-and-number' }
  - example: 
    ```ts
    kNumber(123_123, { format: 'korean-and-number' })
    // 1십2만3천1백2십3
    ```

### 라이선스

[MIT](./LICENSE)
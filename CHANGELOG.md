<!-- https://keepachangelog.com/ko/1.0.0/ -->

# Changelog

## [1.0.0] - 2026-06-02

### Added (BigInt 지원)

- `kNumber(input: bigint)` 오버로드 추가 — `number` 경로는 기존과 동일, BigInt 전용 경로만 신규
- `BIG_UNITS_EXTENDED` 상수 추가: 만·억·조·경·해·자·양·구·간·정·재·극·항하사·아승기·나유타·불가사의·무량대수
- `MAX_BIGINT_NUMBER` / `MIN_BIGINT_NUMBER` 상수 추가 (±(10^72 - 1), 무량대수 범위)
- `ErrorCollection.OVER_BIGINT_MAX_NUMBER` / `UNDER_BIGINT_MIN_NUMBER` 에러 코드 추가
- BigInt 전용 테스트 28건 추가 (`src/test/bigint.test.ts`)

### Fixed

- `korean-only` 포맷에서 십·백·천 자리의 계수가 1일 때 `일`이 생략되지 않던 버그 수정
  (국립국어원 표준: `일백` → `백`, `일천` → `천`; 만·억·조·경 앞 `일`은 유지)
- `onError` 콜백이 `undefined` 반환 시 그대로 전파되던 버그 수정 — 에러 코드 문자열로 fallback
- `isInteger` 유틸이 배럴 (`src/index.ts`)에 누락된 문제 수정
  (`export * from './utils'` 추가)
- `NaN`, `Infinity`, `-Infinity` 입력 시 `NOT_INTEGER` 대신 `NOT_NUMBER` 반환하도록 수정
- `safe()` 포맷 검증 로직을 `K_NUMBER_FORMAT` 상수 기반으로 변경 (하드코딩 제거)
- `functionByFormat`의 `'mixed'` dead code 제거 및 반환 타입 명확화

### Added

- `일` 생략 규칙 관련 테스트 16건 추가 (`src/test/format-korean-only.test.ts`)
- `onError` undefined fallback 테스트 추가 (`src/test/invalid-input.test.ts`)
- 퍼블릭 API / 배럴 export / `catch` 블록 커버리지 테스트 추가
  (`src/test/public-api.test.ts`)
- `.markdownlint.json` 추가 — `MD024 siblings_only` 설정으로 CHANGELOG 중복 헤더 경고 해소
- `NaN` / `Infinity` / `-Infinity` 입력 처리 테스트 추가 (`src/test/invalid-input.test.ts`)
- `mixed` 포맷 경계값 테스트 파일 추가 (`src/test/edge-cases.test.ts`)
- GitHub Actions CI 워크플로우 추가 (`.github/workflows/ci.yml`)
  - push / PR 시 타입 체크 및 전체 테스트 자동 실행
- `package.json` 스크립트 추가: `typecheck`, `test:coverage`

### Changed

- `onError` 타입을 `(error) => string | undefined`로 변경 — `undefined` 반환 허용
- `getUnit` 내부 `slice + join` 패턴을 직접 인덱스 비교로 교체 (중간 배열 할당 제거)
- 음수 처리를 부호 분리 방식으로 변경 — 변환 함수에서 `'-'` 처리 제거
- `safe()` 내부 중첩 함수 제거 → 모듈 레벨 `validate()` 함수로 분리
- 내부 타입 `MS<T>` (Minus String)를 퍼블릭 API에서 제거
- `isInteger` 유틸 대신 네이티브 `Number.isInteger()` 사용
- 테스트 도구를 Jest에서 Vitest로 교체
  - `jest`, `ts-jest`, `@types/jest` 제거
  - `vitest`, `@vitest/coverage-v8` 추가
  - `jest.config.js` 제거, `vitest.config.ts` 추가
  - `tsconfig.json`의 `types` 필드를 `["jest"]` → `["vitest/globals"]` 로 변경
- 의존성 업데이트
  - `tsc-alias` 1.8.16 → 1.8.17
  - `typescript` 5.9.3 → **6.0.3** (major)
- TypeScript 6.0 마이그레이션 (`tsconfig.json`)
  - `target` `ES5` → `ES2020`
  - `moduleResolution` `node` → `bundler` (deprecated 옵션 제거)
  - `baseUrl` 제거, `paths` 를 프로젝트 루트 기준으로 변경 (`@/*` → `./src/*`)
  - `module: "ESNext"` 추가
  - CJS 빌드(`tsconfig.cjs.json`): `moduleResolution: "node10"` +
    `ignoreDeprecations: "6.0"` 적용
  - CJS/ESM 빌드 `target` `ES2015` → `ES2020`
- README 전면 개편
  - 이모지 제거, 문장 격식화
  - `## KNumber` → `## API` (파라미터 표 포함)
  - 경고 blockquote → `#### Constraints` 섹션으로 개선
  - `## Error` → `## Error Handling` 으로 개선
  - `## Types & Constants` → `## References` 로 개선
- CHANGELOG 전면 개편
  - 모든 버전 항목에 날짜 추가
  - 파일 하단 버전 비교 링크 footer 추가
  - 기존 항목 `### Fixed` / `### Added` / `### Changed` 섹션으로 통일

## [0.3.0] - 2025-12-05

### Added

- 새로운 `'mixed'` 포맷 옵션 추가
  - 큰 단위(만, 억, 조, 경)만 한글로, 이하는 숫자로 표기
  - 예시: `100,000` → `10만`, `123,456` → `12만3456`, `1,234,567,890` → `12억3456만7890`
- `mixed` 포맷 테스트 22건 추가

### Changed

- README에 `mixed` 포맷 사용 예시 및 설명 추가

## [0.2.3] - 2025-12-04

### Fixed

- 빌드 결과물에서 TypeScript 경로 별칭(`@/*`)이 해석되지 않는 문제 수정
  - `tsc-alias`를 빌드 스크립트에 추가하여 경로 별칭 자동 해석
- npm 배포 패키지 크기 최적화 (7.3kB → 5.3kB)
  - 테스트 파일 제외, `files` 설정 개선
- repository URL 형식을 npm 표준(`git+https://`)에 맞게 수정

### Changed

- 빌드 스크립트에 `tsc-alias` 적용 (소스 코드의 `@/*` 별칭 유지)

## [0.2.2] - 2025-12-04

### Fixed

- `package.json`에 `exports` 필드 추가로 모듈 해석 오류 수정
- ESM(`import`)과 CommonJS(`require`) 모두 정상 지원
- 두 모듈 시스템에 대한 TypeScript 타입 정의 개선

## [0.2.1] - 2025-03-15

### Changed

- README.md 업데이트

### Added

- 테스트 케이스 추가

## [0.2.0] - 2025-03-15

### Changed

- 에러 발생 시 `throw` 대신 문자열 반환 방식으로 변경
- 의존성 업데이트 (jest, typescript, ts-jest, node)

### Added

- `onError` 커스텀 에러 핸들러 옵션 추가

## [0.1.4] - 2024-02-07

### Fixed

- README 오타 수정

### Changed

- `kNumber` 함수 에러 처리 리팩토링

## [0.1.3] - 2024-02-07

### Changed

- npm 키워드 업데이트

## [0.1.2] - 2024-02-07

### Changed

- README.md 업데이트
- npm 키워드 업데이트

## [0.1.1] - 2024-02-07

### Changed

- README.md 업데이트

### Added

- husky pre-commit 훅 적용

## [0.1.0] - 2024-02-07

### Removed

- `EM` 타입 제거

### Added

- `KNumberConfig` 옵션 추가

## [0.0.8] - 2024-02-07

### Changed

- 코드 가독성 개선 리팩토링
- README.md 업데이트

## [0.0.7] - 2024-01-23

### Fixed

- import 경로 오류 수정

## [0.0.6] - 2024-01-23

### Changed

- README.md 업데이트

## [0.0.5] - 2024-01-23

### Added

- 음수 지원

### Fixed

- 유효하지 않은 입력 시 에러 처리

## [0.0.4] - 2024-01-23

### Changed

- 포맷명 변경: `korean_only` → `korean-only`, `korean_and_number` → `unit-only`

## [0.0.3] - 2024-01-22

### Added

- `MAX_NUMBER` export
- `isInteger` 유틸 export
- 타입 export
- 상수 export
- `korean_only` / `korean_and_number` 포맷 옵션 추가

## [0.0.2] - 2024-01-21

### Fixed

- import 불가 오류 수정

## [0.0.1] - 2024-01-21

### Added

- 초기 릴리스: `@gitsunmin/k-price` 기반 기본 기능 구현

---

[1.0.0]: https://github.com/gitsunmin/k-number/compare/v0.3.0...v1.0.0
[0.3.0]: https://github.com/gitsunmin/k-number/compare/v0.2.3...v0.3.0
[0.2.3]: https://github.com/gitsunmin/k-number/compare/v0.2.2...v0.2.3
[0.2.2]: https://github.com/gitsunmin/k-number/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/gitsunmin/k-number/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/gitsunmin/k-number/compare/v0.1.4...v0.2.0
[0.1.4]: https://github.com/gitsunmin/k-number/compare/v0.1.3...v0.1.4
[0.1.3]: https://github.com/gitsunmin/k-number/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/gitsunmin/k-number/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/gitsunmin/k-number/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/gitsunmin/k-number/compare/v0.0.8...v0.1.0
[0.0.8]: https://github.com/gitsunmin/k-number/compare/v0.0.7...v0.0.8
[0.0.7]: https://github.com/gitsunmin/k-number/compare/v0.0.6...v0.0.7
[0.0.6]: https://github.com/gitsunmin/k-number/compare/v0.0.5...v0.0.6
[0.0.5]: https://github.com/gitsunmin/k-number/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/gitsunmin/k-number/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/gitsunmin/k-number/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/gitsunmin/k-number/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/gitsunmin/k-number/releases/tag/v0.0.1

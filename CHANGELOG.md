<!-- https://keepachangelog.com/ko/1.0.0/ -->
# [0.3.0]
### Added
- Added new `'mixed'` format option for cleaner number representation
  - Only displays major units (만, 억, 조, 경) in Korean, rest in numbers
  - Example: `100,000` → `10만` (instead of `1십만`)
  - Example: `123,456` → `12만3456`
  - Example: `1,234,567,890` → `12억3456만7890`
- Added 27 comprehensive test cases for the new mixed format

### Changed
- Updated README with `mixed` format usage examples and documentation

# [0.2.3]
### Fixed
- Fixed critical import path alias issue that caused module resolution errors in production
  - Changed TypeScript path aliases (`@/*`) to relative paths in build output
  - Added `tsc-alias` to automatically resolve path aliases during build process
- Optimized published package size
  - Excluded test files from npm package (reduced from 7.3kB to 5.3kB)
  - Improved `files` configuration in package.json
- Enhanced `.npmignore` to exclude unnecessary files from package
- Fixed repository URL format to follow npm conventions (`git+https://`)

### Changed
- Updated build script to use `tsc-alias` for path alias resolution
- Maintained development convenience by keeping `@/*` aliases in source code

# [0.2.2]
### Fixed
- Fixed module resolution issue by adding `exports` field in package.json
- Added proper support for both ESM (`import`) and CommonJS (`require`)
- Improved TypeScript type definitions for both module systems

# [0.2.1]
### Changed
- Changed README.md

### Added
- Added test cases


# [0.2.0]
### Changed
- Changed to return string instead of Throw when error occurs
- Updated Dependency (jest, typescript, ts-jest, node)

### Added
- Added onError config

# [0.1.4]
- fix typos in README
- Refactor kNumber function error handling

# [0.1.3]
- update keywords

# [0.1.2]
- update README.md
- update npm keywords

# [0.1.1]
- update README.md
- apply husky

# [0.1.0]
- remove EM type
- supply KNumberConfig

## [0.0.8]
- refactor: Refactoring to improve code readability
- updae README.md

## [0.0.7]
- fix import path error

## [0.0.6]
- update README.md

## [0.0.5]
- support minus number
- Error if invalid

## [0.0.4]
- change format name (korean_only -> korean-only, korean_and_number -> unit-only)

## [0.0.3]
- export MAX_NUMBER
- export utils (isInteger)
- export types
- export constants
- feature: apply format (korean_only, korean_and_number)

## [0.0.2]
- fix error: Fixing issues that cannot be imported

## [0.0.1]

- Initial release: basic functionality of @gitsunmin/k-price
